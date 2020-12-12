const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = ['F10', 'N3', 'F7', 'R90', 'F11']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(25)
})

it('solves the hard example', async () => {
  const TEST_DATA = ['F10', 'N3', 'F7', 'R90', 'F11']
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('hard')
  expect(answer).toBe(286)
})
