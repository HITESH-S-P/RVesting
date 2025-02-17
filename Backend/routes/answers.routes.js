express = require("express");
const { Question, Answer } = require("../models/question.model.js");
mongoose = require("mongoose");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  const answer = req.body;

  if (!answer.content) {
    return res
      .status(400)
      .json({ success: false, message: "Content is required" });
  }

  const newAnswer = new Answer(answer);

  try {
    await newAnswer.save();
    res.status(201).json({ success: true, data: newAnswer });
  } catch (error) {
    console.error("Error in creating answer", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/:questionId/answers", async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "Content is required" });
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    const newAnswer = new Answer({ content });
    question.answers.push(newAnswer);

    await question.save();
    res.status(201).json({ success: true, data: newAnswer });
  } catch (error) {
    console.error("Error in adding answer to question", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json({ success: true, data: answers });
  } catch (error) {
    console.log("Error in fetching answers", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
