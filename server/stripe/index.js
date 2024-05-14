const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const CLEINT_URL = "http://localhost:5173";

router.post(`/create-checkout-session`, async (req, res) => {
  const { cartItems, user } = req.body;
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
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
    shipping_options: [
      { shipping_rate: "shr_1PG7ULJHFmNzdCGuMKCpGwsr" },
      { shipping_rate: "shr_1PG7lcJHFmNzdCGuYTBjof2h" },
      { shipping_rate: "shr_1PG7nkJHFmNzdCGuVuhP4WKq" },
    ],
    phone_number_collection: {
      enabled: true,
    },

    success_url: `${CLEINT_URL}?success=true`,
    cancel_url: `${CLEINT_URL}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
