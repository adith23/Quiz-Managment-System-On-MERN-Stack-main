import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navibar from "./components/layout/Navbar";
import Navibar2 from "./components/layout/Navibar2";
import SearchQuizzes from "./components/common/SearchQuizzes";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
        <Route path="/help" element={<Help />} />
        <Route path="/maintaince" element={<Maintaince />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/navibar2" element={<ProtectedRoute><Navibar2 /></ProtectedRoute>} />
        <Route path="/quizcreatepage" element={<ProtectedRoute><QuizCreatePage /></ProtectedRoute>} />
        <Route path="/createandplay" element={<ProtectedRoute><CreateAndPlay /></ProtectedRoute>} />
        <Route path="/hostlanding/:quizId/:gamePin" element={<ProtectedRoute><HostLandingPage /></ProtectedRoute>}/>
        <Route path="/playerslanding/:quizId/:gamePin" element={<ProtectedRoute><PlayersLandingPage /></ProtectedRoute>}/>
        <Route path="/playerslanding/:gamePin" element={<ProtectedRoute><PlayersLandingPage /></ProtectedRoute>}/>
        <Route path="/quizpage/:quizId/:gamePin" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/leaderboard/:gamePin" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/Connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
        <Route path="/SearchQuizzes" element={<ProtectedRoute><SearchQuizzes /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;