const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const CLEINT_URL = "http://localhost:5173";

router.post(`/create-checkout-session`, async (req, res) => {
  const { cartItems } = req.body;
  console.log(cartItems);
  const session = await stripe.checkout.sessions.create({
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price,
      },
      quantity: item.qty,
    })),

    mode: "payment",
    success_url: `${CLEINT_URL}?success=true`,
    cancel_url: `${CLEINT_URL}/checkout`,
  });

  res.send({ url: session.url });
});

module.exports = router;
