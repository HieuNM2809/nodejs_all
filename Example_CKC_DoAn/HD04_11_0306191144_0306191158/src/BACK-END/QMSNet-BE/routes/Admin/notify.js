const express = require('express');
const NotifyController = require('../../app/controllers/Admin/NotifyController');
const routes = express.Router()
const admin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");


routes.post('/notifies/getAll', auth, NotifyController.getAll)
routes.post('/notifies', admin, NotifyController.new)
routes.delete('/notifies/:id', admin, NotifyController.delete)

module.exports = routes;