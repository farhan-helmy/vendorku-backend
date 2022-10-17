const express = require("express");
const {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../../controllers/transaction");
const router = new express.Router();

router.post("/create", createTransaction);
router.get("/:id", getTransaction);
router.get("", getTransactions);
router.patch("/update", updateTransaction);
router.delete("/delete", deleteTransaction);

module.exports = router;
