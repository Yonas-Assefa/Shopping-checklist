const express = require("express");
const router = express.Router();
const {
  getShoppingItems,
  getShoppingItem,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
   
} = require("../controllers/shoppingItem.contoller");

router.route("/").get(getShoppingItems).post(createShoppingItem);
router
  .route("/:id")
  .get(getShoppingItem)
  .put(updateShoppingItem)
  .delete(deleteShoppingItem);

  
module.exports = router;
