import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navibar from "./components/layout/Navbar";
import Navibar2 from "./components/layout/Navibar2";
import SearchQuizzes from "./components/common/SearchQuizzes";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import QuizCreatePage from "./pages/QuizCreatePage";
import Help from "./pages/Help";
import Maintaince from "./pages/Maintaince";
import Contact from "./pages/Contact";
import CreateAndPlay from "./pages/CreateAndPlay";
import HostLandingPage from "./pages/HostLandingPage";
import PlayersLandingPage from "./pages/PlayersLandingPage";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Library from "./pages/Library";
import Analytics from "./pages/Analytics";
import Connect from "./pages/Connect";

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
      </Routes>
    </>
  );
}

export default App;