const express = require("express");
const articleRouter = require('./routes/articles')
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/Pictures", express.static(__dirname + "public/Pictures"));
app.use("/scripts", express.static(__dirname + "public/scripts"));

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Import external routes 
app.use('/blog', articleRouter)

// Routes

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", (req, res) => {
  const output = `
  <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Mail: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  async function main() {
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'julian.sagberger@gmail.com', // generated ethereal user
      pass: '#Number123', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nodemailer" <julian.sagberger@gmail.com>', // sender address
    to: "julianleonyoga@gmail.com", // list of receivers
    subject: "Yoga", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  

  res.render('index')
}
main().catch(console.error);

});

app.get("/angebot", (req, res) => {
  res.render("angebot");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000!!!!");
});
