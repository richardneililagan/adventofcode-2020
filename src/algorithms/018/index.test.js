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

it('solves the hard example 01', async () => {
  const TEST_DATA = ['2 * 3 + (4 * 5)']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe(46)
})

it('solves the hard example 02', async () => {
  const TEST_DATA = ['1 + 2 * 3 + 4 * 5 + 6']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe(231)
})

it('solves the hard example 03', async () => {
  const TEST_DATA = ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe(23340)
})
