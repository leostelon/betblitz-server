const { addQuestion, getQuestions } = require("../controllers/questions");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", auth, addQuestion);
router.get("/", auth, getQuestions);

module.exports = router;
