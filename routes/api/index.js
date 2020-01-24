const express = require("express");
const router = express.Router();

const exercisesRouter = require("./exercises");
const usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/exercises", exercisesRouter);

module.exports = router;
