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
const { generateMessage, generateLocationMessage } = require('./utils/message.js')

// socket io
io.on('connection', (socket) => {
  console.log('new user connectedn...')

  // 全員へ送信されるメッセージ
  socket.emit('newMessage', generateMessage('Admin', 'welcome chat'))

  // 新規参加者から、既存のメンバーに送信されるメッセージ
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))


  // クライアントでgeolocationのイベント発生に対応
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected...')
  })
})

server.listen(port, () =>{
  console.log('======= Server is starting ========')
})
