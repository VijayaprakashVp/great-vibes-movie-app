const Movies = require("../Models/movies.model");
const express = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const movie = await Movies.create(req.body);
    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const movie = await Movies.find().lean().exec();
    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
