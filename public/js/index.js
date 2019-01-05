var socket = io()
socket.on('connect', function() {
  console.log('connected to server')

  socket.emit('createMsg', ({
    ttl: 'hello',
    to: 'andrew@hoge.com'
  }))
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

socket.on('newEmail', function(email) {
  console.log('New Email', email)
})
