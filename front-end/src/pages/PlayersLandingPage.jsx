//PlayersLandingPage.jsx
import React, { useState, useEffect } from "react";
import "./PlayersLandingPage.css";
import Navibar2 from "../component/Navibar2";
import { useNavigate } from "react-router-dom";
import socket from "./socket";

const PlayersLandingPage = () => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(null);
  const [gamePin, setGamePin] = useState(null);
  const [session, setSession] = useState(null);
  const [gameUrl, setGameUrl] = useState("");
  const [numPlayers, setNumPlayers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Extract game pin from the URL path only if it contains "/playerslanding/"
    if (window.location.pathname.includes("/playerslanding/")) {
      const pathParts = window.location.pathname.split("/");
      const gamePin = pathParts[pathParts.length - 1]; // Assuming the game pin is the last part of the URL path
      if (gamePin) {
        setGamePin(gamePin);
        // Check if the game pin was provided via the URL or not
        if (pathParts.length === 4) {
          // Game pin provided via URL, join the quiz
          joinQuiz(gamePin);
        }
      } else {
        // No game pin found in the URL
        alert("No game pin provided in the URL");
        navigate("/"); // Redirect to home or error page
      }
    }
  }, [navigate]);

  const joinQuiz = (gamePin) => {
    console.log("Joining quiz with game pin:", gamePin);
    let playerId = localStorage.getItem("playerId");
    if (!playerId) {
      setIsModalOpen(true);
    } else {
      checkGamePin(gamePin, playerId);
    }
  };

  // Send the game pin to the server to check if session is available
  const checkGamePin = (gamePin, playerId) => {
    socket.emit("checkGamePin", gamePin);

    socket.on("gamePinStatus", (data) => {
      if (data.gamePinExists) {
        socket.emit("joinQuiz", { gamePin, playerId });
      } else {
        alert("No current quiz session for this game pin");
        navigate("/");
      }
    });
  };

  const handleModalSubmit = (nickname) => {
    localStorage.setItem("playerId", nickname);
    setIsModalOpen(false);
    checkGamePin(gamePin, nickname);
  };

  useEffect(() => {
    // Convert game pin to session ID (assuming gamePin is the session ID)
    const sessionId = gamePin;
    console.log("Session Id:", sessionId);

    // Fetch session details using session ID (game pin)
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/sessions/${sessionId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSession(data.session);
        console.log("Session Details:", data.session);
        // Extract quizId from session and set it
        const quizId = data.session.hostedQuizId._id; // Assuming quizId is stored in hostedQuizId._id
        setQuizId(quizId);
        console.log("Quiz Idddd:", quizId);
      } catch (error) {
        console.error("Error fetching session details:", error.message);
      }
    };

    socket.on("numPlayersChanged", (newNumPlayers) => {
      setNumPlayers(newNumPlayers);
    });

    fetchSessionDetails();
  }, [gamePin]);

  useEffect(() => {
    setGameUrl(`${window.location.origin}/playerslanding/${quizId}/${gamePin}`);
  }, [gamePin]);

  useEffect(() => {
    // Listen for 'startQuiz' event from the server
    socket.on("startQuiz", () => {
      console.log("Received start quiz event", quizId, gamePin); // Ensure this log appears
      navigate(`/quizpage/${quizId}/${gamePin}`);
    });
  }, [quizId, gamePin, navigate]);

  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const copyGameUrlToClipboard = () => {
    navigator.clipboard.writeText(gameUrl);
  };

  return (
    <div>
      <Navibar2 />
      <div className="main-div">
        <div className="div">
          <div className="players-joined-div">
            <div className="players-joined-text">Players Joined</div>
            <div className="numjoined-players">{numPlayers}</div>
          </div>

          <div className="game-pin-div">
            <div className="game-pin-text">Game Pin</div>
            <div className="game-pin-no-div">
              <img
                className="img"
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65b90f0683276fd4dbb2229b/releases/65bf591ed422316e119bbcee/img/vector-7@2x.png"
              />
              <div className="game-pin">{gamePin}</div>
            </div>
          </div>

          <div className="time-countdown-div">
            <div className="countdown-no-div">
              <div className="time-left-numbers">{`${minutes} min ${
                seconds < 10 ? `0${seconds}` : seconds
              } sec`}</div>
            </div>
            <div className="starts-in-text">Starts In</div>
          </div>

          <div className="p-link-game-pin-div">
            <div className="p-overlap-2">
              <div className="p-link-pin-button">
                <img
                  className="p-line"
                  alt="Line"
                  src="https://cdn.animaapp.com/projects/65b90f0683276fd4dbb2229b/releases/65bf591ed422316e119bbcee/img/line-13-1.svg"
                />
                <button
                  className="p-link-copy-button"
                  onClick={copyGameUrlToClipboard} // Attach the function here
                >
                  <img
                    className="p-link-copy-button-icon"
                    src="https://cdn.animaapp.com/projects/65b90f0683276fd4dbb2229b/releases/65bf591ed422316e119bbcee/img/link-copy-button@2x.png"
                    alt="Link copy button"
                  />
                </button>
              </div>
              <button
                className="p-link-game-pin-button"
                onClick={copyGameUrlToClipboard}
              >
                {" "}
                {gameUrl}
              </button>
            </div>
          </div>
          <div className="quiz-title-div">
            <div className="quiz-title-text">{session?.hostedQuizId.title}</div>
          </div>
          <div className="no-questions-div">
            <p className="no-of-questions-text">
              <span className="span">No. of </span>
              <span className="span">questions</span>
            </p>
            <div className="no-questions-number">
              {session?.hostedQuizId.questions.length}
            </div>
          </div>

          {isModalOpen && (
            <div className="n-modal">
              <div className="n-modal-content">
                <h2>Ener a Nickname</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleModalSubmit(e.target.elements.nickname.value);
                  }}
                >
                  <input name="nickname" required />
                  <button type="submit">Enter</button>
                </form>
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

export default PlayersLandingPage;
