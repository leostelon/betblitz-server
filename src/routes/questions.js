const {
	addQuestion,
	getQuestions,
	nodescript,
	voteQuestion,
	closeQuestion
} = require("../controllers/questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, addQuestion);
router.get("/", auth, getQuestions);
router.post("/nodescript", auth, nodescript);
router.post("/vote", auth, voteQuestion);
router.post("/close", auth, closeQuestion);

module.exports = router;
