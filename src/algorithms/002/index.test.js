const { solver } = require('./index')

// :: ---

const TEST_DATA = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']

jest.mock('../../helpers/files', () => ({
  getInputFile: jest.fn().mockReturnValue(''),
  readFileToArray: jest.fn().mockResolvedValue(TEST_DATA),
}))

// :: ---

it('solves the easy example', async () => {
  const answer = await solver('easy')
  expect(answer).toBe(2)
})

it('solves the hard example', async () => {
  const answer = await solver('hard')
  expect(answer).toBe(1)
})
