require("dotenv").config()
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10
// const encrypt = require("mongoose-encryption") ;
// const md5 = require("md5")

mongoose.set('strictQuery', true)
async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async () => {
                console.log("Connected to MongoDB ")
            }
        )
    } catch (error) {
        console.log(error.message)
    }
}
connect()

let $authenticate = false

app.get("/", (req, res) => {
    res.send("ok")
})

app.get("/test", (req, res) => {
    res.json({ status: 200, message: 'ok' })
});

app.get("/time", (req, res) => {
    const curretnTime = new Date()
    const hours = curretnTime.getHours()
    const minutes = curretnTime.getMinutes()
    res.json({ status: 200, message: `${hours}:${minutes}` })
})


app.get('/hello/:id', (req, res) => {
    const id = req.params.id;
    res.json({ status: 200, message: `Hello, ${id}` })
});

app.get("/search", (req, res) => {
    const search = req.query.search
    if (search) {
        res.json({ status: 200, message: "ok", data: search })
    } else {
        res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
    }
})

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
})

// const secret = "thisisourlittlesecret."
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]})

const user = mongoose.model("User", userSchema)


//Get All Users
app.get("/get/users", async (req, res) => {
    try {
        const DataBase = await user.find()
        res.json({ status: 200, data: DataBase })
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
})


// Register
app.post("/register", (req, res) => {
    const email = req.query.email
    const pass = req.query.password
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        const newUser = new user({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash
        })
        newUser.save((err) => {
            err ? res.json({ status: 400, message: err.message }) : res.json({ status: res.statusCode, message: "You have successfully registered" })
        })
    })
})

// Log In
app.post("/login", (req, res) => {
    const email = req.query.email
    const pass = req.query.password
    user.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            res.json({ status: 404, message: "User Not Found" })
        } else {
            if (foundUser) {
                bcrypt.compare(pass, foundUser.password, (err, result) => {
                    if (result === true) {
                        $authenticate = true
                        res.json({ status: 202, message: "You are logged in" })
                        return
                    } else {
                        res.json({ status: 404, message: err })
                    }
                })
            }
        }
    })
})

// Log Out
app.post("/logout", (req, res) => {
    const email = req.query.email
    const pass = req.query.password
    user.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            res.json({ status: 404, message: "User NOt Found" })
        } else {
            if (foundUser) {
                bcrypt.compare(pass, foundUser.password, (err, result) => {
                    if (result === true) {
                        $authenticate = false
                        res.json({ status: 202, message: "You are logged out" })
                        return
                    } else {
                        res.json({ status: 404, message: err })
                    }
                })
            }
        }
    })
})

// Edit password
app.patch("/edit", async (req, res) => {
    const email = req.query.email
    const pass = req.query.password
    const hashedPassword = await bcrypt.hash(pass, 10)
    user.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true },
        (err, updateData) => {
            if (err) {
                return res.json({ status: 404, message: err.message })
            }
            if (updateData == null) {
                return res.json({ status: 404, message: `the user ${email} does not exist` })
            } else {
                res.json({ status: 200, data: "Your password are changed successfully" })
                return 
            }
        })
})


//Delete user
app.delete("/delete", (req, res) => {
    const email = req.query.email
    const pass = req.query.password
    user.findOneAndDelete({ email: email }, (err, docs) => {
        if (err) {
            return res.json({ status: res.statusCode, message: err })
        }
        if (docs == null) {
            return res.json({ status: res.statusCode, message: `the user with ${email} does not exist` })
        } else {
            $authenticate = false
            res.json({ status: res.statusCode, data: "The user is deleted" })
            return
        }
    })
})

app.get("/tesst", (req, res) => {
    res.send(!$authenticate)
})

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

let movieDBSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2023
    },
    rating: {
        type: Number,
        default: 4,
        min: 0,
        max: 10,
    }
})

const moviesList = mongoose.model("moviesDB", movieDBSchema);

// moviesList.create(movies, movieDBSchema)

//Getting all
app.get("/get", async (req, res) => {
    try {
        const DataBase = await moviesList.find()
        res.json({ status: 200, data: DataBase })
    } catch (error) {
        res.json({ status: 500, message: error.message })
    }
})

//Getting by date
app.get("/by-date", (req, res) => {
    moviesList.find().sort({ year: 1 }).exec((err, Movies) => {
        if (err) {
            res.json({ status: 400, message: err })
        } else {
            res.json({ status: 200, data: Movies })
        }
    })
})
//Getting by rating
app.get("/by-rating", (req, res) => {
    moviesList.find().sort({ rating: 1 }).exec((err, Movies) => {
        if (err) {
            res.json({ status: 400, message: err })
        } else {
            res.json({ status: 200, data: Movies })
        }
    })
})
//Getting by title 
app.get("/by-title", (req, res) => {
    moviesList.find().sort({ title: 1 }).exec((err, Movies) => {
        if (err) {
            res.json({ status: 400, message: err })
        } else {
            res.json({ status: 200, data: Movies })
        }
    })
})

//Getting by id
app.get('/:id', (req, res) => {
    moviesList.findById(req.params.id, (error, movie) => {
        if (error) {
            return res.status(500).json({ status: 500, error: true, message: error })
        }
        if (!movie) {
            return res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` })
        }
        res.status(200).json({ status: 200, data: movie });
    })
})

//Adding one
app.post("/", async (req, res) => {
    const title = req.query.title
    const year = req.query.year
    const rating = parseFloat(req.query.rating) || 4
    if (!$authenticate) {
        res.json({ status: 404, message: "You don't have access to add a movie" })
    } else if ($authenticate) {
        const movie = new moviesList({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            year: year,
            rating: rating,
        });

        try {
            const newMovie = await movie.save();
            res.json({ status: 200, data: newMovie })
        } catch (err) {
            res.json({ status: 400, message: err.message })
        }
    }
})

//Editing one
app.patch("/edit/:id", (req, res) => {
    const id = req.params.id
    const newTitle = req.query.title
    const newYear = req.query.year
    const newRating = req.query.rating
    if (!$authenticate) {
        res.json({ status: 404, message: "You don't have access to edit the movie" })
    } else if ($authenticate) {
        if (req.query.rating > 10 || req.query.rating < 0) {
            return res.json({ status: 403, error: true, message: 'you rating should be between 0 and 10' })
        }
        moviesList.findOneAndUpdate({ _id: id }, { $set: { title: newTitle, year: newYear, rating: newRating } }, { new: true },
            (err, updateData) => {
                if (err) {
                    return res.json({ status: 404, message: err })
                }
                if (updateData == null) {
                    return res.json({ status: 404, message: `the movie ${id} does not exist` })
                } else {
                    res.json({ status: 200, data: updateData })
                }
            })
    }
})

//Deleting one
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    if (!$authenticate) {
        res.json({ status: 404, message: "You don't have access to delete the movie" })
    } else if ($authenticate) {
        moviesList.findOneAndDelete(({ _id: id }), (err, docs) => {
            if (err) {
                return res.json({ status: res.statusCode, message: err })
            }
            if (docs == null) {
                return res.json({ status: res.statusCode, message: `the movie ${id} does not exist` })
            } else {
                res.json({ status: res.statusCode, data: "The movie is deleted" })
            }
        })
    }
})
app.listen(3000, () => {
    console.log("Server started on port 3000");
})

module.exports = $authenticate