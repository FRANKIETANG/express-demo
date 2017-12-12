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
  res.render('users');
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = UserService.addNewUser(firstName, lastName, age);
  res.json(u);
});

router.get('/:userId/', (req, res) => { // 前面加一个冒号就代表这个是作为一个参数处理
  console.log(req.params.userId);
  const user = UserService.getUserById(Number(req.params.userId));
  res.locals.user = user;
  res.render('user');
});

// 增加一条订阅
router.post('/:userId/subscription', (req, res, next) => { // 前面加一个冒号就代表这个是作为一个参数处理
  try {
    const sub = UserService.createSubscription(Number(req.params.userId), req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
