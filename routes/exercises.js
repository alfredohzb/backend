const router = require("express").Router();

let Exercise = require("../models/exercise.model");

//List All Exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

//Add New Exercises
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise
    .save()
    .then(() => {
      res.status(201);
      res.json("Exercise added!");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//Find Exercises by ID
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete Exercise by ID
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status("Exercises deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update Exercise by ID
router.route("/update/:id").put((req, res) => {
  Exercise.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
      }
    }
  )
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
