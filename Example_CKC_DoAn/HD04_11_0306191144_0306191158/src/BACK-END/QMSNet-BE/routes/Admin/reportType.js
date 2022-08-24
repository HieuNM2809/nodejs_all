const express = require('express');
const ReportTypeController = require('../../app/controllers/Admin/ReportTypeController');
const routes = express.Router()
const admin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");


routes.post('/reportTypes/getAll', auth, ReportTypeController.getAll)
routes.post('/reportTypes', admin, ReportTypeController.new)
routes.patch('/reportTypes/:id', admin, ReportTypeController.update)
routes.delete('/reportTypes/:id', admin, ReportTypeController.delete)

module.exports = routes;