const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 06 - Custom Customs'

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
  const groups = lines.reduce(
    (a, line) => {
      if (line.length === 0) {
        // :: If the line is blank, we should start a new group.
        return [...a, new Set()]
      }

      const currentGroup = a[a.length - 1]

      // :: Just add the chars into the set, and let the set handle duplicates
      line.split('').forEach((char) => currentGroup.add(char))

      return a
    },
    [new Set()]
  )

  return groups.reduce((a, group) => a + group.size, 0)
}

const __hardsolver = async (lines) => {
  const groups = lines.reduce(
    (a, line) => {
      if (line.length === 0) return [...a, null]

      const answers = line.split('')
      const currentGroup = a[a.length - 1]
      if (currentGroup === null) {
        a[a.length - 1] = [...answers]
        return a
      }

      // :: ---

      const validated = currentGroup.filter((c) => answers.includes(c))
      a[a.length - 1] = validated

      return a
    },
    [null]
  )

  return groups.reduce((a, v, i) => {
    return a + v.length
  }, 0)
}

module.exports = { solver, name: PROBLEM_NAME }
