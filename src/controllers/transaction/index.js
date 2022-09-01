const {
    PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient()


async function createTransaction(req, res) {
    const { amount, transactionType, date } = req.body
    try {
        await prisma.transaction.create({
            data: {
                amount,
                transactionType,
                date
            }
        })

        res.status(201).send({
            message: `Transaction created`
        })
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function getTransaction(req, res) {
    const { id } = req.params

    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        })
        res.status(200).send(transaction)
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function getTransactions(req, res) {
    try {
        var transactions = await prisma.transaction.findMany()

        if(transactions.length === 0) {
            transactions = { message: "Transaction is empty", result: null }
        }
        res.status(200).send(transactions)
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function updateTransaction(req, res) {
    const { id, amount } = req.body
    try{
        await prisma.transaction.update({
            where:{
                id
            },
            data: {
                amount
            }
        })

        res.status(200).send({message: `Transaction ${id} updated`})
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function deleteTransaction(req, res){
    const { id } = req.body
    try{
        await prisma.transaction.delete({
            where: {
                id
            }
        })

        res.status(200).send({message: `Transaction ${id} deleted`})
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}

module.exports = {
    createTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
}