const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateDetails,
  updatePassword,
  logout,
} = require("../controllers/auth.cotroller");

const { protect } = require("../middlware/auth.middlware");

router.post("/register", register);
router.post("/login", login);
router.get("/getCurrentUser", protect, getCurrentUser);
router.get("/logout", protect, logout);
router.put("/updateDetails", protect, updateDetails);
router.put("/updatePassword", protect, updatePassword);

module.exports = router;
