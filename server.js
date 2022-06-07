//REQUIRED VARIABLES
const express = require("express");
const fs = require("fs");
const PORT = 3001;

//INTIALIZING APP VARIABLE
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", api);

//LISTENING
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
