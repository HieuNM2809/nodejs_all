const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify/:id', AuthController.verifyEmail);
router.get('/generatePassword/:id', AuthController.generatePassword);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/sendMail', AuthController.sendNewCodeVerify);
router.post('/logout', AuthController.logout);
router.get('/refresh_token', AuthController.generateAccessToken);

module.exports = router;
