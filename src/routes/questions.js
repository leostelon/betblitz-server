const { addQuestion, getQuestions } = require("../controllers/questions");
// const auth = require("../middlewares/auth");

const router = require("express").Router();

// router.post("/", auth, addQuestion);
router.post("/", addQuestion);
router.get("/", getQuestions);

module.exports = router;
