const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("🙂 Database Connected!");
    } catch (err) {
        console.log("😞 Database Not Connected!", err);
        process.exit(1);
    }
};

module.exports = connectDB;
