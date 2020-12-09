const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 09 - Encoding Error'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = (await readFileToArray(inputfile)).map((i) => +i)

  switch (difficulty) {
    case 'easy':
      return await __easysolver(lines)
    case 'hard':
      return await __hardsolver(lines)
    default:
      return null
  }
}

// :: returns whether number is the sum of a pair of numbers in the preamble list
const __isValid = (number, preamble) => {
  // :: don't consider numbers greater than the target,
  //    as well as those that are exactly half (as the two addends need to be different values)
  const candidates = preamble.filter((n) => number < n || number / 2 !== n)

  for (let i = 0; i < candidates.length - 1; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      if (candidates[i] + candidates[j] === number) return true
    }
  }

  // :: if we reach this point, we didn't find a pair
  return false
}

const __easysolver = async (numbers) => {
  const PREAMBLE_LENGTH = 25 // :: how many numbers make up the preamble

  // :: we start at the index right after the preamble
  for (let current = PREAMBLE_LENGTH; current < numbers.length; current++) {
    const preamble = Array(PREAMBLE_LENGTH)
      .fill(0)
      .map((_, i) => numbers[current - (i + 1)])

    if (!__isValid(numbers[current], preamble)) return numbers[current]
  }
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, __isValid, name: PROBLEM_NAME }
