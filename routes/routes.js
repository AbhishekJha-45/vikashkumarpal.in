const express = require("express");
const router = express.Router();
const path = require("path");
const mime = require("mime");
const multer = require("multer");
const NewBlogPost = require("../models/newblogpost");
const Users = require("../models/users");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
}).single("image");

// creating new posts

router.post("/newblogpost", upload, (req, res) => {
  const newblogPost = new NewBlogPost({
    title: req.body.title,
    description: req.body.description,
    // image: req.file.filename,
    image: "http:localhost:5000/images/" + req.file.filename,
    post_url: req.body.post_url,
    redirect_url: req.body.redirect_url,
    author_name: req.body.author_name,
    cannonical_tag: req.body.cannonical_tag,
    category: req.body.category,
    robots: req.body.robots,
    heading: req.body.heading,
    content: req.body.content,
  });

  newblogPost
    .save()
    .then(() => {
      res.send("Blog post saved successfully");
    })
    .catch((error) => {
      res.status(500).send("Error saving blog post: " + error);
    });
});

// now trying with users db
router.post("/users", upload, (req, res) => {
  const users = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });

  users
    .save()
    .then(() => {
      res.send("Blog post saved successfully");
      users.db.close();
      res.send("Connection Closed Successfully");
    })
    .catch((error) => {
      res.status(500).send("Error saving blog post: " + error);
    });
});

router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/users.html"));
});

// retriving blog posts
router.get("/", async (req, res) => {
  try {
    let query = {};

    // Check if the name query parameter is provided
    if (req.query.post_url) {
      query.post_url = req.query.post_url;
    }

    const newblogPost = await NewBlogPost.find(query).exec();
    res.send(newblogPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// retriving image
router.get("/", async (req, res) => {});

const staticPath = path.join(__dirname, "../public");
router.use(express.static(staticPath));

router.get("/newblogpost", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/forms.html"));
});


router.get('/blog/rating',(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/rating.html"))
})




router.get("/public/css/main.css", (req, res, next) => {
  res.setHeader("Content-Type", mime.getType("text/css"));
  next();
});

module.exports = router;
