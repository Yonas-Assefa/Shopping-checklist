const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middlware/error");

//import routes
shoppingItem = require("./routes/shoppingItems.route");
totalCost = require("./routes/totalCost.route");
auth = require("./routes/auth.route");

//load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

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
app.use("/api/v1/totalCosts", totalCost);
app.use("/api/v1/register", auth);

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
