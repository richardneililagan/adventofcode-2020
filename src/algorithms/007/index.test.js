const { solver } = require('./index')

// :: ---

jest.mock('../../helpers/files')
const { readFileToArray } = require('../../helpers/files')

beforeEach(() => {
  readFileToArray.mockReset()
})

it('solves the easy example', async () => {
  const TEST_DATA = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.split('\n')
  readFileToArray.mockResolvedValue(TEST_DATA)

  const answer = await solver('easy')
  expect(answer).toBe(4)
})

// it('solves the hard example', async () => {
//   const TEST_DATA = []
//   readFileToArray.mockResolvedValue(TEST_DATA)
//
//   const answer = await solver('hard')
//   expect(answer).toBe(0)
// })
