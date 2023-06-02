const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../middleware/auth')

// Create a new post
router.post('/', withAuth, (req, res) => {
    const body = req.body;

    Post.create({
        title: body.title,
        body: body.body,
        user_id: body.user_id
    })
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// // Get all posts
// router.get('/', (req, res) => {
//     Post.findAll().then((postData) => {
//         res.json(postData);
//     });
// })

// // Get single post
// router.get('/:id', (req, res) => {
//     Post.findOne(
//         {
//             where: {
//                 id: req.params.id
//             },
//         }
//     ).then((postData) => {
//         res.json(postData);
//     });
// });

// Updates a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            body: req.body.body
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
