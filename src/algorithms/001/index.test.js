const { solver } = require('./index')

jest.mock('../../helpers/files', () => ({
  getInputFile: jest.fn().mockReturnValue(''),
  readFileToArray: jest
    .fn()
    .mockResolvedValue([1721, 979, 366, 299, 675, 1456]),
}))

// :: ---

it('runs a test', async () => {
  const answer = await solver('test')
  expect(answer).toBe(514579)
})
