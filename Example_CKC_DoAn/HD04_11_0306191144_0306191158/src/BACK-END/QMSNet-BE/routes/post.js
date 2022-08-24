const express = require('express');
const router = express.Router();
const PostController = require('../app/controllers/PostController');
const auth = require('../middlewares/auth');

router.post('/posts', auth, PostController.createPost);
router.patch('/posts/:id', auth, PostController.updatePost);
router.post('/posts/getAll', auth, PostController.getPosts);
router.get('/posts/:id', auth, PostController.getPostById);
router.post('/posts/getByUser/:id', auth, PostController.getPostsByUser);
router.get('/posts/getPostsExplore', auth, PostController.getPostsExplore);
router.post(
    '/posts/getSavedByUser',
    auth,
    PostController.getPostSavedByUser
);
router.patch('/posts/:id/like', auth, PostController.likePost);
router.patch('/posts/:id/unlike', auth, PostController.unlikePost);
router.patch('/posts/:id/disableComment', auth, PostController.disableCommentPost);
router.patch('/posts/:id/save', auth, PostController.savePost);
router.patch('/posts/:id/unsave', auth, PostController.unsavePost);
router.delete('/posts/:id', auth, PostController.deletePost);

module.exports = router;
