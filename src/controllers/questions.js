const { Questions } = require("../models/questions");
const fs = require("fs");
const { Vote } = require("../models/vote");
const { makeRequestMumbai } = require("../utils/request.js")

const addQuestion = async (req, res) => {
	try {
		const { question, qid, yesAnswer, noAnswer, path, expireAt } = req.body;
		if (!question) return res.status(400).json({ error: "required question" });
		// if (!qid) return res.status(400).json({ error: "required qid" });
		if (!yesAnswer)
			return res.status(400).json({ error: "required yesAnswer" });
		if (!noAnswer) return res.status(400).json({ error: "required noAnswer" });
		if (!path) return res.status(400).json({ error: "required path" });
		if (!expireAt) return res.status(400).json({ error: "required expireAt" });

		const data = await Questions.create({
			question,
			yesAnswer,
			noAnswer,
			path,
			expireAt,
			user: req.user._id,
		});

		return res.status(200).json(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};
const getQuestions = async (req, res) => {
	try {
		const data = await Questions.aggregate([
			{
				$lookup: {
					from: "votes",
					as: "votes",
					let: { question: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$question", "$$question"] },
								user: req.user ? req.user._id : "",
							},
						},
					],
				},
			},
		]);

		res.status(200).send(data);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const nodescript = async (req, res) => {
	try {
		const { script } = req.body;
		if (!script)
			return res.status(500).send({ message: "Please send script!" });

		const codePath = `questionApiScripts/code_${Date.now()}.js`;
		var writeStream = fs.createWriteStream(codePath);
		writeStream.write(script);
		writeStream.end();

		res.send({ filename: codePath });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const voteQuestion = async (req, res) => {
	try {
		const question = await Questions.findById(req.body.question);
		const vote = await new Vote({
			question: question._id,
			...req.body,
			user: req.user._id,
		}).save();

		res.status(201).send(vote);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const closeQuestion = async (req, res) => {
	try {
		if (!req.body.question) return res.status(400).send({ message: "please send question id" });

		const question = await Questions.findById(req.body.question);
		const resp = await makeRequestMumbai(question.path).catch((e) => {
			console.error(e);
			process.exit(1);
		});
		question.finalAnswer = req.body.finalAnswer;
		await question.save()
		res.send({ finalAnswer: resp })
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

module.exports = { addQuestion, getQuestions, voteQuestion, nodescript, closeQuestion };
