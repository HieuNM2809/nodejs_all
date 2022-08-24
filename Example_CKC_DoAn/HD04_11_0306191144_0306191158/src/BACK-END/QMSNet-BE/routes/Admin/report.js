const express = require('express');
const ReportController = require('../../app/controllers/Admin/ReportController');
const router = express.Router();
const auth = require('../../middlewares/auth');
const admin = require("../../middlewares/admin");

router.get('/reports/:id', auth, ReportController.get);
router.post('/reports/create', auth, ReportController.new);
router.post('/reports/getAll', admin, ReportController.getAll);
router.patch('/reports/:id', admin, ReportController.update);
router.delete('/reports/:id', admin, ReportController.delete);

module.exports = router;