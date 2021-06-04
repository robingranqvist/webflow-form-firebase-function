const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "youremail@hotmail.com",
    pass: "yourpassword",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.webflowMail = functions.https.onRequest((req, res) => {
  const subject = req.body.subject;
  const name = req.body.name;
  const message = req.body.message;

  const options = {
    from: "youremail@hotmail.com",
    to: "youremail@hotmail.com",
    subject: subject,
    html: `<b>Message sent from ${name}</b><br><br>${message}`,
  };

  transporter.sendMail(options, function(err) {
    // Error
    if (err) {
      return res.redirect("https://yourdomain.webflow.io/error");
    }

    // Success
    return res.redirect("https://yourdomain.webflow.io/success");
  });
});
