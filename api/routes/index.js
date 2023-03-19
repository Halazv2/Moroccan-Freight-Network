//set routes here
const router = require('express').Router();
const auth = require('./auth/auth');
const register = require('./auth/register');
const refresh = require('./auth/refresh');
const logout = require('./auth/logout');
const companies = require('./api/companies.js');

router.use('/auth', auth);
router.use('/register', register);
router.use('/refresh', refresh);
router.use('/logout', logout);
router.use('/companies', companies);

module.exports = router;
