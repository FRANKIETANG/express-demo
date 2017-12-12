const express = require('express');

const router = express.Router();
const User = require('../models/in-demo/user');

/* GET users listing. */
router.get('/', (req, res) => {
  const u = new User(req.query.firstName, req.query.lastName, req.query.age);
  res.locals.user = u;
  res.render('user');
});

module.exports = router;
