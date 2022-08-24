const express = require('express');
const NotifyController = require('../app/controllers/NotifyController');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/notify/create', auth, NotifyController.createNotify);
router.get('/notify', auth, NotifyController.getNotifies);
router.get('/notify/readAll', auth, NotifyController.readAll);
router.get('/notify/:id', auth, NotifyController.isReadNotify);
router.delete('/notify/:id', auth, NotifyController.DeleteNotify);
router.get('/notify/unread/:id', auth, NotifyController.UnReadNotify);

module.exports = router;
