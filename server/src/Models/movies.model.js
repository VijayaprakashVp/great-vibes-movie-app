// Movie's Model
const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    movie_name: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: false },
    genre: { type: String, required: true, unique: false },
    cast: [{ type: String, required: true }],
    release_date: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const movies = new mongoose.model("movies", moviesSchema);

module.exports = movies;
