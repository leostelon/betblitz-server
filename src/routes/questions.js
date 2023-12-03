const {
	addQuestion,
	getQuestions,
	nodescript,
} = require("../controllers/questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, addQuestion);
router.get("/", auth, getQuestions);
router.post("/nodescript", auth, nodescript);

module.exports = router;
