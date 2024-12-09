const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const mail = require("@sendgrid/mail").setApiKey(process.env.SENDGRID_KEY);

const CLEINT_URL = "http://localhost:5173";

router.post(`/create-checkout-session`, async (req, res) => {
  const { cartItems, user } = req.body;
  // console.log("cartItems", cartItems);
  const productsInStock = await prisma.product.findMany({
    where: {
      id: {
        in: cartItems.map((item) => item.product.id),
      },
    },
    select: {
      id: true,
      name: true,
      stockQty: true,
    },
  });

  // console.log("productsinstock", productsInStock);

  if (productsInStock.some((product) => product.stockQty < 1)) {
    const outOfStockProducts = productsInStock.filter(
      (product) => product.stockQty < 1
    );
    // console.log("outofstock", outOfStockProducts);

    res.status(409).json({
      message: "are out of stock",
      solution: "Please remove them from your cart.",
      products: outOfStockProducts.map((product) => product.name),
    });
    return;
  }

  const verifySufficientStockQty = () => {
    const insufficientStockItems = [];
    for (let i = 0; i < cartItems.length; i++) {
      const product = productsInStock.find(
        (product) => product.id === cartItems[i].product.id
      );
      if (product.stockQty < cartItems[i].qty) {
        insufficientStockItems.push(cartItems[i].product.name);
      }
    }
    return insufficientStockItems;
  };

  const insufficientStockItems = verifySufficientStockQty();

  if (insufficientStockItems.length > 0) {
    res.status(409).json({
      message: "have insufficient stock",
      solution: "Please decrease the quantity in your cart.",
      products: insufficientStockItems,
    });
    return;
  }

  // If loggedInUser, search stripe customers with user email
  const checkIfUserAndExistingCustomer = async () => {
    if (!user) {
      // If guest user, return undefined
      return undefined;
    }

    try {
      const findCustomer = await stripe.customers.search({
        query: `email:'${user.email}'`,
        limit: 1,
      });

      // Return stripe id of user if it exists, otherwise undefined
      return findCustomer.data.length > 0 ? findCustomer.data[0].id : undefined;
    } catch (error) {
      console.error("Error searching for customer:", error);
      return undefined;
    }
  };

  const customerId = await checkIfUserAndExistingCustomer();

  const session = await stripe.checkout.sessions.create({
    // CusomerId if found, undefined if not
    customer: customerId,
    // If there is a user but they are not an existing stripe customer, enable customer creation, else undefined -> no customer creation
    customer_creation: user && !customerId ? "always" : undefined,
    // If there is a user but they are not an existing stripe customer, provide their email, else undefined.
    customer_email: user && !customerId ? user.email : undefined,
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [
            "https://lh3.googleusercontent.com/86arOE_jc_FYR6_mPbeXrzWB4LwvgCRWPGXbbftgG4_zAjY05ajbmq3xiG0Xc_uYCoTccikGvLdo5WIlofH5pmySn1VRejqngh2pwDLquiLJYayCOJKUrZKFnOwmSxKzQqqOM1y5o42TPk6LYR1vbPjrEPx3dQIUEwS4IPRjzt3JdPZT32TkqCECm-PoQtsBAPnyN6g46PbiyD9fblgzuBcT2xuO1AaZgOkR53bom8ATCBkDgcYT_mnsxWuxLGp6cNFUR4lWBFKyYkYJWJY--KmIVCWDDoJ3SxwjimGjwRG-X2Qu3AP4wa6tRazHuBo3a8IOofm6f5arSRdpVy4AaXoacTPz8TSkcofA0YaIttHpek1Gi5v1yMSbi5mHV6Mfv4lyczXPp8c5iNR7IFPvgMz1BiCETTxNwSvDjb2JCN94_256Fzejrs-Dk-kMYeCCYQh2Zd_lt9xiEQDgZ5gufdpxxM9xDiP447vrOqKbBMcAS_6hu43EwRi97ILAhBpS3QLP-4WhKf4GHauWqML_EcBvhszB-6T1iGeCWvpAT9jZVDVgekalBvLZiZNoy5Ow9QlnHA=w1827-h711-no",
          ],
        },
        unit_amount: item.product.price,
      },
      quantity: item.qty,
    })),
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [{ shipping_rate: "shr_1Pm03EJHFmNzdCGuCRHNbG18" }],
    phone_number_collection: {
      enabled: true,
    },
    // success_url: `${CLEINT_URL}/confirmation?success=true`,
    success_url: `${CLEINT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLEINT_URL}/cart`,
  });

  res.send({ url: session.url });
});

