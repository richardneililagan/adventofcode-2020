const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 05 - Binary Boarding'

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
  const ids = lines.map(__getSeatId)
  return Math.max(...ids)
}

const __hardsolver = async (lines) => {
  //
}

/**
 * Converts a 10-char code to its corresponding seat ID integer.
 * @param {string} seatcode A 10-character code specifying the seat in the airplane.
 */
const __getSeatId = (seatcode) => {
  const binarystring = seatcode.replace(/[fl]/gi, '0').replace(/[br]/gi, '1')
  return parseInt(binarystring, 2)
}

module.exports = {
  solver,
  __getSeatId,
  name: PROBLEM_NAME,
}
