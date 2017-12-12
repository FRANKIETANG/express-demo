const express = require('express');

const router = express.Router();
const UserService = require('../services/user-service');

/* GET users listing. */
router.get('/', (req, res) => {
  // const u = new User(req.query.firstName, req.query.lastName, req.query.age);
  // res.locals.user = u;
  // res.render('user');

  const users = UserService.getAllUsers();
  res.locals.users = users;
  res.render('user');
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = UserService.addNewUser(firstName, lastName, age);
  res.json(u);
});

module.exports = router;
