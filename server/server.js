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
const { isRealString } = require('./utils/validation.js')
const { Users } = require('./utils/users.js')
const users = new Users()

// socket io
io.on('connection', (socket) => {
  console.log('new user connectedn...')

  // chat.htmlに新規参加
  socket.on('join', (params, callback) => {
    // name,roomが入力されていない・不正な場合
    if ( !isRealString(params.name) || !isRealString(params.room) ) {
      return callback('Name and room name area required')
    }

    // roomに参加
    socket.join(params.room)
    // 過去に発行したidのユーザーを削除
    users.removeUser(socket.id)
    // ユーザーリストに追加
    users.addUser(socket.id, params.name, params.room)

    // 参加したroomへuserUpdateListイベントを発行し, ユーザーリストを更新
    io.to(params.room).emit('userUpdateList', users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} was joined`))

    callback()
  })

  // クライアントで`createMessage`イベントが起きた際に
  // サーバ側で`newmessage`イベントを発生させ、クライアント側で書き込み実施
  // callbackを引数にとって、実行している
  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback()
  })

  // クライアントでgeolocationのイベント発生に対応
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng))
  })

  // 切断されたとき
  socket.on('disconnect', () => {
    // リストから削除
    var user = users.removeUser(socket.id)

    if ( user ) {
      // ユーザーリストの更新
      io.to( user.room ).emit('userUpdateList', users.getUserList(user.room))
      io.to( user.room ).emit('newMessage', generateMessage('Admin', `${user.name} has left `))
    }
  })
})

server.listen(port, () =>{
  console.log('======= Server is starting ========')
})
