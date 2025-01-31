const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDb } = require("../config/index.js");
const { router } = require("../router/router.js");

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 1999;

app.use("/api", router);

connectDb().then(() => {
  app.listen(port, "0.0.0.0", () => {
  
})
}).catch((error) => {
  
})

module.exports = app;