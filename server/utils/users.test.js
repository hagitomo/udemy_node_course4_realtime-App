const expect = require('expect')
const { Users } = require('./users.js')

describe('Users', () => {
  var users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'mike',
      room: 'node course'
    },
    {
      id: '2',
      name: 'john',
      room: 'react cuorse'
    },
    {
      id: '3',
      name: 'tom',
      room: 'node course'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'andrew',
      room: 'office'
    }

    var resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    var user = users.removeUser('2')

    expect(user).toEqual({
      id: '2',
      name: 'john',
      room: 'react cuorse'
    })
    expect(users.users.length).toBe(2)
  })

  it('should not remove user', () => {
    var user =  users.removeUser('4')

    expect(user).toBeFalsy()
    expect(users.users.length).toEqual(3)
  })

  it('should find user', () => {
    var userId = '1'
    var user = users.getUser(userId)

    expect(user.id).toEqual(userId)
  })

  it ('should not find user', () => {
    var userId = '99'
    var user = users.getUser(userId)

    expect(user).toBeFalsy()
  })

  it('should return names for node course', () => {
    var userList = users.getUserList('node course')

    expect(userList).toEqual(['mike','tom'])
  })
})
