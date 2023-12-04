const {
	addCoinPlay,
	joinCoinPlay,
	cancleCoinPlay,
	getCoinPlay,
} = require("../controllers/coin");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/", auth, addCoinPlay);
router.patch("/cancleCoinPlay/:id", auth, cancleCoinPlay);
router.patch("/joinCoinPlay/:id", auth, joinCoinPlay);
router.get("/", auth, getCoinPlay);

module.exports = router;
