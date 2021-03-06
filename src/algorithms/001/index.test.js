const { solver } = require('./index')

// :: ---

const TEST_DATA = [1721, 979, 366, 299, 675, 1456]

jest.mock('../../helpers/files', () => ({
  getInputFile: jest.fn().mockReturnValue(''),
  readFileToArray: jest.fn().mockResolvedValue(TEST_DATA),
}))

// :: ---

it('solves the easy example', async () => {
  const answer = await solver('easy')
  expect(answer).toBe(514579)
})

it('solves the hard example', async () => {
  const answer = await solver('hard')
  expect(answer).toBe(241861950)
})
