const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// YOUR CODE GOES IN HERE
app.use(express.json());

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  let title = req.params.title;
  const { content } = req.body;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.end("This post does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    res.end("This post does not exist!");
  }
});

app.get("/blogs", (req, res) => {
  const blogsDir = "./";
  let blogsArr = [];
  fs.readdir(blogsDir, (err, blogs) => {
    blogs.forEach((blog) => {
      if (path.extname(blog) === "" && blog !== "node_modules") {
        const blogObject = {};
        blogObject.title = blog;
        blogsArr.push(blogObject);
      }
    });
    res.send(blogsArr);
  });
});

app.listen(3000);
