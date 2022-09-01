const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getUser(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    } catch (e) {
        return e
    }
}

module.exports = {
    getUser
}