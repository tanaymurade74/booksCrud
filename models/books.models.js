const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre: [{
        type: String,
    }],
    language: String,
    country: String,
    rating: Number,
    summary: String,
    coverImageUrl: String
})

const books = mongoose.model("books", bookSchema)

module.exports = books