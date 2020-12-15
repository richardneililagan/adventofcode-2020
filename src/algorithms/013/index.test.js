const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = ['939', '7,13,x,x,59,x,31,19']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(295)
})

it('solves the hard example', async () => {
  const TEST_DATA = ['939', '7,13,x,x,59,x,31,19']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe('1068781')
})
