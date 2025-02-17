express = require("express");
const { Question } = require("../models/question.model.js");
const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
  const question = req.body;

  if (!question.title || !question.description) {
    return res
      .status(400)
      .json({ success: false, message: "Title and description are required" });
  }

  const newQn = new Question(question);

  try {
    await newQn.save();
    res.status(201).json({ success: true, data: newQn });
  } catch (error) {
    console.error("Error in creating question", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error("Error in fetching questions", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("answers");
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error("Error in fetching question", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
