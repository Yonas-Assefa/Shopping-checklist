const express = require("express");
const router = express.Router();
const { getTotalCosts } = require("../controllers/totalCost.contoller");
const { protect } = require("../middlware/auth.middlware");


router.route("/").get(protect, getTotalCosts)

module.exports = router;
