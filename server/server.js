const path = require('path')
const express = require('express')
const app = express()

// 環境変数
const port = process.env.PORT || 3000;
// 静的ファイル利用
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

app.listen(port, () =>{
  console.log('Server is starting........')
})
