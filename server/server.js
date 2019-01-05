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

// util関数
const { generateMessage } = require('./utils/message.js')

// socket io
io.on('connection', (socket) => {
  console.log('new user connectedn...')

  // 全員へ送信されるメッセージ
  socket.emit('newMessage', generateMessage('Admin', 'welcome chat'))

  // 新規参加者から、既存のメンバーに送信されるメッセージ
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message) => {
    console.log('new message', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected...')
  })
})

server.listen(port, () =>{
  console.log('======= Server is starting ========')
})
