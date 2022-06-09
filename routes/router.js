// Require Variables
const express = require("express");
const notesRouter = require("./notes");

// Activating express
const app = express();

// MIDDLEWARE
app.use("/notes", notesRouter);

// EXPORT
module.exports = app;
