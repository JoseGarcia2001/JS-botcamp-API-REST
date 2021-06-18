const { palindrome } = require('./testing')

describe.skip('Palindrome', () => {
  test('of joselo', () => {
    const result = palindrome('joselo')
    expect(result).toBe('olesoj')
  })

  test('of empty string', () => {
    const result = palindrome('')
    expect(result).toBe('')
  })

  test('of undefined value', () => {
    const result = palindrome()
    expect(result).toBe('')
  })
})
