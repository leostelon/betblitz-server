const mongoose = require("mongoose");

// Function to verify if a string is a valid Mongoose ObjectId
function isValidObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { isValidObjectId };
