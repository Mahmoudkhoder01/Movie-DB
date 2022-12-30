const express = require("express");
const app = express();
const mongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const movieDB = require("./moviesDB")

// mongoose.set('strictQuery', true);
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on("error", (err) => console.error(err))
// db.once("open", () => { console.log("Server started on mongoDB"); })
mongoose.set('strictQuery', true);
async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async () => {
                console.log("Connected to MongoDB ");
            }
        );
    } catch (error) {
        console.log(error.message);
    }
}
connect()

app.use("/moviesDB", movieDB)

app.get("/", (req, res) => {
    res.send("ok")
})

app.get("/test", (req, res) => {
    res.json({ status: 200, message: 'ok' });
});

app.get("/time", (req, res) => {
    const curretnTime = new Date();
    const hours = curretnTime.getHours();
    const minutes = curretnTime.getMinutes();
    res.json({ status: 200, message: `${hours}:${minutes}` })
})


app.get('/hello/:id', (req, res) => {
    const id = req.params.id;
    res.json({ status: 200, message: `Hello, ${id}` });
});

app.get("/search", (req, res) => {
    const search = req.query.search
    if (search) {
        res.json({ status: 200, message: "ok", data: search })
    } else {
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})