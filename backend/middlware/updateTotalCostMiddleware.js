// middleware/updateTotalCostMiddleware.js
const ShoppingItem = require("../models/ShoppingItem.model");

async function updateTotalCost() {
  const totalCostResult = await ShoppingItem.aggregate([
    {
      $group: {
        _id: null,
        totalCost: { $sum: "$cost" },
      },
    },
  ]);

  const totalBoughtCostResult = await ShoppingItem.aggregate([
    { $match: { isBought: true } },
    {
      $group: {
        _id: null,
        totalBoughtCost: { $sum: "$cost" },
      },
    },
  ]);

  const totalCost = totalCostResult[0]?.totalCost || 0;
  const totalBoughtCost = totalBoughtCostResult[0]?.totalBoughtCost || 0;
}

module.exports = updateTotalCost;
