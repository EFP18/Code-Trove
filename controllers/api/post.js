const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../middleware/auth')

// Create a new post
router.post('/', withAuth, (req, res) => {
    const body = req.body;

    console.log(body);

    Post.create({
        title: body.title,
        body: body.body,
        language: body.category,
        user_id: req.session.user_id
    })
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// Updates a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body: req.body.body,
            language: req.body.category
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedPost) => {
            res.json(deletedPost);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
