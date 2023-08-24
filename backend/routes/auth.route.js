const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateDetails,
  updatePassword,
} = require("../controllers/auth.cotroller");

const { protect } = require("../middlware/auth.middlware");

router.post("/register", register);
router.get("/login", login);
router.get("/getCurrentUser", protect, getCurrentUser);
router.put("/updateDetails", protect, updateDetails);
router.put("/updatePassword", protect, updatePassword);

module.exports = router;
