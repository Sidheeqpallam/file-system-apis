const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const db = require("./models");

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/", require("./routes/data"));

// bad requist
app.use("*", (req, res) => {
  res.json({ message: "Bad Requist." });
});

db.sequelize.sync().then((req) => {
  app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server is running on ${PORT}`);
  });
});
