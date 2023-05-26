const router = require('express').Router();
const { User, Post, Category } = require('..models');
const withAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    // Serialize data so the template can read it
    const posts = postDb.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('feed', {
      posts
    })
  } catch(err) {
    res.status(500).json(err);
  }
});


// GET all posts of a specific user
// use middleware to check if the user is logged in
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      where: {
        id: req.params.id
      }
    });

    // Serialize data so the template can read it
    const posts = postDb.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('profile', {
      posts,
      loggedIn: req.session.loggedIn
    })
  } catch(err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
});


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});
module.exports = router;