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

app.get("/movies/add", (req, res) => {
    const title = req.query.title
    const year = req.query.year
    const rating = req.query.rating || 4
    if (!title || !year || year.length !== 4 || isNaN(year)) {
        res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
        return;
    }
    const movie = { title, year, rating }
    movies.push(movie)
    res.json({ status: 200, data: movies })
})

app.get("/movies/get", (req, res) => {
    res.json({ status: 200, data: movies })
})

app.get("/movies/get/by-date", (req, res) => {
    movies.sort((x, y) => x.year - y.year)
    res.json({ status: 200, data: movies })
})

app.get("/movies/get/by-rating", (req, res) => {
    movies.sort((x, y) => y.rating - x.rating)
    res.json({ status: 200, data: movies })
})

app.get("/movies/get/by-title", (req, res) => {
    movies.sort((a, b) => a.title.localeCompare(b.title))
    res.json({ status: 200, data: movies })
})

app.get('/movies/get/id/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies[id - 1];
    if (movie) {
        res.status(200).json({ status: 200, data: movie })
    } else {
        res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` })
    }
});


app.get("/movies/edit/:id", (req, res) => {
    const id = parseInt(req.params.id)
    if (id > movies.length) {
        res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` })
    } else {
        const movie = movies[id - 1]
        if (req.query.title) movie.title = req.query.title
        if (req.query.rating) movie.rating = req.query.rating
        if (req.query.year) movie.year = req.query.year
        res.status(200).json({ status: 200, data: movies })
    }
})

app.get("/movies/delete/:id", (req, res) => {
    const id = parseInt(req.params.id)
    if (id > movies.length) {
        res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` })
    } else {
        movies.splice(id, 1)
        res.status(200).json({ status: 200, data: movies })
    }
})



app.listen(3000, () => {
    console.log("Server started on port 3000");
})