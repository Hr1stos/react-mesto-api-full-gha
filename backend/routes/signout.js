const router = require('express').Router();

const { signOut } = require('../controllers/users');

router.get('/signout', signOut);

module.exports = router;
