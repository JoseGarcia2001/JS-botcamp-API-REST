const { findAverage } = require('./testing')

describe('Average', () => {
  test('return the correct average of many numbers', () => {
    expect(findAverage([1, 4, 5, 6])).toBe(4)
  })

  test('Of empty array', () => {
    expect(findAverage([])).toBe(0)
  })

  test('Of undefined value', () => {
    expect(findAverage()).toBe(0)
  })
})
