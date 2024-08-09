const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const CLEINT_URL = "http://localhost:5173";

router.post(`/create-checkout-session`, async (req, res) => {
  const { cartItems, user } = req.body;
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

  if (productsInStock.some((product) => product.stockQty < 1)) {
    console.log("hit");
    res
      .status(400)
      .json({ message: "One or more items in your cart are out of stock." });
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
    // shipping_options: [
    //   { shipping_rate: "shr_1PG7ULJHFmNzdCGuMKCpGwsr" },
    //   { shipping_rate: "shr_1PG7lcJHFmNzdCGuYTBjof2h" },
    //   { shipping_rate: "shr_1PG7nkJHFmNzdCGuVuhP4WKq" },
    // ],
    phone_number_collection: {
      enabled: true,
    },
    // success_url: `${CLEINT_URL}/confirmation?success=true`,
    success_url: `${CLEINT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    // "http://yoursite.com/order/success?session_id={CHECKOUT_SESSION_ID}"
    cancel_url: `${CLEINT_URL}/cart`,
  });

  res.send({ url: session.url });
});

router.get("/confirmation", async (req, res, next) => {
  // const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log("session", session);
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
  console.log(paymentMethod);

  const sessionData = {
    id: session.id,
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
  };
  res.status(200).json(sessionData);
});

module.exports = router;
