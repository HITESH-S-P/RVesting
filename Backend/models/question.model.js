mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

const QuestionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // tags: [{
  //     type: String
  // }],
  answers: [AnswerSchema],
});

const Question = mongoose.model("Question", QuestionSchema);
const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = { Question, Answer };
