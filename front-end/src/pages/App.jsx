import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import Navibar from "../component/Navbar";
import Navibar2 from "../component/Navibar2";
import Welcome from "./Welcome";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import QuizCreatePage from "./QuizCreatePage";
import Help from "./Help";
import Maintaince from "./Maintaince";
import Contact from "./Contact";
import CreateAndPlay from "./CreateAndPlay";
import HostLandingPage from "./HostLandingPage";
import PlayersLandingPage from "./PlayersLandingPage";
import QuizPage from "./QuizPage";
import LeaderboardPage from "./LeaderboardPage";
import Library from "./Library";
import Analytics from "./Analytics";
import Connect from "./Connect";
import SearchQuizzes from "../component/SearchQuizzes";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <>
      <Routes>
        <Route path="/navibar" element={<Navibar />} />
      </Routes>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/navibar2" element={<Navibar2 />} />
        <Route path="/quizcreatepage" element={<QuizCreatePage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/maintaince" element={<Maintaince />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createandplay" element={<CreateAndPlay />} />
        <Route path="/hostlanding/:quizId/:gamePin" element={<HostLandingPage />}/>
        <Route path="/playerslanding/:quizId/:gamePin" element={<PlayersLandingPage />}/>
        <Route path="/playerslanding/:gamePin" element={<PlayersLandingPage />}/>
        <Route path="/quizpage/:quizId/:gamePin" element={<QuizPage />} />
        <Route path="/leaderboard/:gamePin" element={<LeaderboardPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/Connect" element={<Connect />} />
        <Route path="/SearchQuizzes" element={<SearchQuizzes />} />

        SearchQuizzes;
      </Routes>
    </>
  );
}

export default App;
