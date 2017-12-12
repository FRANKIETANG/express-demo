const User = require('../models/in-demo/user');

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
};
