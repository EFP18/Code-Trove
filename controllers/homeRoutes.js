const router = require("express").Router();
const { User, Post, Category } = require("../models");
const withAuth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      include: [
        {
          model: User,
<<<<<<< HEAD
          attributes: ["username"],
=======
          attributes: ['username'],
>>>>>>> 055fa8a597a19d2281abefbe44d9b530de399bb2
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postDb.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
<<<<<<< HEAD
    // TODO: change posts placeholder to actual feed
    res.render("posts", {
=======
    res.render('feed', {
>>>>>>> 055fa8a597a19d2281abefbe44d9b530de399bb2
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all posts of a specific user
// use middleware to check if the user is logged in
router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
<<<<<<< HEAD
          attributes: ["username"],
=======
          attributes: ['username'],
>>>>>>> 055fa8a597a19d2281abefbe44d9b530de399bb2
        },
      ],
    });

    if (postDb) {
      // Serialize data so the template can read it
      const post = postDb.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render("profile", {
        post,
        // loggedIn: req.session.loggedIn
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
<<<<<<< HEAD
  res.render("login");
});

router.get("/signup", (req, res) => {
=======
  res.render('login');
});

router.get('/signup', (req, res) => {
>>>>>>> 055fa8a597a19d2281abefbe44d9b530de399bb2
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});
module.exports = router;
