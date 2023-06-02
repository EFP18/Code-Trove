const sequelize = require('../config/connection');
const { Post } = require('../models');

const postData = require('./posts.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const posts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true
    });

    // Potentially do not need this
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();