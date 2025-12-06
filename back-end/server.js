const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./src/config/db");
const socketHandler = require("./src/socket/socketHandler");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Add your client's origin here
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./src/routes/authRoutes"));
app.use("/", require("./src/routes/quizRoutes"));
app.use("/", require("./src/routes/sessionRoutes")); // Include session routes
app.use("/", require("./src/routes/savedQuizRoutes")); // Include session routes
app.use("/", require("./src/routes/ActivityRoutes")); // Add this line

const PORT = process.env.PORT || 8000; // Use process.env.PORT for dynamic port binding
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Add your client's origin here
    methods: ["GET", "POST"],
  },
});

// Initialize Socket Options
socketHandler(io);

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} 🇱🇰`));
