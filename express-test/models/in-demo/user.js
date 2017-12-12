const users = [];
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
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

  static list(query) {
    return User.users;
  }

  // 访问 User.users 的时候返回 users，等于 console.log(User.users)
  static get ['users']() {
    return users;
  }
}

module.exports = User;

// 测试代码
// console.log(User.list());
// console.log(User.insert('kalun', 'tang', 21));
// console.log(User.list());
// console.log(User.insert('frankie', 'tang', 21));
// console.log(User.list());
// console.log(User.getOneByName('kalun', 'tang'));
