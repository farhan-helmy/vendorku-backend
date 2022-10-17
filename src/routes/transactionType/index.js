const express = require("express");
const {
  getTransactionTypes,
  addTransactionType,
  updateTransactionType,
  deleteTransactionType,
  getTransactionType,
} = require("../../controllers/transactionType");

const router = new express.Router();

router.post("/create", addTransactionType);
router.patch("/update", updateTransactionType);
router.delete("/delete", deleteTransactionType);
router.get("/:id", getTransactionType);
router.get("", getTransactionTypes);

module.exports = router;
