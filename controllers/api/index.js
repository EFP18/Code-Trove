const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./post.js');
const categoryRoutes = require('./category.js');
const withAuth = require('../../utils/auth');
const { Post } = require('../../models/');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/category', categoryRoutes);

// Creates a post
router.post('/post/', withAuth, (req, res) => {
  const body = req.body;
  const insertPost = {
    title: body.title,
    body: body.body,
    user_id: req.session.user_id,
  };
  console.log('****');
  console.log(insertPost);

  Post.create(insertPost)
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
