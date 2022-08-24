const express = require('express');
const CommentController = require('../../app/controllers/Admin/CommentController');
const router = express.Router();
const admin = require("../../middlewares/admin");

// router.comment('/comments/create', admin, CommentController.new);
router.post('/comments/getAll', admin, CommentController.getAll);
// router.patch('/comments/:id', admin, CommentController.update);
router.delete('/comments/:id', admin, CommentController.delete);

module.exports = router;