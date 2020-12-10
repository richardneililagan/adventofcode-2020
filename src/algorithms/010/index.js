const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 10 - Adapter Array'

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
  const ratings = lines.map((line) => +line).sort((a, b) => a - b) // :: sort ascending
  ratings.push(ratings[ratings.length - 1] + 3) // :: add the rating of our device

  const differences = ratings.reduce((a, v, i) => {
    const previousRating = i === 0 ? 0 : ratings[i - 1]
    a.push(v - previousRating)
    return a
  }, [])

  const onediffs = differences.filter((i) => i === 1)
  const threediffs = differences.filter((i) => i === 3)

  return onediffs.length * threediffs.length
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
