const express = require("express");
const router = express.Router();
const { getTotalCosts } = require("../controllers/totalCost.contoller");

router.route("/").get(getTotalCosts)

module.exports = router;
