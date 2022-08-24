const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../app/controllers/UserController');

router.patch('/users/changeavatar', auth, userController.changeAvatar);
router.patch('/users/updateuser', auth, userController.updateUser);
router.patch('/users/changepassword', auth, userController.changePassword);
router.patch('/users/follow/:id', auth, userController.follow);
router.patch('/users/unFollow/:id', auth, userController.unFollow);
router.patch('/users/block/:id', auth, userController.block);
router.get('/users/block', auth, userController.getBlock);
router.patch('/users/block/:id', auth, userController.block);
router.patch('/users/unblock/:id', auth, userController.unBlock);
router.get('/search', auth, userController.searchUser);
router.post('/users/getAll', auth, userController.getAll);
router.post('/users/suggestions', auth, userController.suggestionsUser);
router.post('/users/requests', auth, userController.requests);
router.get('/users/:id', auth, userController.getUser);
router.post('/users/userSettings', auth, userController.updateUserSetting);
module.exports = router;
