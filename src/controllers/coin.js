const { isValidObjectId } = require("mongoose");
const { Cions } = require("../models/coin");

const addCoinPlay = async (req, res) => {
	try {
		const { playerOne, playerOneSelection } = req.body;
		if (!playerOne)
			return res.status(400).json({ error: "required playerOne" });
		if (playerOneSelection)
			return res.status(400).json({ error: "required playerOneSelection" });
		if (!(playerOneSelection === "HEADS" || playerOneSelection === "TAILS"))
			return res
				.status(400)
				.json({ error: "playerOneSelection should be HEADS or TAILS" });

		// checking user already playing coin game
		const anyPlayingGames = await Cions.findOne({
			user: req.user._id,
			status: { $in: ["PLAYING", "WAITING"] },
		});
		if (anyPlayingGames) {
			return res
				.status(400)
				.json({ error: "user alredy playing a game, can't create new one" });
		}

		// else create new game
		const data = await Cions.create({
			status: "WAITING",
			playerOne,
			playerOneSelection,
		});

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const cancleCoinPlay = async (req, res) => {
	try {
		const coinId = req.params.id;

		if (!isValidObjectId(coinId))
			return res.status(400).json({ error: "In valid coin play Id" });

		const data = await Cions.updateOne(
			{
				_id: coinId,
				playerOne: req.user._id,
				status: "WAITING",
			},
			{
				status: "CANCLED",
			}
		);

		if (!data) {
			return res
				.status(400)
				.json({ error: "could not find user waiting for this game to cancle" });
		}

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const joinCoinPlay = async (req, res) => {
	try {
		const coinId = req.params.id;

		if (!isValidObjectId(coinId))
			return res.status(400).json({ error: "In valid coin play Id" });

		const data = await Cions.updateOne(
			{
				_id: coinId,
				status: "WAITING",
			},
			{
				status: "PLAYING",
				playerTwo: req.user._id,
			}
		);

		if (!data) {
			return res
				.status(400)
				.json({ error: "could not find waiting coin game" });
		}

		// ! call vrf get result

		const output = 0; // 0 or 1
		// on result

		console.log("vrf get result", output);

		if (!(output === O || output === 1)) {
			await Cions.updateOne(
				{
					_id: coinId,
				},
				{
					status: "FAILED",
				}
			);
			return res.status(400).json({ error: "Game Error." });
		}

		const finalData = await Cions.updateOne(
			{
				_id: coinId,
			},
			{
				status: "COMPLETED",
				result: output === 0 ? "TAILS" : "HEADS",
			}
		);

		return res.status(200).json(finalData);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getCoinPlay = async (req, res) => {
	try {
		const coinId = req.params.id;

		if (!isValidObjectId(coinId))
			return res.status(400).json({ error: "In valid coin play Id" });

		const data = await Cions.findOne({
			_id: coinId,
			$or: [{ playerOne: req.user._id }, { playerTwo: req.user._id }],
		});

		if (!data) {
			return res.status(400).json({ error: "could not game" });
		}

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { addCoinPlay, cancleCoinPlay, joinCoinPlay,getCoinPlay };
