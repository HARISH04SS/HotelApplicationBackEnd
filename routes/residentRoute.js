const express = require('express');
const residentController = require('../controller/residentController');
const residentRouter = express.Router();

residentRouter.get('/',residentController.test)
module.exports = residentRouter;