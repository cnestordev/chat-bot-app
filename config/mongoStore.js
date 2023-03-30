const session = require("express-session");
const MongoStoreFactory = require("connect-mongo");
const mongoose = require("mongoose");

const MongoStore = MongoStoreFactory;

const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1:27017/usersDB",
  secret: "These violent delights have violent ends",
  touchAfter: 24 * 60 * 60,
});

module.exports = store;
