const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { hashPassword } = require('../../utils/password')
const { returnErrorMessage } = require('../../utils/prismaValidator')

async function register(req, res) {
    const { email, password, name } = req.body
    
    try {

         await prisma.user.create({
            data: {
                email,
                password: await hashPassword(password),
                name
            }
        })

        res.status(201).send({email, name , message: "User created"})
    }catch(e){

        res.status(400).send(returnErrorMessage(e.code))

    }
}

function loginSuccess(res) {
    res.status(200).send({message: 'You successfully logged in.'});
}
function loginFailure(res) {
    res.status(400).send({message: 'You entered the wrong password.'});
}

function logout(req, res, next){
    req.logout((err) => {
        if (err) { return next(err); }
        res.status(200).send({message: 'Logout successful'});
    })
}

module.exports = {
    register,
    logout,
    loginSuccess,
    loginFailure,
}