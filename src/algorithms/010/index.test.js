const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
  ]
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(220)
})

// it('solves the hard example', async () => {
//   const TEST_DATA = []
//   readFileToArray.mockResolvedValue(TEST_DATA)
//
//   const answer = await solver('hard')
//   expect(answer).toBe(0)
// })
