const { addQuestion, getQuestions, voteQuestion } = require("../controllers/questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, addQuestion);
router.get("/", auth, getQuestions);
router.post("/vote", auth, voteQuestion);

module.exports = router;
