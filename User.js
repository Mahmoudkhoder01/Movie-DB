const express = require("express")
const User = express.Router()
const mongoose = require("mongoose")
var authenticate = require("./index")

// const userSchema = new mongoose.Schema({
//     _id: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true
//     },
//     password: {
//         type: String
//     },
// })

// const user = mongoose.model("User", userSchema)

// User.post("/register", (req, res) => {
//     const email = req.query.email
//     const pass = req.query.password
//     const newUser = new user({
//         _id: new mongoose.Types.ObjectId(),
//         email: email,
//         password: pass
//     })
//     newUser.save((err) => {
//         err ? res.json({ status: 400, message: err.message }) : res.json({ status: res.statusCode, message: "You have successfully registered" })
//     })
// })

// User.post("/login", (req, res) => {
//     const email = req.query.email
//     const pass = req.query.password
//     user.findOne({ email: email }, (err, foundUser) => {
//         if (err) {
//             res.json({ status: 404, message: "User NOt Found" })
//         } else {
//             if (foundUser) {
//                 if (foundUser.password === pass) {
//                     res.json({ status: 202, message: "You are logged in" })
//                     authenticate == true
//                 }
//             }
//         }
//     })
// })

module.exports = User