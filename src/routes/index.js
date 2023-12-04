const router = require("express").Router();
const questions = require("./questions");
const user = require("./user");
const coin = require("./coin");

router.use("/questions", questions);
router.use("/user", user);
router.use("/coin", coin);

module.exports = { routes: router };
