const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('calculates seat IDs correctly', () => {
  const { __getSeatId } = require('./index')

  expect(__getSeatId('BFFFBBFRRR')).toBe(567)
  expect(__getSeatId('FFFBBBFRRR')).toBe(119)
  expect(__getSeatId('BBFFBBFRLL')).toBe(820)
})

it('solves the easy example', async () => {
  const TEST_DATA = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(820)
})
