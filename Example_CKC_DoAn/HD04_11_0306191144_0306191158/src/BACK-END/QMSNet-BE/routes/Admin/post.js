const express = require('express');
const PostController = require('../../app/controllers/Admin/PostController');
const router = express.Router();
const admin = require("../../middlewares/admin");

// router.post('/posts/create', admin, PostController.new);
router.post('/posts/getAll', admin, PostController.getAll);
// router.patch('/posts/:id', admin, PostController.update);
router.delete('/posts/:id', admin, PostController.delete);

module.exports = router;