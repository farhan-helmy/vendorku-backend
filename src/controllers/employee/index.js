const { PrismaClient } = require('@prisma/client')
const { generateRandomHashedPassword } = require('../../utils/password')
const { returnErrorMessage } = require('../../utils/prismaValidator')
const prisma = new PrismaClient()

async function registerEmployee(req, res) {
    const { email, name, ic_number } = req.body
    const { randPass, randPassHashed } = await generateRandomHashedPassword()
    
    try {
        await prisma.employee.create({
            data: {
                email,
                name,
                ic_number,
                password: randPassHashed
            }
        })

        res.status(201).send({
            message: `Employee created, temporary password ${randPass}`
        })
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function getEmployee(req, res) {
    const { id } = req.params

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(201).send(employee)
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function getEmployees(req, res) {

    try {
        const employees = await prisma.employee.findMany()

        res.status(201).send(employees)
    } catch (e) {
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function updateEmployee(req, res) {
    const { id } = req.params
    const { name, email, password, ic_number } = req.body
    try{
        await prisma.employee.update({
            where: {
                id
            },
            data:{
                name: name || undefined,
                email: email || undefined,
                password: password || undefined,
                ic_number: ic_number || undefined
            }
        })

        res.status(200).send({ message: `Employee ${id} updated` })
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}

async function deleteEmployee(req, res) {
    const { id } = req.params

    try{
        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(200).send({ message: `Employee ${id} deleted` })
    }catch(e){
        res.status(400).send(returnErrorMessage(e.code))
    }
}


module.exports = {
    registerEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
}