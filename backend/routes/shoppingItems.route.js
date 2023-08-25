const express = require("express");
const router = express.Router();
const { protect } = require("../middlware/auth.middlware");
const {
  getShoppingItems,
  getShoppingItem,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
} = require("../controllers/shoppingItem.contoller");

router.route("/").get(protect, getShoppingItems).post(protect, createShoppingItem);
router
  .route("/:id")
  .get(getShoppingItem)
  .put(protect, updateShoppingItem)
  .delete(protect, deleteShoppingItem);

module.exports = router;
