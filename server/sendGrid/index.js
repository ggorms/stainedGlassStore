const router = require("express").Router();
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_KEY);

// Contact Form

router.post("/email/contact-form", (req, res) => {
  const { fName, lName, customerEmail, content } = req.body;
  console.log("Fname", fName);
  console.log("lName", lName);
  console.log("email", customerEmail);
  console.log("content", content);
  const message = {
    to: "garrettgorman1@gmail.com",
    from: {
      name: "Dimensional Glassworks",
      email: "garrettgorman1@gmail.com",
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

module.exports = router;
