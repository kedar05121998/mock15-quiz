const express = require("express")
const cors = require('cors')
const { Connection } = require("./Config/db")
const { UserModel } = require("./Models/quiz.model")
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
require("dotenv").config()

app.get('/', (req, res) => {
    res.send('Welcome')
})
app.post("/quiz", async (req, res) => {
    const { category, type, difficulty, question, correct_answer, incorrect_answers } = req.body;
    const newquestion = new QuizModel({
        category: category,
        type: type,
        difficulty: difficulty,
        question: question,
        correct_answer: correct_answer,
        incorrect_answers: incorrect_answers
    })
    await newquestion.save();
    const data = await UserModel.find({});
    res.send(data)
})

app.get("/quiz", async (req, res) => {
    const { category, difficulty, limit } = req.query;
    const response = await UserModel.find({ category: category, difficulty: difficulty }).limit(limit);
    res.send(response);
})


app.listen(PORT, async () => {
    try {
        await Connection
        console.log("Connected to DB");
    }
    catch (err) {
        console.log("error in connectiong");
        console.log(err);
    }
    console.log(`Listenging to PORT http://localhost:${PORT}`);
})