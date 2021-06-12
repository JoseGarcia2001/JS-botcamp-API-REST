const palindrome = (string = '') => {
  const reverseString = string
    .split('')
    .reverse()
    .join('')

  return reverseString
}

const findAverage = (arrayOfNums = []) => {
  if (arrayOfNums.length === 0) return 0

  let sumOfTheNums = 0
  arrayOfNums.forEach(num => { sumOfTheNums += num })

  return sumOfTheNums / arrayOfNums.length
}

module.exports = { palindrome, findAverage }
