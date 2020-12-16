const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = [
    'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0',
  ]
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(165)
})

it('solves the hard example', async () => {
  const TEST_DATA = [
    'mask = 000000000000000000000000000000X1001X',
    'mem[42] = 100',
    'mask = 00000000000000000000000000000000X0XX',
    'mem[26] = 1',
  ]
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe(208)
})
