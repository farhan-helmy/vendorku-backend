const { PrismaClient } = require("@prisma/client");
const { returnErrorMessage } = require("../../utils/prismaValidator");
const prisma = new PrismaClient();

async function addPayroll(req, res) {
  const { amount, type, payeeId } = req.body;

  try {
    await prisma.payroll.create({
      data: {
        amount,
        type,
        payeeId,
      },
    });

    res
      .status(201)
      .send({ message: `Payroll for employee ${payeeId} created` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getPayroll(req, res) {
  const { id } = req.params;

  try {
    var payroll = await prisma.payroll.findUnique({
      where: {
        id,
      },
    });

    res.status(200).send(payroll);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getPayrolls(req, res) {
  try {
    var payrolls = await prisma.payroll.findMany();

    res.status(200).send(payrolls);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getEmployeePayroll(req, res) {
  const { id } = req.params;

  try {
    var employeePayroll = await prisma.employee.findUnique({
      where: {
        id,
      },
      include: {
        payrolls: true,
      },
    });

    res.status(200).send(employeePayroll);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function updatePayroll(req, res) {
  const { id } = req.params;

  try {
    await prisma.payroll.update({
      where: {
        id,
      },
    });

    res.status(200).send({ message: `Payroll ${id} updated` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function deletePayroll(req, res) {
  const { id } = req.params;

  try {
    await prisma.payroll.delete({
      where: {
        id,
      },
    });

    res.status(200).send({ message: `Payroll ${id} deleted` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

module.exports = {
  addPayroll,
  getPayroll,
  getPayrolls,
  getEmployeePayroll,
  updatePayroll,
  deletePayroll,
};
