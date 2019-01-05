const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIO(server) // socket io使用

// 環境変数
const port = process.env.PORT || 3000;

// 静的ファイル利用
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

// socket io
io.on('connection', (socket) => {
  console.log('new user connectedn...')

  socket.emit('newEmail', {
    form: 'mike@example.com',
    ttl: 'hogeeeee',
    creatAt: 123
  });

  socket.on('createMsg', (msg) => {
    console.log('new message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected...')
  })
})

server.listen(port, () =>{
  console.log('======= Server is starting ========')
})
