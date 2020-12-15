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
  // :: ignore first line of input
  //    [busid, remainder]
  const buses = lines[1]
    .split(',')
    .map((id, i) => {
      if (id === 'x') return null
      else return [BigInt(id), BigInt(id - i)]
    })
    .filter((id) => id)

  // :: chinese remainder theorem black magic fuckery
  // :: we expect m, n to be BigInt
  const invert = (m, n) => {
    if (n === 1) return 1
    // :: ---

    let [a, b] = [m, n]
    let [x, y] = [0n, 1n]

    while (a > 1) {
      const q = a / b
      ;[a, b] = [b, a % b]
      ;[x, y] = [y - q * x, x]
    }

    return y < 0 ? y + n : y
  }

  const kproduct = buses.reduce((a, [busid]) => a * busid, 1n)
  const ksum = buses.reduce(
    (a, [busid, remainder]) =>
      a + ((remainder * kproduct) / busid) * invert(kproduct / busid, busid),
    0n
  )

  return String(ksum % kproduct) // :: ehhhhhhh.
}

module.exports = { solver, name: PROBLEM_NAME }
