const {
	addQuestion,
	getQuestions,
	nodescript,
	voteQuestion
} = require("../controllers/questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, addQuestion);
router.get("/", auth, getQuestions);
router.post("/nodescript", auth, nodescript);
router.post("/vote", auth, voteQuestion);

module.exports = router;
