const express = require('express');
const router = express.Router();
const companiesController = require('../../controllers/source/companiesController.js');

router.get('/', companiesController.handleGetCompanies);

module.exports = router;
