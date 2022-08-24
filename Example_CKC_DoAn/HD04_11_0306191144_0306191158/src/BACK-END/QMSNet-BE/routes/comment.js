const express = require('express');
const CommentController = require('../app/controllers/CommentController');
const router = express.Router();
const auth = require('../middlewares/auth');


router.post('/comment/create', auth, CommentController.createComment);
router.patch('/comment/:id/like', auth, CommentController.likeComment);
router.patch('/comment/:id/unlike', auth, CommentController.unlikeComment);
router.delete('/comment/:id', auth, CommentController.deleteComment);
router.get('/comment/:id', auth, CommentController.getComment);

module.exports = router;
