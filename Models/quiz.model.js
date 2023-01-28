const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    category: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    question: { type: String, required: true },
    correct_answer: { type: String },
    incorrect_answers: { type: Array}
})
const UserModel = mongoose.model("questions", UserSchema);
module.exports = { UserModel };