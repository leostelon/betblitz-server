const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema(
	{
		playerOne: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		playerTwo: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		status: {
			type: String,
			required: true,
			// WAITING, COMPLETED, PLAYING, CANCLED, FAILED
		},
		playerOneSelection: {
			type: String,
			required: true,
			// HEADS, TAILS
		},
		result: {
			type: String,
			// HEADS, TAILS
		},
	},
	{
		timestamps: true,
	}
);

const Cions = new mongoose.model("Cions", CoinSchema);
module.exports = { Cions };
