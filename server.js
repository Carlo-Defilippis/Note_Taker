const express = require("express");
const path = require("path");
let noteData = require("./db/db.json");
const fs = require("fs");
const uuid = require("uuid/v1");    

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes/", function (req, res) {
  console.log("getting the note");
  res.json(noteData);
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);
  let note = req.body;
  const { title, text } = note;
  let newNote = { title, text, id:uuid() };

  console.log(newNote);
  noteData.push(newNote);
  res.json(noteData);
  console.log("saving note");

  fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
    if (err) throw err;
    console.log("sucessfully wrote");
  });
});

app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  let deleteNote = noteData.filter((note) => note.id !== id);
  console.log(deleteNote);
  fs.writeFile("./db/db.json", JSON.stringify(deleteNote), function (err) {
    if (err) throw err;
    console.log("deleted succesfully");
  });
  noteData = deleteNote;
  res.json(deleteNote);
  console.log("deleted post"); 
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});