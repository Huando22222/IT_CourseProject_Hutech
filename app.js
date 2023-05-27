const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
const googleAuth = require("./routes/index");
const { Connect } = require("./config/connect");
const cors = require("cors");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true, // Nếu bạn sử dụng HTTPS, hãy đặt giá trị true
      maxAge: 3600000 // Thời gian tồn tại của session (1 giờ trong trường hợp này)
    }
  })
);
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
//cors

app.use(cors());
//express session

//dotenv
dotenv.config();
Connect();
//morgan
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./auth/google-auth")(passport);

app.use("/", googleAuth);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
//https://www.youtube.com/watch?v=D-eYEN6IoKE
