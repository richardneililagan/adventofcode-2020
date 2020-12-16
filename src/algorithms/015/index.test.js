const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  readFileToArray.mockResolvedValue(['0,3,6'])
  let answer = await solver('easy')
  expect(answer).toBe(436)

  readFileToArray.mockResolvedValue(['1,3,2'])
  answer = await solver('easy')
  expect(answer).toBe(1)

  readFileToArray.mockResolvedValue(['2,1,3'])
  answer = await solver('easy')
  expect(answer).toBe(10)

  readFileToArray.mockResolvedValue(['1,2,3'])
  answer = await solver('easy')
  expect(answer).toBe(27)

  readFileToArray.mockResolvedValue(['2,3,1'])
  answer = await solver('easy')
  expect(answer).toBe(78)

  readFileToArray.mockResolvedValue(['3,2,1'])
  answer = await solver('easy')
  expect(answer).toBe(438)

  readFileToArray.mockResolvedValue(['3,1,2'])
  answer = await solver('easy')
  expect(answer).toBe(1836)
})

// it('solves the hard example', async () => {
//   const TEST_DATA = []
//   readFileToArray.mockResolvedValue(TEST_DATA)
//
//   const answer = await solver('hard')
//   expect(answer).toBe(0)
// })
