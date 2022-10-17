const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../../utils/password");
const { returnErrorMessage } = require("../../utils/prismaValidator");

async function register(req, res) {
  const { email, password, name } = req.body;

  try {
    await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name,
      },
    });

    res.status(201).send({ email, name, message: "User created" });
  } catch (e) {
    res.status(400).send(returnErrorMessage(e.code));
  }
}

function me(req, res) {
  try {
    if (req.user === undefined) {
      throw ".";
    }
    let userData = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      created_at: req.user.createdAt,
    };
    res.status(200).send(userData);
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "unauthorized" });
  }
}

function loginSuccess(_, res) {
  res.status(200).send({ message: "You successfully logged in." });
}

function loginFailure(_, res) {
  res.status(401).send({ message: "Wrong username / password.", status: 401 });
}

function unauthorized(_, res) {
  res.status(401).send({ message: "unauthorized" });
}

function logout(req, res, next) {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send({ message: "Logout successful" });
  });
}

module.exports = {
  register,
  logout,
  loginSuccess,
  loginFailure,
  unauthorized,
  me,
};
