const expect = require('expect')
const { isRealString } = require('./validation.js')

describe('isRealString', () => {
  it('should reject non-string values', () =>{
    var num = 1
    var result = isRealString(num)
    expect(result).toBeFalsy()
  })

  it ('should reject string with only spaces', () => {
    var str = '  '
    var result = isRealString(str)
    expect(result).toBeFalsy()
  })

  it('should allow storing with non-space chars', () => {
    var str = '  hoge fuga  '
    var result = isRealString(str)
    expect(result).toBeTruthy()
  })
})
