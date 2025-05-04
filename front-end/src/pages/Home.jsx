import Slider from "../component/Slider";
import Style from "./Home.module.css";
import React, { useState, useEffect } from "react";
import Quizzes from "../component/Quizzes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  // Fetch All the Quizzes
  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8000/quizzes");
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const quizzesData = await response.json();
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users"); // Replace with your server's route
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchUserQuizzes();
  }, []);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/sessions/${310255}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session details:", error.message);
      }
    };

    // Call fetchSessionDetails immediately and then every 5 seconds
    fetchSessionDetails();
    const intervalId = setInterval(fetchSessionDetails, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className={Style.home_page}>
        <div className={Style.slider}>
          <Slider className={Style.slider} />
        </div>
        <div className={Style.tag_button}>
          <a className={Style.box1} href="/maintaince">
            Science
          </a>
          <a className={Style.box2} href="/maintaince">
            Maths
          </a>
          <a className={Style.box3} href="/maintaince">
            Biology
          </a>
          <a className={Style.box4} href="/maintaince">
            Technology
          </a>
          <a className={Style.box5} href="/maintaince">
            Music
          </a>
          <a className={Style.box6} href="/maintaince">
            Social Studies
          </a>
          <a className={Style.box7} href="/maintaince">
            Economics
          </a>
        </div>
        <div className={Style.home_page_container}>
          <div className={Style.home_page_container_row1}>
            <div className={Style.discover_title}>
              <h3 className={Style.discover_title}> Discover </h3>{" "}
            </div>
            <div className={Style.quiz_section}>
              <div className={Style.quiz_section_style}>
                <Quizzes />
              </div>
            </div>
          </div>

          <div className={Style.home_page_container_row2}>
            <div className={Style.user_title_box}>
              <h2 className={Style.user_title}>Find Players</h2>
            </div>
            <div className={Style.users} onClick={() => navigate("/connect")}>
              <div className={Style.users_name_box}>
                {users.map((user) => (
                  <h3 className={Style.users_name} key={user._id}>
                    {user.name}
                  </h3>
                ))}
              </div>
            </div>

            <div className={Style.leaderboard}>
              <div className={Style.leaderboard_title_box}>
                <h2 className={Style.leaderboard_title}>Leaderboard</h2>
                <a
                  href="/leaderboard"
                  className={Style.leaderboard_title_link}
                ></a>
              </div>
              <div className={Style.user_leaderboard_box}>
                {session &&
                  session.playerScores
                    .sort((a, b) => b.score - a.score)
                    .map((playerScore, index) => (
                      <div key={index}>
                        <h3 className={Style.user_leaderboard}>
                          {playerScore.playerId}
                        </h3>
                        <p className={Style.user_score}>
                          Score: {playerScore.score}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
