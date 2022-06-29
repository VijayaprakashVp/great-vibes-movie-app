// Movie's Model
const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    movie_name: { type: String, required: true },
    Rating: { type: Number, required: true },
    image: { type: String, required: false },
    genre: { type: String, required: true, unique: true },
    class: { type: Number, required: true },
    cast: [{ type: String, required: true }],
    releaseDate: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const movies = new mongoose.model("movies", moviesSchema);

module.exports = movies;
