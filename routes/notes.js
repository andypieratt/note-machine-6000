const notes = require("express").Router();
var uniqid = require("uniqid");

//localhost:3001/notes

// GET route for notes page
notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//localhost:3001/notes/all

//GET route for retriving all notes
notes.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST route for submitting a note
notes.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("Error in posting note.");
  }
});

module.exports = notes;
