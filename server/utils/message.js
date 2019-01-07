const moment = require('moment')

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.co.jp/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()
  }
}

module.exports = { generateMessage, generateLocationMessage }
