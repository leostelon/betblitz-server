const { Questions } = require("../models/questions");

const addQuestion = async (req, res) => {
	try {
		const { question,
			qid,
			yesAnswer,
			noAnswer,
			api,
			expireAt, } = req.body;
		if (!question) return res.status(400).json({ error: "required question" });
		if (!qid) return res.status(400).json({ error: "required qid" });
		if (!yesAnswer) return res.status(400).json({ error: "required yesAnswer" });
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
		});

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error adding question", error);
		res.status(500).json({ error: "Error adding question", e: error });
	}
};
const getQuestions= async (req, res) => {
	try {
		const data = await Token.find({
		});

		res.status(200).json({ data });
	} catch (error) {
		console.error("Can't get questions", error);
		res.status(500).json({ error: "Can't get questions", e: error });
	}
};

module.exports = { addQuestion, getQuestions };
