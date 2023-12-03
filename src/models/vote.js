const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Types.ObjectId,
            ref: "Questions",
            required: true,
        },
        finalAnswer: {
            type: Boolean,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Vote = new mongoose.model("Vote", voteSchema);
module.exports = { Vote };
