const express = require("express");
const welcomeRouter = require("./welcome/welcome-router");
const userRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const restricted = require("./auth/restricted-middleware");

const server = express();

const sessionConfig = {
  name: "user",
  secret: "chipsAhoy",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require("./data/config"),
    tableName: "sessions",
    sidfieldname: "SID",
    createTable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(express.json());
server.use(session(sessionConfig));
server.use("/", welcomeRouter);
server.use("/users", restricted, userRouter); // globally adds middleware
server.use("/auth", authRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "internal server error",
  });
});

module.exports = server;
