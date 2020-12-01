const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---
const PROBLEM_NAME = 'Day 01 - Report Repair'

const solver = async (difficulty) => {
  const TARGET_SUM = 2020

  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  // :: prepare the data ---
  const numbers = lines
    .map((n) => +n) // :: convert to numbers
    .filter((n) => n <= TARGET_SUM) // :: remove numbers above our target sum
    .sort() // :: sort ascending

  switch (difficulty) {
    case 'easy':
      return await easysolver(numbers, TARGET_SUM)
    case 'hard':
      return await hardsolver(numbers, TARGET_SUM)
    default:
      return null
  }
}

const easysolver = async (numbers, target) => {
  // :: iterate through the numbers in ascending order ...
  for (let i = 0; i < numbers.length; i++) {
    // :: ... and iterate from the other end in descending order ...
    for (let j = numbers.length - 1; j > i; j--) {
      // :: ... to try to hit the target sum
      const [m, n] = [numbers[i], numbers[j]]
      if (m + n === target) return m * n
    }
  }

  return null
}

const hardsolver = async (numbers, target) => {
  // :: mostly the same banana over here, with crawlers i,j,k
  //    and numbers is a sorted array of size N
  //    and i < j < k, and 0 < i,j,k < N
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = numbers.length - 1; k > j; k--) {
        const [m, n, o] = [numbers[i], numbers[j], numbers[k]]
        if (m + n + o === target) return m * n * o
      }
    }
  }
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
