// ページ下部を表示しているとき、新規メッセージが来た場合に、自動スクロール
function scrollToBottom () {
  var messages = $('#messages')
  var newMessage = messages.children('li:last-child')

  var clientHeight = messages.prop('clientHeight') // window高さ
  var scrollTop = messages.prop('scrollTop') // 画面上部まで の高さ
  var scrollHeight = messages.prop('scrollHeight') // メッセージ全体の高さ
  var newMessageHeight = newMessage.innerHeight() // 最新メッセージの高さ
  var lastMessageHeight = newMessage.prev().innerHeight() // 最新より一つ前のメッセージの高さ

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

var socket = io()

// 接続されたとき
socket.on('connect', function() {
  // index.htmlから移動してきた際に、パラメータ取得
  var params = $.deparam(window.location.search)

  // joinイベント発行
  socket.emit('join', params, function (err) {

    if( err ) {
      // 入力されたパラメータにエラー
      alert(err)
      window.location.href = '/'
    } else {
      console.log('no err')
    }
  })
})

// 切断されたとき
socket.on('disconnect', function() {
  console.log('disconnected from server')
})

// ユーザーリストの更新
socket.on('userUpdateList', function(users) {
  var ol = $('<ol></ol>')

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user))
  })

  $('#users').html(ol)
})

// メッセージ作成
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')

    // mustache.js
    var template = $('#message-template').html()
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    })

    $('#messages').append(html)
    scrollToBottom()
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

  var template = $('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  $('#messages').append(html)
  scrollToBottom()
})

