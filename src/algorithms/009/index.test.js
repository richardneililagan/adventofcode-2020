const { __isValid, solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('determines a valid number correctly', () => {
  const PREAMBLE = Array(25)
    .fill(0)
    .map((v, i) => i + 1) // :: [1 .. 25]

  expect(__isValid(26, PREAMBLE)).toBe(true)
  expect(__isValid(49, PREAMBLE)).toBe(true)
  expect(__isValid(100, PREAMBLE)).toBe(false)
  expect(__isValid(50, PREAMBLE)).toBe(false)
})

it('solves the easy example', async () => {
  const TEST_DATA = [
    20,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    25,
    45,
    65,
    60,
  ]
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(65)
})

// it('solves the hard example', async () => {
//   const TEST_DATA = []
//   readFileToArray.mockResolvedValue(TEST_DATA)
//
//   const answer = await solver('hard')
//   expect(answer).toBe(0)
// })
