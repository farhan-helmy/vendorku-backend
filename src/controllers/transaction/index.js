const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { returnErrorMessage } = require("../../utils/prismaValidator");

async function createTransaction(req, res) {
  const { amount, transactionType, date } = req.body;
  try {
    let transaction = await prisma.transaction.create({
      data: {
        amount,
        transactionType,
        date: new Date(date),
      },
    });

    res.status(201).send(transaction);
  } catch (e) {
    console.log(e);
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getTransaction(req, res) {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    console.log(transaction);
    res.status(200).send(transaction);
  } catch (e) {
    console.log(e);
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function getTransactions(req, res) {
  try {
    var transactions = await prisma.transaction.findMany();

    if (transactions.length === 0) {
      transactions = { message: "Transaction is empty", result: null };
    }
    res.status(200).send(transactions);
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function updateTransaction(req, res) {
  const { id, amount, transactionType, date } = req.body;
  if (date) {
    var dateData = new Date(date);
  }
  try {
    let updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        amount: amount || undefined,
        transactionType: transactionType || undefined,
        date: dateData || undefined,
      },
    });

    res.status(200).send(updatedTransaction);
  } catch (e) {
    console.log(e);
    res.status(400).send(returnErrorMessage(e.code));
  }
}

async function deleteTransaction(req, res) {
  const { id } = req.body;
  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    res.status(200).send({ message: `Transaction ${id} deleted` });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

module.exports = {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
