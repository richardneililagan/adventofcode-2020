const { solver } = require('./index')

// :: ---

const TEST_DATA = []

jst.mock('../../helpers/files', () => ({
  getInputFile: jest.fn().mockReturnValue(''),
  readFileToArray: jest.fn().mockResolvedValue(TEST_DATA),
}))

// :: ---

it('solves the easy example', async () => {
  // const answer = await solver('easy')
  // expect(answer).toBe(0)
})

it('solves the hard example', async () => {
  // const answer = await solver('hard')
  // expect(answer).toBe(0)
})
