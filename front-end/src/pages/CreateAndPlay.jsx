import { useState, useEffect } from "react";
import "./CreateAndPlay.css";
import Navibar2 from "../components/layout/Navibar2";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const mathImg = "/maths.png";
const technologyImg = "/technology.png";
const scienceImg = "/science.png";
const historyImg = "/history.png";
const businessImg = "/business.png";
const financeImg = "/finance.png";
const defaultImg = "/maths.png";

const CreateAndPlay = () => {
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedQuizzes = async () => {
      try {
        const { data } = await api.get("/quizzes/user");
        setCreatedQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      }
    };

    fetchCreatedQuizzes();
  }, []);

  const handleQuizCardClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handlePlayQuiz = () => {
    setIsPlayModalOpen(true);
  };

  const handleJoinQuiz = (gamePin) => {
    console.log("Game Pin:", gamePin);
    fetchSessionDetails(gamePin);
  };

  const fetchSessionDetails = async (gamePin) => {
    console.log("Fetching session details for game pin:", gamePin);
    try {
      const { data } = await api.get(`/sessions/${gamePin}`);

      const quizId = data.session.hostedQuizId._id;
      console.log("QuizId:", quizId);
      navigate(`/playerslanding/${quizId}/${gamePin}`);
    } catch (error) {
      console.error("Error fetching session details:", error.message);
      alert("No current quiz session for this Game pin");
    }
  };

  const handleHostQuiz = async (quizId) => {
    const quiz = createdQuizzes.find((q) => q._id === quizId);
    console.log("Quiz:", quiz);

    const gamePin = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated Pin:", gamePin);

    navigate(`/hostlanding/${quizId}/${gamePin}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const { data } = await api.delete(`/quizzes/${quizId}`);
      console.log(data.message);
      setIsDeleteModalOpen(false);
      setIsModalOpen(false);
      const updatedQuizzes = createdQuizzes.filter(
        (quiz) => quiz._id !== quizId
      );
      setCreatedQuizzes(updatedQuizzes);
    } catch (error) {
      console.error("Error deleting quiz:", error.message);
    }
  };

  const navigateToQuizCreatePage = () => {
    navigate("/quizcreatepage/");
  };

  const getCategoryImage = (category) => {
    switch (category) {
      case "Math":
        return mathImg;
      case "Information technology":
        return technologyImg;
      case "Science":
        return scienceImg;
      case "History":
        return historyImg;
      case "Business":
        return businessImg;
      case "Finance":
        return financeImg;
      default:
        return defaultImg;
    }
  };

  return (
    <div>
      <Navibar2 />
      <div className="main-div">
        <div className="div-2">
          <div className="created-quizzes">
            <div className="created-quizzes-text">Created Quizzes</div>
          </div>

          <div className="quiz-card-container">
            {createdQuizzes.map((quiz) => (
              <div key={quiz._id}>
                <div
                  className="quiz-card"
                  onClick={() => handleQuizCardClick(quiz)}
                >
                  <img
                    className="img"
                    alt="Quiz card tab"
                    src={getCategoryImage(quiz.category)}
                  />
                  <div className="text-bar">
                    <div className="title">{quiz.title}</div>
                    <div className="questionCount">{`${quiz.questions.length} Questions`}</div>
                    <div className="timeSet">{`Time Limit: ${quiz.timeLimit.minutes}m ${quiz.timeLimit.seconds}s`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="play-button-container">
            <button className="play-button" onClick={() => handlePlayQuiz()}>
              <div className="play-button-text">Play</div>
            </button>
          </div>

          <div className="create-button-container">
            <button
              className="create-button"
              onClick={navigateToQuizCreatePage}
            >
              <div className="create-text">Create</div>
            </button>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <button1 onClick={() => setIsModalOpen(false)}>✖</button1>
                <h2>{selectedQuiz.title}</h2>
                <button onClick={() => handleHostQuiz(selectedQuiz._id)}>
                  Host Quiz
                </button>
                <button onClick={() => handlePlayQuiz(selectedQuiz._id)}>
                  Play Quiz
                </button>
                <button onClick={() => console.log("Edit Quiz")}>
                  Edit Quiz
                </button>
                <button onClick={() => setIsDeleteModalOpen(true)}>
                  Delete Quiz
                </button>{" "}
              </div>
            </div>
          )}

          {isPlayModalOpen && (
            <div className="p-modal">
              <div className="p-modal-content">
                <button1 onClick={() => setIsPlayModalOpen(false)}>✖</button1>
                <h2>Enter Game Pin to Join Quiz</h2>
                <input
                  type="text"
                  placeholder="Enter game pin"
                  id="gamePinInput"
                />
                <button
                  onClick={() =>
                    handleJoinQuiz(
                      document.getElementById("gamePinInput").value
                    )
                  }
                >
                  Join Quiz
                </button>
              </div>
            </div>
          )}

          {isDeleteModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this quiz?</p>
                <button onClick={() => handleDeleteQuiz(selectedQuiz._id)}>
                  Yes, Delete
                </button>
                <button onClick={() => setIsDeleteModalOpen(false)}>
                  No, Go Back
                </button>
              </div>
            </div>
          )}

          <div className="copyright">
            <p className="quizzify-quiz-system">
              Quizzify - Quiz System Project © 2023. Design by Team 56
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAndPlay;
