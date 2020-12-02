const { benchmark } = require('./index')

// :: ---

const [, , ...args] = process.argv

if (args.length === 0) {
  // :: move process to CLI wizard
  benchmark().then(() => process.exit(0))
} else {
  // :: else, expect a solution number and difficulty
  const [problemId, difficulty] = args

  const { algorithms } = require('./algorithms')
  const solution = algorithms.find((algo) => algo.key === problemId)

  if (!solution) {
    // :: no solution for that yet,
    //    or problem ID not found
    console.error(`Problem ID ${problemId} was not found.`)
    process.exit(1)
  }

  const timer = process.hrtime()
  solution.solver(difficulty).then(() => {
    const [seconds, nanos] = process.hrtime(timer)
    const elapsed = seconds + nanos / 1e9
    console.log(elapsed)
    process.exit(0)
  })
}
