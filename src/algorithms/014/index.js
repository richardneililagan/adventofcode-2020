const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 14 - Docking Data'

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
  const PAD36BIT = Array(36).fill(0).join('')

  // :: [operation, argument]
  const { writes } = lines
    .map((line) => line.split(' = '))
    .map(([operation, argument]) => {
      if (operation === 'mask') return [operation, argument.split('')]
      // :: ---
      const binaryString = Number(argument).toString(2).split('').map(Number)
      const binaryPadding = Array(36 - binaryString.length).fill(0)

      return [operation, [...binaryPadding, ...binaryString]]
    })
    .reduce(
      (a, [operation, argument]) => {
        if (operation === 'mask') {
          a.mask = argument
          return a
        }
        // :: ---

        const masked = argument
          .map((n, i) => (a.mask[i] === 'X' ? n : Number(a.mask[i])))
          .join('')

        a.writes[operation] = parseInt(masked, 2)
        return a
      },
      { mask: [], writes: {} }
    )

  return Object.values(writes).reduce((a, v) => a + v, 0)
}

const __hardsolver = async (lines) => {
  const to36b = (n) => {
    const binary = Number(n).toString(2).split('').map(Number)
    const padding = Array(36 - binary.length).fill(0)
    return [...padding, ...binary]
  }

  const recurse = ([addresshead, ...addresstail], [maskhead, ...masktail]) => {
    if (addresshead === undefined) return ['']
    const resolvedtail = recurse(addresstail, masktail)

    if (Number(maskhead) === 0)
      return resolvedtail.map((tail) => addresshead + tail)
    else if (Number(maskhead) === 1)
      return resolvedtail.map((tail) => '1' + tail)
    else
      return [
        ...resolvedtail.map((tail) => '0' + tail),
        ...resolvedtail.map((tail) => '1' + tail),
      ]
  }

  const { writes } = lines
    .map((line) => line.split(' = '))
    .map(([operation, argument]) => {
      if (operation === 'mask') return [operation, argument.split('')]
      // :: ---
      return [operation, Number(argument)]
    })
    .reduce(
      (a, [operation, argument]) => {
        if (operation === 'mask') {
          a.mask = argument
          return a
        }
        // :: ---
        const { address } = operation.match(/mem\[(?<address>\d*)\]/i).groups
        const addresses = recurse(to36b(address), a.mask)
        addresses.forEach((addy) => (a.writes[addy] = argument))

        return a
      },
      { mask: [], writes: {} }
    )

  return Object.values(writes).reduce((a, v) => a + v, 0)
}

module.exports = { solver, name: PROBLEM_NAME }
