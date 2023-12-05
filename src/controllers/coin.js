const { isValidObjectId } = require("mongoose");
const { Cions } = require("../models/coin");

const addCoinPlay = async (req, res) => {
	try {
		const { playerOneSelection, amount } = req.body;

		if (!playerOneSelection)
			return res.status(400).json({ error: "required playerOneSelection" });
		if (!amount) return res.status(400).json({ error: "required amount" });
		if (!(playerOneSelection === "HEADS" || playerOneSelection === "TAILS"))
			return res
				.status(400)
				.json({ error: "playerOneSelection should be HEADS or TAILS" });

		const data = await Cions.create({
			status: "WAITING",
			playerOne: req.user._id,
			playerOneSelection,
			amount,
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
				playerOne: { $ne: req.user._id },
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

		const output = Math.random() < 0.5 ? 0 : 1;

		console.log("vrf get result", output);

		if (!(output === 0 || output === 1)) {
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

		const finalData = await Cions.findOneAndUpdate(
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
		const data = await Cions.find({
			$or: [{ playerOne: req.user._id }, { playerTwo: req.user._id }],
		}).sort({
			createdAt: -1,
		});

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getAvailablePlays = async (req, res) => {
	try {
		const data = await Cions.find({
			status: "WAITING",
		})
			.sort({
				createdAt: -1,
			})
			.populate(["playerOne"]);

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	addCoinPlay,
	cancleCoinPlay,
	joinCoinPlay,
	getCoinPlay,
	getAvailablePlays,
};
