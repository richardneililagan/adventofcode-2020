const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---
const PROBLEM_NAME = 'Day 01 - Report Repair'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  const TARGET_SUM = 2020

  // :: prepare the data ---
  const numbers = lines
    .map((n) => +n) // :: convert to numbers
    .filter((n) => n <= TARGET_SUM) // :: remove numbers above our target sum
    .sort() // :: sort ascending

  // :: iterate through the numbers in ascending order ...
  for (let i = 0; i < numbers.length; i++) {
    // :: ... and iterate from the other end in descending order ...
    for (let j = numbers.length - 1; j > i && j > 0; j--) {
      // :: ... to try to hit the target sum
      const [m, n] = [numbers[i], numbers[j]]
      if (m + n === TARGET_SUM) return m * n
    }
  }

  return null
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