router.post("/confirmation", async (req, res, next) => {
  const { session_id } = req.body;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  // console.log("session", session);
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  if (session.customer) {
  }
  // const customer =
  //   session.customer && (await stripe.customers.retrieve(session.customer));
  const paymentIntent = await stripe.paymentIntents.retrieve(
    session.payment_intent
  );
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method
  );
  // console.log(paymentMethod);
  // console.log("session", session);

  // Check if order has already been confirmed
  const orderConfirmed = await prisma.orderHistory.findUnique({
    where: {
      sessionId: session.id,
    },
  });

  const sessionData = {
    id: session.id,
    confirmed: true,
    customerName: session.customer_details.name,
    email: session.customer_details.email,
    phone: session.customer_details.phone,
    shippingAddress: session.shipping_details,
    billingAddress: paymentMethod.billing_details,
    paymentMethod: {
      brand: paymentMethod.card.brand,
      card: paymentMethod.card.last4,
    },
    orderItems: lineItems.data.map((item) => ({
      id: item.id,
      name: item.description,
      price: item.price.unit_amount,
      qty: item.quantity,
    })),
    shippingCost: session.shipping_cost.amount_total,
    orderTotal: session.amount_total,
  };

  // If order has already been confirmed

  if (orderConfirmed) {
    res.status(200).json({ sessionData: sessionData });
    return;
  }

  await prisma.orderHistory.create({
    data: {
      sessionId: session.id,
      email: session.customer_details.email,
    },
  });

  sessionData.confirmed = false;

  // Email Content
  const message = {
    to: process.env.CONTACT_EMAIL,
    from: {
      name: "Dimensional Glassworks",
      email: process.env.CONTACT_EMAIL,
    },
    templateId: process.env.CONFIRMATION_TEMPLATE_ID,
    dynamic_template_data: {
      // Shipping Data
      shipping_name: session.shipping_details.name,
      shipping_address: `${session.shipping_details.address.line1}, ${
        session.shipping_details.address.line2 ?? ""
      }`,
      shipping_city: session.shipping_details.address.city,
      shipping_state: session.shipping_details.address.state,
      shipping_zip: session.shipping_details.address.postal_code,
      shipping_phone: session.customer_details.phone,
      // Billing Data
      billing_name: paymentMethod.billing_details.name,
      fName: paymentMethod.billing_details.name.split(" ")[0],
      billing_address: `${paymentMethod.billing_details.address.line1}, ${
        paymentMethod.billing_details.address.line2 ?? ""
      }`,
      billing_city: paymentMethod.billing_details.address.city,
      billing_state: paymentMethod.billing_details.address.state,
      billing_zip: paymentMethod.billing_details.address.postal_code,
      billing_phone: paymentMethod.billing_details.phone,
      billing_cardType: paymentMethod.card.brand,
      billing_card_last4: paymentMethod.card.last4,
      // Order Data
      order_id: session.id.slice(50),
      order_subtotal: (
        lineItems.data.reduce((acc, curr) => acc + curr.amount_total, 0) / 100
      ).toFixed(2), // adjust
      order_shipping_cost: (session.shipping_cost.amount_total / 100).toFixed(
        2
      ),
      order_shipping_type: "Express-saver", // adjust
      order_tax: "10.37", // adjust
      order_total: (session.amount_total / 100).toFixed(2),
      // Cart Data
      cartItems: lineItems.data.map((item) => ({
        name: item.description,
        price: (item.price.unit_amount / 100).toFixed(2),
        qty: item.quantity,
        total: ((item.price.unit_amount * item.quantity) / 100).toFixed(2),
      })),
    },
  };

  mail
    .send(message)
    .then(() => {
      //   console.log("Email sent Successfully");
      res.status(200).json({
        emailConfirmation: "Email sent successfully",
        sessionData: sessionData,
      });
    })
    .catch((err) => {
      //   console.error(err);
      res.status(500).send({
        message: "Email not sent",
        error: err.message,
        sessionData: sessionData,
      });
    });
});


// Get Order History by customer email

router.get("/customer", async (req, res) => {
  const {email} = req.body

  // Find order histories associated with email 

  // const orderHistorySessions = await prisma.orderHistory.findMany({
  //   where: {
  //     email
  //   },
  //   select: {
  //     sessionId
  //   }
  // })

  const orderHistorySessions = await stripe



})


module.exports = router;
