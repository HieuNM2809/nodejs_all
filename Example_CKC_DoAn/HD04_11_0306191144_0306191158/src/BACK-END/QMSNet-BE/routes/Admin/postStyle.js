const express = require('express');
const PostStyleController = require('../../app/controllers/Admin/PostStyleController');
const routes = express.Router()
const admin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");


routes.post('/postStyles/getAll', auth, PostStyleController.getAll)
routes.post('/postStyles', admin, PostStyleController.new)
routes.patch('/postStyles/:id', admin, PostStyleController.update)
routes.delete('/postStyles/:id', admin, PostStyleController.delete)

module.exports = routes;