const router = require("express").Router();
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_KEY);

// Customer Inquiry Form

router.post("/email/contact-form", (req, res) => {
  const { fName, lName, customerEmail, content } = req.body;
  // console.log("Fname", fName);
  // console.log("lName", lName);
  // console.log("email", customerEmail);
  // console.log("content", content);
  const message = {
    to: process.env.CONTACT_EMAIL,
    from: {
      name: "Dimensional Glassworks",
      email: process.env.CONTACT_EMAIL,
    },
    replyTo: customerEmail,
    subject: `Customer Inquiry - ${fName} ${lName}`,
    text: content,
    html: `<h2>${fName} ${lName}</h2><h2>${customerEmail}</h2><br/><p>${content}</p>`,
  };

  mail
    .send(message)
    .then(() => {
      //   console.log("Email sent Successfully");
      res.status(200).send({
        message: "Email sent successfully",
      });
    })
    .catch((err) => {
      //   console.error(err);
      res.status(500).send({
        message: "Email not sent",
        error: err.message,
      });
    });
});

// Custom Request Form

router.post("/email/custom-request", (req, res) => {
  const {
    fName,
    lName,
    customerEmail,
    phone,
    size,
    dimension,
    enclosure,
    opacity,
    joint,
    color,
    image,
    description,
  } = req.body;

  // Extract color values from color object
  const colors = Object.values(color);

  // console.log(first);

  const message = {
    to: process.env.CONTACT_EMAIL,
    from: {
      name: "Dimensional Glassworks",
      email: process.env.CONTACT_EMAIL,
    },
    replyTo: customerEmail,
    template_id: process.env.CUSTOM_REQUEST_TEMPLATE_ID,
    dynamic_template_data: {
      fName,
      lName,
      customerEmail,
      phone,
      size,
      dimension,
      enclosure,
      opacity,
      joint,
      description,
      colors,
    },
  };

  mail
    .send(message)
    .then(() => {
      //   console.log("Email sent Successfully");
      res.status(200).send({
        message: "Email sent successfully",
      });
    })
    .catch((err) => {
      //   console.error(err);
      res.status(500).send({
        message: "Email not sent",
        error: err.message,
      });
    });
});

module.exports = router;
