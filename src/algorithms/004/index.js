const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 04 - Passport Processing'

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
  const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  const passports = lines.reduce(
    (a, line) => {
      if (line.trim().length === 0) return [...a, {}]

      const current = a[a.length - 1]
      line.split(' ').forEach((fragment) => {
        const [field, value] = fragment.split(':')
        current[field] = value
      })

      return a
    },
    [{}]
  )

  const VALIDATORS = [
    (p) => +p.byr >= 1920 && +p.byr <= 2002, // :: birth year
    (p) => +p.iyr >= 2010 && +p.iyr <= 2020, // :: issue year
    (p) => +p.eyr >= 2020 && +p.eyr <= 2030, // :: expiration year
    (p) => !!p.hcl.match(/^\#[0-9a-f]{6}$/), // :: hair color
    (p) => !!p.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/), // :: eye color
    (p) => !!p.pid.match(/^\d{9}$/), // :: passport ID
    (p) => {
      const match = p.hgt.match(/(?<metric>\d+)(?<unit>(cm|in))/)
      if (!match) return false

      const { metric, unit } = match.groups
      switch (unit) {
        case 'cm':
          return +metric >= 150 && +metric <= 193
        case 'in':
          return +metric >= 59 && +metric <= 76
        default:
          return false
      }
    }, // :: height
  ]

  const valids = passports
    .filter((passport) => REQUIRED_FIELDS.every((field) => !!passport[field]))
    // :: check if the fields actually have valid values
    .filter((passport) => VALIDATORS.every((validator) => validator(passport)))

  return valids.length
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
