const express = require("express");
const {
  addPayroll,
  getPayroll,
  getPayrolls,
  getEmployeePayroll,
  updatePayroll,
  deletePayroll,
} = require("../../controllers/payroll");

const router = new express.Router();

router.post("/create", addPayroll);
router.patch("/update", updatePayroll);
router.delete("/delete", deletePayroll);
router.get("/show/:id", getPayroll);
router.get("/all", getPayrolls);
router.get("/employee/:id", getEmployeePayroll);

module.exports = router;
