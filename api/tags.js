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
    try {
        const { tagName } = req.params;
        const posts = await getPostsByTagName(tagName);
      res.send ({ posts })
    } catch ({ name, message }) {
      next({ name: 'tag error', message: 'Wrong tag'});
    }
  });

module.exports = tagsRouter;