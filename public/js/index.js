var socket = io()
socket.on('connect', function() {
  console.log('connected to server')

  socket.emit('createMessage', ({
    from: 'hello',
    text: 'andrew@hoge.com'
  }))
})
socket.on('newMessage', function(email) {
  console.log('newMessage', email)
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})


