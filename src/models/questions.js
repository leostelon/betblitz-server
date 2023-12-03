const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		qid: {
			type: Number,
			required: true,
			unique: true,
		},
		finalAnswer: {
			type: Boolean,
		},
		yesAnswer: {
			type: String,
			required: true,
		},
		noAnswer: {
			type: String,
			required: true,
		},
		api: {
			type: String,
			required: true,
		},
		expireAt: {
			type: Date,
			required: true,
		},
		percentage: {
			yes: {
				type: Number,
			},
			no: {
				type: Number,
			},
		},
	},
	{
		timestamps: true,
	}
);

const Questions = new mongoose.model("Questions", questionsSchema);
module.exports = { Questions };
