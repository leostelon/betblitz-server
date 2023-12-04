const {
	addCoinPlay,
	joinCoinPlay,
	cancleCoinPlay,
	getCoinPlay,
} = require("../controllers/coin");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/addCoinPlay", auth, addCoinPlay);
router.patch("/cancleCoinPlay/:id", auth, cancleCoinPlay);
router.patch("/joinCoinPlay/:id", auth, joinCoinPlay);
router.get("/:id", auth, getCoinPlay);

module.exports = router;
