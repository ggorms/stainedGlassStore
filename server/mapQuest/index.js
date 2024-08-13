const router = require("express").Router();
const axios = require("axios");

router.get("/map/:address", async (req, res, next) => {
  try {
    const { address } = req.params;
    // console.log("Address", address);
    const map = await axios.get(
      "https://www.mapquestapi.com/staticmap/v5/map",
      {
        params: {
          key: process.env.MAPQUEST_KEY,
          locations: address,
          size: "300,200",
        },
      }
    );
    res.status(200).json({ mapUrl: map.request.res.responseUrl });
    // console.log(map.request.res.responseUrl);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
