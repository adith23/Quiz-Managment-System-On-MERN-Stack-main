const Quiz = require("../models/quizModel");
const Activity = require("../models/activityModel");

const quizController = {
  // GET all quizzes
  getAllQuizzes: async (req, res) => {
    try {
      const searchTerm = req.query.search;

      let quizzes;
      if (searchTerm) {
        // If there's a search term, find quizzes that match the search term
        quizzes = await Quiz.find({
          title: { $regex: searchTerm, $options: "i" }, // Search case-insensitive
        });
      } else {
        // If there's no search term, return all quizzes
        quizzes = await Quiz.find({});
      }

      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET all quizzes for logged in user
  getAllUserQuizzes: async (req, res) => {
    try {
      // Extract user ID from request object (provided by authenticateToken middleware)
      const userId = req.user.id;

      // Fetch quizzes created by the logged-in user
      const quizzes = await Quiz.find({ createdBy: userId });
      console.log(userId);
      console.log(quizzes);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getQuizById: async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await Quiz.findById(quizId);
      if (quiz) {
        res.json(quiz);
      } else {
        res.status(404).json({ error: "Quiz not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Replace the old createQuiz function with the modified one
  createQuiz: async (req, res) => {
    try {
      // Extract user ID from request object (provided by authenticateToken middleware)
      const userId = req.user.id;

      // Add a console.log statement to check the user ID
      console.log("User ID:", userId);

      // Extract quiz data from request body
      const { title, questions, timeLimit, category } = req.body;

      console.log("Quiz Title:", title);

      // Create new quiz object with user ID
      const quiz = new Quiz({
        title,
        questions,
        timeLimit,
        category,
        createdBy: userId,
      });

      // Save the quiz to the database
      const savedQuiz = await quiz.save();

      // Create a new activity
      const activity = new Activity({
        userId,
        description: `Created a new quiz with Titile: ${title}`,
      });

      await activity.save();

      res.status(201).json(savedQuiz);
    } catch (error) {
      console.error("Error saving quiz:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteQuiz: async (req, res) => {
    try {
      const { quizId } = req.params;
      await Quiz.findByIdAndDelete(quizId);
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = quizController;
