const express = require("express");
const {
  registerEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../../controllers/employee");

const router = new express.Router();

router.post("", registerEmployee);
router.get("/:id", getEmployee);
router.get("", getEmployees);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
