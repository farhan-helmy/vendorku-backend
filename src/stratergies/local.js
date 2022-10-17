const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { verifyPassword } = require("../utils/password");

const prisma = new PrismaClient();

async function passportFindUser(email, password, done) {
  //console.log(email)
  await prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then(async (user) => {
      if (!user) {
        return done(null, false);
      }

      if (await verifyPassword(password, user.password)) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      done(err);
    });
}

passport.use(new LocalStrategy({ usernameField: "email" }, passportFindUser));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  await prisma.user
    .findUnique({
      where: {
        id,
      },
    })
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err);
    });
});
