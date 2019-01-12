// strが文字列で、両端の空白をのぞいて、長さがあるか
var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0
}

module.exports = { isRealString }
