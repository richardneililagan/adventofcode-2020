const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 08 - Handheld Halting'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  switch (difficulty) {
    case 'easy':
      return await __easysolver(lines)
    case 'hard':
      return await __hardsolver(lines)
    default:
      return null
  }
}

const __easysolver = async (lines) => {
  // :: this generator function will yield accumulator values
  //    until an infinite loop is detected
  const interpreter = function* (__instructions) {
    const instructions = __instructions.map((line) => {
      const [operation, __arg] = line.split(' ')
      return { operation, argument: Number(__arg), executed: false }
    })

    let accumulator = 0
    let currentInstruction = 0

    while (true) {
      const instruction = instructions[currentInstruction]
      const { operation, argument, executed } = instruction
      if (executed) break // :: break the loop if this has already been executed

      // :: mark this instruction as having already been run
      instruction.executed = true

      switch (operation) {
        case 'acc':
          accumulator += argument
          currentInstruction += 1
          break
        case 'jmp':
          currentInstruction += argument
          break
        case 'nop':
        // :: fallthrough
        default:
          // :: a bit pessimistic here --- if the operation does not match any
          //    known operation, then the operation is treated as a `nop`.
          currentInstruction += 1
          break
      }

      yield accumulator
    }
  }

  // :: let the interpreter run in its entirety
  const results = [...interpreter(lines)]
  return results[results.length - 1]
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
