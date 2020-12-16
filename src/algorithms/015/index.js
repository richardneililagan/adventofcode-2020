const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 15 - Rambunctious Recitation'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  switch (difficulty) {
    case 'easy':
      return await __easysolver(lines)
    case 'hard':
      return await __hardsolver(lines)
    default:
      return null
  }
}

const __easysolver = async (lines) => {
  const STARTING_NUMBERS = lines[0].split(',').map(Number)

  let turnNumber = 0
  let lastNumberSpoken = null
  const tracker = []

  while (turnNumber < 2020) {
    turnNumber += 1

    // :: a nice characteristic of the input is that no numbers are repeated
    //    so we can make this nice short-circuit here
    if (turnNumber <= STARTING_NUMBERS.length) {
      lastNumberSpoken = STARTING_NUMBERS[turnNumber - 1]
      tracker[lastNumberSpoken] = [turnNumber]
      continue
    }
    // :: ---

    // :: else, we look at the last number spoken, and look at the history
    //    for that number, if it already exists
    const spokenHistory = tracker[lastNumberSpoken]
    if (spokenHistory.length === 1) {
      // :: first time spoken
      lastNumberSpoken = 0
    } else {
      // :: spoken a few times before
      lastNumberSpoken = spokenHistory[0] - spokenHistory[1]
    }

    // :: track the spoken number
    if (tracker[lastNumberSpoken] === undefined) {
      tracker[lastNumberSpoken] = [turnNumber]
    } else {
      tracker[lastNumberSpoken][1] = tracker[lastNumberSpoken][0]
      tracker[lastNumberSpoken][0] = turnNumber
    }
  }

  return lastNumberSpoken
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
