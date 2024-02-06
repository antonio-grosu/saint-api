const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://saintsmodels.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Saint Mailing App");
});

app.post("/", async (req, res) => {
  const { name, option, username, email, country, number, insta } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saintsmodels1@gmail.com",
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from: "contact.codevs@gmail.com",
    to: "contact.codevs@gmail.com",
    subject: `${name} CV | saintsmodels.com `,
    date: new Date("2000-01-01 00:00:00"),
    html: `<h1>Hi! My name is ${name} </h1>  <br/> <h3>I live in : ${country} <br/> Instagram Account : ${insta} <br/> Username OnlyFans : ${username}</h3> <br/> <p>My email : ${email} <br/> My phone number : ${number}<p/> <br/> `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send("Error in Sending Email");

      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email Sent");
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
