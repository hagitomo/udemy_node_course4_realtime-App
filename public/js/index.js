var socket = io()
socket.on('connect', function() {
  console.log('connected to server')
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')

  var li = $('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)
  $('#messages').append(li)
})

// formイベント
$('#message-form').on('submit', function(e) {
  e.preventDefault()

  var messsageTextbox = $('[name=message]')

  // createMessageイベントを発生させる
  socket.emit('createMessage', { // 引数１: text-formの値をとって、送信
    from: 'User',
    text: messsageTextbox.val()
  }, function() { // 引数２: 送信後にtextformをカラにするcallback関数
    messsageTextbox.val('')
  })
})

// geolocation
var locationButton = $('#send-location')
locationButton.on('click', function () {
  // ブラウザがgeolocation APIをサポートしていない場合
  if ( !navigator.geolocation ) {
    return alert('Geolocation not supported by your browser')
  }

  // 一度送信するとbuttonを無効に（再送信防止）
  locationButton.attr('disabled', 'disabled').text('sending location...')

  // apiを利用して、緯度経度取得し、`createLocationMessage`イベントを発生
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
    locationButton.removeAttr('disabled').text('Send location') // ボタン送信できるように

    // api取得できなかった場合
  }, function () {
    alert('unable to fetch loation')
    locationButton.removeAttr('disabled').text('Send location') // ボタン送信できるように
  })
})

// クライアント側でのnewLocationMessageイベントに対応
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = $('<li></li>')
  var a = $('<a target="_blank">My current location</a>')

  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)

  $('#messages').append(li)
})

