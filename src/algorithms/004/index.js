const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 04 - Passport Processing'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  // :: TODO prepare input

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
  const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  const passports = lines.reduce(
    (a, line) => {
      // :: if we encounted a blank line, prep a new document struct
      if (line.trim().length === 0) return [...a, []]

      // :: get each line's declared fields, and trash the value
      const fragments = line
        .split(' ')
        .map((fragment) => fragment.split(':')[0])

      // :: ... aaaaaand collect
      a[a.length - 1].push(...fragments)
      return a
    },
    [[]]
  )

  // :: then just run each passport's fields through validation ---
  //    each of the required fields should be accounted for
  const valids = passports.filter((passport) =>
    REQUIRED_FIELDS.every((field) => passport.includes(field))
  )

  return valids.length
}

const __hardsolver = async (lines) => {
  // :: TODO
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
