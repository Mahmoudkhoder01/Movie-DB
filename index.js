const express = require("express");
const app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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
    res.status(200).json({ status: 200, message: `Hello, ${id}` });
});

app.get("/search", (req, res) => {
    const search = req.query.search
    if (search) {
        res.status(200).json({ status: 200, message: "ok", data: search })
    } else {
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
    }
})

app.get("/movies/add", (req,res)=>{
    
})

app.get("/movies/get", (req, res) => {
    res.json({ status: 200, data: movies })
})

app.get("/movies/add", (req,res)=>{

})

app.get("/movies/add", (req,res)=>{

})



app.listen(3000, () => {
    console.log("Server started on port 3000");
})