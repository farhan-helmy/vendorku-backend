const { PrismaClient } = require("@prisma/client");
const { returnErrorMessage } = require("../../utils/prismaValidator");
const prisma = new PrismaClient();

async function addTransactionType(req, res) {
  const { name } = req.body;
  try {
    let transactionType = await prisma.transactionType.create({
      data: {
        name,
      },
    });

    res.status(201).send(transactionType);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getTransactionType(req, res) {
  try {
    const { id } = req.params;

    const transactionType = await prisma.transactionType.findUnique({
      where: {
        id,
      },
    });
    res.status(200).send(transactionType);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getTransactionTypes(req, res) {
  try {
    var transactionTypes = await prisma.transactionType.findMany();

    if (transactionTypes.length === 0) {
      transactionTypes = { message: "Transaction type is empty", result: null };
    }
    res.status(200).send(transactionTypes);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function updateTransactionType(req, res) {
  const { id, name } = req.body;

  try {
    await prisma.transactionType.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.status(200).send({ message: `Transaction type updated to ${name}` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function deleteTransactionType(req, res) {
  const { id } = req.body;

  try {
    await prisma.transactionType.delete({
      where: {
        id,
      },
    });

    res.status(200).send({ message: `Transaction type ${id} deleted ` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

module.exports = {
  addTransactionType,
  getTransactionTypes,
  getTransactionType,
  updateTransactionType,
  deleteTransactionType,
};
