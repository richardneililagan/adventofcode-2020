const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 13 - Shuttle Search'

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
  const timestamp = Number(lines[0])
  const buses = lines[1]
    .split(',')
    .filter((c) => c !== 'x')
    .map((id) => Number(id))

  const sortedWaitTimes = buses
    .map((id) => [id, id - (timestamp % id)])
    .sort((a, b) => a[1] - b[1])

  const [busId, waitTime] = sortedWaitTimes[0]
  return busId * waitTime
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
