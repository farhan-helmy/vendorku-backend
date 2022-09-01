const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const { verifyPassword } = require('../utils/password')

const prisma = new PrismaClient()

async function passportFindUser(email, password, cb) {
    console.log(email)
    await prisma.user.findUnique({
        where:{
            email
        }
    }).then((user) => {
        if (!user){
            return cb(null, false)   
        }
        
        if(verifyPassword(password, user.password)){
            return cb(null, user);
        }else{
            return cb(null, false)
        }
    })
    .catch((err) => {
        cb(err)
    })
}

passport.use(new LocalStrategy({usernameField: 'email'},
    passportFindUser
))

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
   await prisma.user.findUnique({
    where: {
        id
    }
   }).then((user) => {
    cb(null, user)
   }).catch((err) => {
    cb(err)
   })
});

