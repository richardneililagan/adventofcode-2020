const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = ['1 + (2 * 3) + (4 * (5 + 6))']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(51)
})

// it('solves the hard example', async () => {
//   const TEST_DATA = []
//   readFileToArray.mockResolvedValue(TEST_DATA)
//
//   const answer = await solver('hard')
//   expect(answer).toBe(0)
// })
