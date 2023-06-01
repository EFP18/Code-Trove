const router = require('express').Router();
const { User, Post, Category } = require('../models');
const withAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postDb.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    // TODO: change posts placeholder to actual feed
    res.render('posts', {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', async (req, res) => {
  try {
    res.render('about', {
      pageName: 'About - Code Trove',
    });

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
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (postDb) {
      // Serialize data so the template can read it
      const post = postDb.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('profile', {
        post,
        pageName: 'Profile - Code Trove',
        // loggedIn: req.session.loggedIn
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    pageName: 'Login - Code Trove',
  });
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    pageName: 'Sign Up! - Code Trove',
  });
});
module.exports = router;
