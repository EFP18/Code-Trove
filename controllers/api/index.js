const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./post.js');
const categoryRoutes = require('./category.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
