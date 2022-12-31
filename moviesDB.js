const express = require("express")
const movieDB = express.Router()
const mongoose = require('mongoose')
const authenticate = require("./index")

// const autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);


// const movies = [
//     { title: 'Jaws', year: 1975, rating: 8 },
//     { title: 'Avatar', year: 2009, rating: 7.8 },
//     { title: 'Brazil', year: 1985, rating: 8 },
//     { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
// ]

// let movieDBSchema = new mongoose.Schema({
//     _id: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: Number,
//         required: true,
//         min: 1900,
//         max: 2022
//     },
//     rating: {
//         type: Number,
//         default: 4,
//         min: 0,
//         max: 10,
//     }
// })

// const moviesList = mongoose.model("moviesDB", movieDBSchema);

// // moviesList.create(movies, movieDBSchema)

// movieDB.get("/testing", (req, res) => {
//     res.send("hello")
// })

// //Getting all
// movieDB.get("/get", async (req, res) => {
//     try {
//         const DataBase = await moviesList.find()
//         res.json({ status: 200, data: DataBase })
//     } catch (error) {
//         res.json({ status: 500, message: error.message })
//     }
// })

// //Getting by date
// movieDB.get("/by-date", (req, res) => {
//     moviesList.find().sort({ year: 1 }).exec((err, Movies) => {
//         if (err) {
//             res.json({ status: 400, message: err })
//         } else {
//             res.json({ status: 200, data: Movies })
//         }
//     })
// })
// //Getting by rating
// movieDB.get("/by-rating", (req, res) => {
//     moviesList.find().sort({ rating: 1 }).exec((err, Movies) => {
//         if (err) {
//             res.json({ status: 400, message: err })
//         } else {
//             res.json({ status: 200, data: Movies })
//         }
//     })
// })
// //Getting by title
// movieDB.get("/by-title", (req, res) => {
//     moviesList.find().sort({ title: 1 }).exec((err, Movies) => {
//         if (err) {
//             res.json({ status: 400, message: err })
//         } else {
//             res.json({ status: 200, data: Movies })
//         }
//     })
// })

// //Getting by id
// movieDB.get('/:id', (req, res) => {
//     moviesList.findById(req.params.id, (error, movie) => {
//         if (error) {
//             return res.status(500).json({ status: 500, error: true, message: error });
//         }
//         if (!movie) {
//             return res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` });
//         }
//         res.status(200).json({ status: 200, data: movie });
//     });
// });

// //Adding one
// movieDB.post("/", async (req, res) => {
//     if (authenticate) {
//         res.json({ status: 404, message: "You are not authenticated to add a movie" })
//     } else if (authenticate === true) {
//         const id = req.query.id
//         const title = req.query.title
//         const year = req.query.year
//         const rating = parseFloat(req.query.rating) || 4
//         const movie = new moviesList({
//             _id: new mongoose.Types.ObjectId(),
//             title: title,
//             year: year,
//             rating: rating,
//         });

//         try {
//             const newMovie = await movie.save();
//             res.json({ status: 200, data: newMovie })
//         } catch (err) {
//             res.json({ status: 400, message: err.message })
//         }
//     }
// })

// //Editing one
// movieDB.patch("/edit/:id", (req, res) => {
//     const id = req.params.id
//     const newTitle = req.query.title
//     const newYear = req.query.year
//     const newRating = req.query.rating
//     if (req.query.rating > 10 || req.query.rating < 0) {
//         return res.json({ status: 403, error: true, message: 'you rating should be between 0 and 10' })
//     }
//     moviesList.findOneAndUpdate({ _id: id }, { $set: { title: newTitle, year: newYear, rating: newRating } }, { new: true },
//         (err, updateData) => {
//             if (err) {
//                 return res.json({ status: 404, message: err })
//             }
//             if (updateData == null) {
//                 return res.json({ status: 404, message: `the movie ${id} does not exist` })
//             } else {
//                 res.json({ status: 200, data: updateData })
//             }
//         })
// })

// //Deleting one
// movieDB.delete("/delete/:id", (req, res) => {
//     const id = req.params.id
//     moviesList.findOneAndDelete(({ _id: id }), (err, docs) => {
//         if (err) {
//             return res.json({ status: res.statusCode, message: err })
//         }
//         if (docs == null) {
//             return res.json({ status: res.statusCode, message: `the movie ${id} does not exist` })
//         } else {
//             res.json({ status: res.statusCode, data: "The movie is deleted" })
//         }
//     })
// })

module.exports = movieDB