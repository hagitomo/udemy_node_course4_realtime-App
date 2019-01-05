const expect = require('expect')

const { generateMessage } = require('./message.js')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var obj = {
      from: 'andrew',
      text: 'hello world'
    }
    var message = generateMessage(obj.from, obj.text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject(obj)
  })
})


