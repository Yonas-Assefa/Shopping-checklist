const express = require("express");
const router = express.Router();
const { getShoppingItems } = require("../controllers/shoppingItem.contoller");

router.route("/").get(getShoppingItems);

module.exports = router;
