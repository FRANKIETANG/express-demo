const users = [];
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    User.id += 1;
    this.id = User.id;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static insert(firstName, lastName, age) {
    const u = new User(firstName, lastName, age);
    User.users.push(u);
    return u;
  }

  static getOneByName(firstName, lastName) {
    return User.users.find(el => el.firstName === firstName && el.lastName === lastName);
  }

  static getOneById(userId) {
    return User.users.find(el => el.id === userId);
  }

  static list(query) {
    return User.users;
  }

  // 访问 User.users 的时候返回 users，等于 console.log(User.users)
  static get ['users']() {
    return users;
  }
}

User.id = 0;

module.exports = User;

// 测试代码
// console.log(User.list());
// console.log(User.insert('kalun', 'tang', 21));
// console.log(User.list());
// console.log(User.insert('frankie', 'tang', 21));
// console.log(User.list());
// console.log(User.getOneByName('kalun', 'tang'));
