const Session = require("../models/sessionModel");

const activeGamePins = [];

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("hostQuiz", (gamePin) => {
            socket.join(gamePin);
            activeGamePins.push(gamePin);
        });

        socket.on("joinQuiz", ({ gamePin, playerId }) => {
            socket.join(gamePin);
            io.to(gamePin).emit("playerJoined", playerId);
        });

        socket.on("checkGamePin", (gamePin) => {
            if (activeGamePins.includes(gamePin)) {
                socket.emit("gamePinStatus", { gamePinExists: true });
            } else {
                socket.emit("gamePinStatus", { gamePinExists: false });
            }
        });

        socket.on("startQuiz", (gamePin) => {
            console.log(`startQuiz event emitted with gamePin: ${gamePin}`);
            io.to(gamePin).emit("startQuiz");
        });

        socket.on("numPlayersChanged", (newNumPlayers) => {
            socket.broadcast.emit("numPlayersChanged", newNumPlayers);
        });

        socket.on("correctAnswer", async ({ playerId, gamePin }) => {
            try {
                const session = await Session.findOne({ sessionId: gamePin });
                if (session) {
                    const playerScore = session.playerScores.find(
                        (ps) => ps.playerId === playerId
                    );
                    if (playerScore) {
                        await Session.findOneAndUpdate(
                            { sessionId: gamePin, "playerScores.playerId": playerId },
                            {
                                $inc: {
                                    totalCorrectAnswers: 1,
                                },
                            }
                        );
                    }
                }
            } catch (error) {
                console.error("Error updating score:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};

module.exports = socketHandler;
