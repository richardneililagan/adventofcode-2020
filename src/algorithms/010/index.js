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

const __memo = (fn) => {
  const __cache = {}

  return (args) => {
    const key = String(args) // :: super rudimentary

    if (!__cache[key]) {
      __cache[key] = fn(args)
    }

    return __cache[key]
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
  const ratings = lines.map((line) => +line).sort((a, b) => a - b)
  // ::  no need to push the last adapter

  // :: recursively count possible combinations
  // :: this assumes `adapters` is sorted ascending,
  //    and all elements are greater than currentJoltage
  const recurse = __memo((input) => {
    if (input.length <= 1) return 1
    const [current, ...adapters] = input

    const combinations = [0, 1, 2]
      .filter((n) => n < adapters.length)
      .reduce((a, v) => {
        const candidateAdapter = adapters[v]
        if (candidateAdapter - 3 > current) return a // :: this is an incompatible adapter

        return a + recurse([...adapters].splice(v))
      }, 0)

    return combinations
  })

  return recurse([0, ...ratings])
}

module.exports = { solver, name: PROBLEM_NAME }
