[
  {
    id: 'kfnoknconrkworn',
    name: 'Andrew',
    room: 'The office'
  }
]


class Users {
  constructor () {
    this.users = []
  }

  // ユーザ追加
  addUser(id, name, room) {
    var user = { id, name, room }
    this.users.push(user)
    return user
  }

  // ユーザー削除
  removeUser(id) {
    var user = this.users.filter((user) => user.id === id)[0]
    if (user) {
      this.users = this.users.filter((user) => user.id !== id )
    }
    this.users.slice(user)
    return user
  }

  // ユーザー取得
  getUser(id) {
    var user = this.users.filter((user) => user.id === id)[0]
    return user
  }

  // 特定のroomのユーザ一覧取得
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room)
    var namesArray = users.map((user) => user.name)

    return namesArray
  }
}

module.exports = { Users }
