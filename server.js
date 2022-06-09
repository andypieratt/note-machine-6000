//REQUIRED VARIABLES
const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const uniqid = require("uniqid");
// const api = require("./routes/router");

//INTIALIZING APP VARIABLE
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use("/api", api);

//GET route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//GET route for retriving all notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

//POST route for submitting a note
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    req.body.id = uniqid();
    readAndAppend(req.body, "./db/db.json");

    // const response = {
    //   status: "success",
    //   body: newNote,
    // };
    res.json(req.body);
  } else {
    res.json("Error in posting note.");
  }
});

//READ AND APPEND FUNCTION
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//WRITE FILE FUNCTION
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//LISTENING
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
