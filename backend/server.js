const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//load env vars
dotenv.config({ path: "./config/config.env" });

//import routes
const app = express();
const PORT = process.env.PORT || 8000;

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
