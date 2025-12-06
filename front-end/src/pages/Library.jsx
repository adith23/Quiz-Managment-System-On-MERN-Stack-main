//Library.jsx
import Navibar2 from "../components/layout/Navibar2";
import Footer from "../components/layout/Footer";
import Style from "./Library.module.css";
import React, { useState, useEffect } from "react";
import Quizzes from "../components/common/Quizzes";
import SavedQuizzes from "../components/common/SavedQuizzes";
import SearchQuizzes from "../components/common/SearchQuizzes";

function Library() {
  const [activeComponent, setActiveComponent] = useState("Quizzes");
  const [isSearchActive, setIsSearchActive] = useState(false); // Add this line

  return (
    <div>
      <Navibar2 />
      <div className={Style.library_page}>
        <div className={Style.page_title}>
          <h1 className={Style.title_name}>Explore Your Interest</h1>
        </div>
        <div className={Style.tab_button}>
          <button className={Style.box1}>Science</button>
          <button className={Style.box2}>Maths</button>
          <button className={Style.box3}>Biology</button>
          <button className={Style.box4}>Technology</button>
          <button className={Style.box5}>Music</button>
          <button className={Style.box6}>Social Studies</button>
          <button className={Style.box7}>Economics</button>
        </div>

        <div className={Style.search_bar}></div>

        <div className={Style.quick_selection}>
          <div className={Style.title}>
            <h3 className={Style.title_style}>Quiz Selections</h3>
          </div>

          <div className={Style.discover}>
            <button
              className={Style.discover_button}
              onClick={() => {
                setActiveComponent("Quizzes");
                setIsSearchActive(false);
              }}
            >
              Discover
            </button>
          </div>

          <div className={Style.saved}>
            <button
              className={Style.saved_button}
              onClick={() => {
                setActiveComponent("SavedQuizzes");
                setIsSearchActive(false);
              }}
            >
              Saved Quizzes
            </button>
          </div>

          <div className={Style.quiz_section}>
            <div className={Style.quiz_section_style}>
              <h3 className={Style.search_text}>
                Click to Save or Play Quizzes
              </h3>
              <SearchQuizzes onSearch={() => setIsSearchActive(true)} />{" "}
              {/* Pass the setIsSearchActive function as a prop */}
              {!isSearchActive && activeComponent === "Quizzes" && <Quizzes />}
              {!isSearchActive && activeComponent === "SavedQuizzes" && <SavedQuizzes />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Library;
