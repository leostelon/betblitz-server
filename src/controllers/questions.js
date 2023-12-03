const { Questions } = require("../models/questions");
const fs = require("fs");

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

		const data = Questions.create({
			question,
			qid,
			yesAnswer,
			noAnswer,
			path,
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

const nodescript = async (req, res) => {
	try {
		const { script } = req.body;
		if (!script)
			return res.status(500).send({ message: "Please send script!" });

		const codePath = `questionApiScripts/code_${Date.now()}.js`;
		var writeStream = fs.createWriteStream(`${codePath}`);
		writeStream.write(script);
		writeStream.end();

		res.send({ filename: codePath });
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { addQuestion, getQuestions, nodescript };
