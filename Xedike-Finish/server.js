// Require package
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");

require("dotenv").config(); // use for .env file
const app = express();
const port = process.env.PORT || 1234;

const userRouter = require("./routes/api/user/userIndex");
const driverRouter = require("./routes/api/driver/driverIndex");
const tripRouter = require("./routes/api/trip/tripIndex");

// Setting for server
mongoose
  .connect(process.env.MONGOOSE_URL, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"))
  .catch(console.log);
app.listen(port, () => {
  console.log("server running on port: " + port);
});

// Middleware allow origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
  next();
});

// Middleware parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Middleware serve static file
app.use("/uploads", express.static("uploads"));

// Middleware router
app.use("/api/user", userRouter);
app.use("/api/user/driver", driverRouter);
app.use("/api/trip", tripRouter);
