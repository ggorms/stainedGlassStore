const express = require("express");
const router = express.Router();

router.use("/product", require("./product"));
router.use("/address", require("./address"));
router.use("/cart", require("./cart"));
router.use("/cartItem", require("./cartItem"));

module.exports = router;
