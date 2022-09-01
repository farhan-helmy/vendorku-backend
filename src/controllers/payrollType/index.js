const { PrismaClient } = require('@prisma/client')
const { returnErrorMessage } = require('../../utils/prismaValidator')
const prisma = new PrismaClient()

async function addPayrollType(req, res) {
    const { name } = req.body
    try{
        await prisma.payrollType.create({
            data: {
                name
            }
        })

        res.status(201).send({message:`Payroll type ${name} created`})
    }catch(e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function getPayrollTypes(req, res) {
    try{
        var payrollTypes = await prisma.payrollType.findMany()
        
        if(payrollTypes.length === 0) {
            payrollTypes = { message: "Payroll type is empty", result: null }
        }
        res.status(200).send(payrollTypes)
    }catch(e) {
        
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function updatePayrollType(req, res) {
    const { id, name } = req.body

    try{
        await prisma.payrollType.update({
            where: {
                id
            },
            data:{
                name
            }
        })

        res.status(200).send({message: `Payroll type updated to ${name}`})
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function deletePayrollType(req, res) {
    const { id } = req.body

    try{
        await prisma.payrollType.delete({
            where: {
                id
            }
        })

        res.status(200).send({message: `Payroll type ${id} deleted `})
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}

module.exports = {
    addPayrollType,
    getPayrollTypes,
    updatePayrollType,
    deletePayrollType
}