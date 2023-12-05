const {
	addCoinPlay,
	joinCoinPlay,
	cancleCoinPlay,
	getCoinPlay,
	getAvailablePlays,
} = require("../controllers/coin");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/", auth, addCoinPlay);
router.patch("/cancleCoinPlay/:id", auth, cancleCoinPlay);
router.patch("/joinCoinPlay/:id", auth, joinCoinPlay);
router.get("/", auth, getCoinPlay);
router.get("/availablePlays", auth, getAvailablePlays);

module.exports = router;
