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
      order: [['id', 'desc']]
    });

    // Serialize data so the template can read it
    const posts = postDb.map((post) => post.get({ plain: true }));

    // console.log(posts);

    // Pass serialized data and session flag into template
    res.render('feed', {
      posts,
      loggedIn: Boolean(req.session.user_id)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', async (req, res) => {
  try {
    res.render('about', {
      pageName: 'About - Code Trove',
      loggedIn: Boolean(req.session.user_id)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all posts of a specific user
// use middleware to check if the user is logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    // GET all posts and JOIN with user
    const postDb = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['id', 'desc']]
    });

    console.log(postDb);

    if (postDb) {
      // Serialize data so the template can read it
      const post = postDb.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('profile', {
        post,
        pageName: 'Profile - Code Trove',
        loggedIn: true,
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
