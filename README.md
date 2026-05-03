# Real-Time Interactive Quiz Management System 🚀

## 1. Project Title

**MERN Stack Real-Time Quiz Management System**

## 2. Overview

A comprehensive full-stack web application for creating, hosting, and playing interactive live quizzes. Built on the MERN stack with Socket.io for real-time features, it solves the problem of organizing engaging educational or team-building assessments by providing a scalable platform with live leaderboards, instantaneous feedback, and deep user analytics.

## 3. Features

- **Real-time Gameplay**: Host controls the quiz flow while participants join via a unique session code, synchronized seamlessly using Socket.io.
- **Quiz Creation & Management**: Create custom quizzes with varied time limits, multiple-choice questions, and rich textual content.
- **Live Leaderboards**: Instant scoring and ranking updates for players dynamically during the game.
- **User Analytics & Library**: Track individual performance, view activity history, and bookmark favorite quizzes to a personal library.
- **Social Connections**: Follow other users and quiz creators to discover their public quizzes.
- **Secure Authentication**: JWT-based user authentication with encrypted passwords (bcrypt).

## 4. Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Redux Persist, CSS Modules
- **Backend**: Node.js, Express.js, Socket.io (Real-time Engine), JSON Web Tokens (JWT), bcrypt
- **Database**: MongoDB, Mongoose ORM
- **Tools**: ESLint, Nodemon

## 5. Demo / Screenshots

- ![Quiz Page Overview](.front-end/src/assets/quizpage.png)

## 6. Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database (Local instance or MongoDB Atlas)
- Git

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/Quiz-Managment-System-On-MERN-Stack.git
   cd Quiz-Managment-System-On-MERN-Stack
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd back-end
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../front-end
   npm install
   ```

## 7. Environment Variables

Create a `.env` file in the `back-end` directory. You will need the following variables:

```env
# MongoDB Connection String (Replace with your actual credentials)
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=QuizApp

# JWT Secret Key for Authentication
JWT_Secret=your_super_secret_jwt_key_here

# Server Port (Optional, defaults to 8000)
PORT=8000
```

## 8. How to Run

Open two separate terminal windows/tabs:

**Backend (Terminal 1):**

```bash
cd back-end
# Start the development server using nodemon
npm start
```

**Frontend (Terminal 2):**

```bash
cd front-end
# Run the Vite development server
npm run dev
```

The application frontend will be accessible at `http://localhost:5173`.

## 9. Usage

1. **Sign Up/Login**: Create a new account or authenticate securely.
2. **Create Quiz**: Navigate to "Create Quiz" and add your custom questions, options, and mark the correct answers.
3. **Host Game**: Start a quiz session from your library. A unique join code will be generated for participants.
4. **Join Game**: Players enter the join code on the home screen to enter the waiting lobby.
5. **Play**: The host initiates the quiz. Players answer in real-time, and scores update dynamically across all screens.
6. **Review**: Check comprehensive analytics and leaderboards after the session concludes.

## 10. Project Structure

```text
Quiz-Management-System/
├── back-end/
│   ├── src/
│   │   ├── config/       # MongoDB connection setup
│   │   ├── controllers/  # Logic for handling API requests
│   │   ├── middleware/   # Authentication and validation logic
│   │   ├── models/       # Mongoose schemas (User, Quiz, Session, Activity)
│   │   ├── routes/       # Express API route definitions
│   │   └── socket/       # Socket.io real-time event handlers
│   ├── .env              # Environment configurations
│   └── server.js         # Entry point for the Node.js backend server
└── front-end/
    ├── src/
    │   ├── assets/       # Static assets (images, fonts, global styles)
    │   ├── components/   # Reusable React UI components
    │   ├── context/      # Global state management
    │   ├── pages/        # React route views (Home, QuizPage, Dashboard, etc.)
    │   └── services/     # API request handlers and Socket client
    ├── index.html        # Main HTML template
    └── vite.config.js    # Vite builder configuration
```

## 11. API Details

The REST API handles core data and operational synchronization:

- **Authentication**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate and receive a session cookie/token.
- **Quizzes**
  - `POST /create-quiz`: Create a new quiz.
  - `GET /quizzes`: Retrieve public quizzes.
- **Sessions & Activity**
  - `POST /session/create`: Initialize a live quiz room.
  - `GET /activity`: Retrieve user activity logs.
- **Social**
  - `POST /follow/:id`: Follow another creator.

_(Note: Real-time quiz data syncing is managed purely over WebSockets via the `socket/` directory handlers)._

## 12. Deployment

- **Frontend**: Ready to be deployed seamlessly on **Vercel** or **Netlify**. Ensure the API base URL is updated to point to the production backend URL before building.
- **Backend**: Ideal for platforms like **Render**, **Railway**, or **Heroku**. Set the `.env` variables in the deployment dashboard.
- **Database**: Hosted optimally on **MongoDB Atlas**.

## 13. Testing

- **Current State**: Manual endpoint testing via Postman and real-time socket event testing using multiple concurrent browser instances.
- **Framework**: Future plan to implement unit testing using **Jest** and **Supertest** for backend controllers, alongside **React Testing Library** for frontend components.

## 14. Future Improvements

1. **Multimedia Integration**: Support adding images and audio clips to quiz questions.
2. **Export Functionality**: Export detailed quiz session reports to CSV/PDF for educators.
3. **OAuth Integrations**: Add Google/GitHub single sign-on (SSO) login.
4. **Public Directory**: Implement a global, searchable public quiz directory for discovering user-generated content.

## 15. License

This project is open-source and available under the [ISC License](LICENSE).

## 16. Contact

- **Developer**: [Your Name]
- **GitHub**: [@YourUsername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)

## 17. Architecture

```mermaid
graph TD
    Client[React Frontend] -->|REST API (Axios)| API[Express Backend]
    Client <-->|Real-time Events| Socket[Socket.io Server]
    API --> DB[(MongoDB)]
    Socket --> DB
```

## 18. Database Schema

- **User**: `username`, `email`, `password`, `followers`, `following`
- **Quiz**: `title`, `description`, `questions` (Array of subdocs containing text, options, correct answer index), `creator` (Ref: User)
- **Session**: `quizId`, `hostId`, `pinCode`, `participants` (Scores and submitted answers), `status` (waiting/active/completed)
- **Activity**: `userId`, `actionType`, `timestamp`
- # **SavedQuiz**: `userId`, `quizId` (For library bookmarking)
