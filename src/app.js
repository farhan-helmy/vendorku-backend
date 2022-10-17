const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const transactionTypeRoute = require("./routes/transactionType");
const transactionRoute = require("./routes/transaction");
const employeeRoute = require("./routes/employee");
const payrollTypeRoute = require("./routes/payrollType");
const cookieParser = require("cookie-parser");
let RedisStore = require("connect-redis")(session);
require("./stratergies/local");

const { createClient } = require("redis");
const { isAuthenticated } = require("./middleware/passport");

let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:4000",
      "http://localhost:4000",
      "http://127.0.0.1:4001",
      "http://localhost:4001",
    ],
    credentials: true,
  })
);

app.use(morgan("short"));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/transactionType", isAuthenticated, transactionTypeRoute);
app.use("/api/v1/employee", isAuthenticated, employeeRoute);
app.use("/api/v1/payrollType", isAuthenticated, payrollTypeRoute);
app.use("/api/v1/transaction", isAuthenticated, transactionRoute);

module.exports = app;
