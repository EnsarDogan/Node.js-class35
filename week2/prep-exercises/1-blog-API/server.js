const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// YOUR CODE GOES IN HERE
app.use(express.json());

app.get("/blogs/:title", (req, res) => {
  const { title } = req.body;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    res.end("This post does not exist!");
  }
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  const { title, content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.body;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});
const blog = "./";
app.get("/blogs", (req, res) => {
  // how to get the file names of all files in a folder??
});

fs.readdir(blog, (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});

app.listen(3000);
