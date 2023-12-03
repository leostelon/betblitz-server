const router = require("express").Router();
const questions = require("./questions");



router.use("/questions", questions);

module.exports = { routes: router };
