var moment = require('moment')


var timestamp = moment().valueOf()
console.log(timestamp)

var createdAt = 1234
var date = moment(createdAt)
console.log(date.format('YYYY, MMM, d, h:mm a'))
