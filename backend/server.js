const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDb } = require("./config/index.js");
const { router } = require("./router/router.js");

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 1999;

app.use("/api", router);

connectDb().then(() => {
  app.listen(port, () => {
  
})
}).catch((error) => {
  
})

module.exports = app;