const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MoviesController = require("./Controllers/movies.controller");

app.use("/movies", MoviesController);

module.exports = app;
