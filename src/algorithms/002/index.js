const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 02 - Password Philosophy'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  // :: TODO prepare the data

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
  const parser = new RegExp(
    [
      '(?<min>\\d*)', // :: match the first number
      '-', // :: hyphen
      '(?<max>\\d*)', // :: match the second number
      '\\s+', // :: match whitespace before the character requirement
      '(?<char>[\\S])', // :: get exactly one character requirement
      '\\s*:\\s+', // :: whitespace and the colon
      '(?<password>\\S*)', // :: get the entire password
    ].join('')
  )

  const valid = lines.reduce((a, line) => {
    // :: thank god for destructuring
    const { min, max, char, password } = line.match(parser).groups

    // :: gather all the glyphs in the password that match the char in question
    const discriminants = password.split('').filter((glyph) => glyph === char)

    return (
      // :: and just make sure the matching glyph count is within bounds
      a + (discriminants.length >= +min && discriminants.length <= +max ? 1 : 0)
    )
  }, 0)

  return valid
}

const __hardsolver = async (lines) => {
  const parser = new RegExp(
    [
      '(?<posa>\\d*)', // :: match the first number
      '-', // :: hyphen
      '(?<posb>\\d*)', // :: match the second number
      '\\s+', // :: match whitespace before the character requirement
      '(?<char>[\\S])', // :: get exactly one character requirement
      '\\s*:\\s+', // :: whitespace and the colon
      '(?<password>\\S*)', // :: get the entire password
    ].join('')
  )

  const valid = lines.reduce((a, line) => {
    const { posa, posb, char, password } = line.match(parser).groups
    const glyphs = password.split('')

    // :: evil 1-indexed arrays
    const [__a, __b] = [glyphs[+posa - 1], glyphs[+posb - 1]]

    // :: the character cannot be in BOTH places in the password
    return a + ((__a === char) ^ (__b === char) ? 1 : 0)
  }, 0)

  return valid
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
