const router = require('express').Router();
const { Post } = require('../../models/Post');
const withAuth = require('../../utils/auth')

// Creates a post
router.post('/', withAuth, (req, res) => {
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

// // Pulls all posts
// router.get('/', (req, res) => {
//     Post.findAll().then((postData) => {
//         res.json(postData);
//     });
// })

// // Pulls a post
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
        .catch((err) => res.json(err));
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
        .catch((err) => res.json(err));
});

module.exports = router;
