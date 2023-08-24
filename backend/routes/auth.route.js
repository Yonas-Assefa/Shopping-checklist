const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/auth.cotroller");

const {protect} = require("../middlware/auth.middlware");

router.post("/register", register);
router.get("/login", login);
router.get("/getCurrentUser", protect, getCurrentUser);

module.exports = router;
