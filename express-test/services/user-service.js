const User = require('../models/in-demo/user');
const Subscription = require('../models/in-demo/subscription');

module.exports = {
  getAllUsers() {
    return User.list();
  },
  addNewUser(firstName, lastName, age) {
    return User.insert(firstName, lastName, age);
  },
  getUserById(userId) {
    return User.getOneById(userId);
  },
  createSubscription(UserId, url) {
    const user = User.getOneById(UserId);
    if (!user) throw Error('no such user!'); // 判断有没有用户没有就抛错
    const sub = Subscription.insert(UserId, url); // 有就 insert 一个新的 userId 和 url
    return sub;
  },
};
