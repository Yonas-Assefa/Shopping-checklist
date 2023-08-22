const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//import routes
shoppingItem = require("./routes/shoppingItems.route");

//load env vars
dotenv.config({ path: "./config/config.env" });

//setup the server
const app = express();
const PORT = process.env.PORT || 8000;

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount the routes
app.use("/api/v1/shoppingItems", shoppingItem);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
