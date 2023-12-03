const router = require("express").Router();
const questions = require("./questions");
const user = require("./user");



router.use("/questions", questions);
router.use("/user", user);

module.exports = { routes: router };
