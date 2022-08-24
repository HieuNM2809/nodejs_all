const UserController = require("../../app/controllers/Admin/UserController");
const admin = require("../../middlewares/admin");
const express = require('express');
const router = express.Router();

const prefix = '/users/'


router.post(prefix + 'getAll', admin, UserController.getAll);
router.delete(prefix + ':id', admin, UserController.delete);
router.patch(prefix + ':id', admin, UserController.update);
router.post(prefix, admin, UserController.new);

module.exports = router;