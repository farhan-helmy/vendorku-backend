const bcrypt = require("bcrypt");
const randomstring = require('randomstring')

async function hashPassword(password) {
    try {
        var hashedPassword = await bcrypt.hash(password, 10)

        return hashedPassword
    } catch (e) {
        return e
    }

}

async function verifyPassword(password, userPassword) {
    try {
        var isMatch = await bcrypt.compare(password, userPassword)

        if (!isMatch) {
            return false
        }
        return true

    } catch (e) {
        return e
    }
}

function generateRandomPassword(){
    try{
        return randomstring.generate(7)
    }catch(e){
        return e
    }
}

async function generateRandomHashedPassword() {
    try{
        var randPass = generateRandomPassword()
        var randPassHashed = await hashPassword(randPass)

        return {
            randPass: randPass,
            randPassHashed: randPassHashed
        }

    }catch(e){
        return e
    }
}


module.exports = {
    hashPassword,
    verifyPassword,
    generateRandomHashedPassword
}