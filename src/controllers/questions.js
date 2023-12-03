const { Questions } = require("../models/questions");
const { Vote } = require("../models/vote");

const addQuestion = async (req, res) => {
	try {
		const { question, qid, yesAnswer, noAnswer, api, expireAt } = req.body;
		if (!question) return res.status(400).json({ error: "required question" });
		if (!qid) return res.status(400).json({ error: "required qid" });
		if (!yesAnswer)
			return res.status(400).json({ error: "required yesAnswer" });
		if (!noAnswer) return res.status(400).json({ error: "required noAnswer" });
		if (!api) return res.status(400).json({ error: "required api" });
		if (!expireAt) return res.status(400).json({ error: "required expireAt" });

		const data = Questions.create({
			question,
			qid,
			yesAnswer,
			noAnswer,
			api,
			expireAt,
			user: req.user._id,
		});

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error adding question", error);
		res.status(500).json({ error: "Error adding question", e: error });
	}
};
const getQuestions = async (req, res) => {
	try {
		const data = await Questions.find({});

		res.status(200).json(data);
	} catch (error) {
		console.error("Can't get questions", error);
		res.status(500).json({ error: "Can't get questions", e: error });
	}
};


const voteQuestion = async (req, res) => {
	try {
		console.log(req.body)
		const question = await Questions.findById(req.body.question);
		const vote = await new Vote({
			question: question._id,
			...req.body,
			user: req.user._id
		}).save();

		res.status(201).send(vote);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


module.exports = { addQuestion, getQuestions, voteQuestion };
