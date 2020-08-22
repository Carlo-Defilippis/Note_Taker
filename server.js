const fs = require("fs");
const express = require("express");

const notes = fs.readFileSync("./db/db.json");
const data = JSON.parse(notes);

console.log(data);

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 
// Router


// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

