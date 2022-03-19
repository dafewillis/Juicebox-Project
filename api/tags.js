const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {

    const { tagName } = req.params;

    try {
        const posts = await getPostsByTagName(tagName);

        const taggedPosts = posts.filter(post => {
            if (post.active && post.author.id === req.user.id) {
                return true;
            }
            return false;
        })

      res.send ({ taggedPosts })

    } catch ({ name, message }) {
      next({ name: 'tag error', message: 'Wrong tag!'
    });
  }
});

module.exports = tagsRouter;