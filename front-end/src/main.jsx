import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Use createRoot from react-dom/client instead of react-dom
createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
