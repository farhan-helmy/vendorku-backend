const express = require("express");
const {
  getPayrollTypes,
  addPayrollType,
  deletePayrollType,
  updatePayrollType,
} = require("../../controllers/payrollType");

const router = new express.Router();

router.post("/create", addPayrollType);
router.patch("/update", updatePayrollType);
router.delete("/delete", deletePayrollType);
router.get("", getPayrollTypes);

module.exports = router;
