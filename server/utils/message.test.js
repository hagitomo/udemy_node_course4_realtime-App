const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message.js')

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'andrew'
    var lat = '30'
    var lng = '123'
    var locationUrl = `https://www.google.co.jp/maps?q=${lat},${lng}`

    var locationMesssage = generateLocationMessage(from, lat, lng)
    expect(locationMesssage.from).toBe('andrew')
    expect(typeof locationMesssage.createdAt).toBe('number')
    expect(locationMesssage.url).toBe(locationUrl)
  })
})

