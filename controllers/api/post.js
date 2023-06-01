const router = require('express').Router();
const Post = require('../../models/Post');

// Creates a post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id
    })
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.json(err);
    });
});

// Pulls all posts
router.get('/', (req, res) => {
    Post.findAll().then((postData) => {
        res.json(postData);
    });
})

// Pulls a post
router.get('/:isbn', (req, res) => {
    Post.findOne(
        {
            where: {
                isbn: req.params.isbn
            },
        }
    ).then((postData) => {
        res.json(postData);
    });
});

// Updates a post
router.put('/:isbn', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body: req.body.body
        },
        {
            where: {
                isbn: req.params.isbn,
            },
        }
    )
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => res.json(err));
});

// Delete a post
router.delete('/:isbn', (req, res) => {
    Post.destroy({
        where: {
            isbn: req.params.isbn,
        },
    })
        .then((deletedPost) => {
            res.json(deletedPost);
        })
        .catch((err) => res.json(err));
});

module.exports = router;