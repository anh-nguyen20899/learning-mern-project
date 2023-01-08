require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.4vtpw.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Call db connect
connectDB();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})