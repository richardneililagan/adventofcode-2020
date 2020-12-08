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

// :: this generator function will yield accumulator values
//    until either an infinite loop is detected,
//    or if it attempts to execute after the last instruction in the list.
const __interpreter = function* (__instructions) {
  const instructions = __instructions.map((line) => {
    const [operation, __arg] = line.split(' ')
    return { operation, argument: Number(__arg), executed: false }
  })

  // :: ---

  let acc = 0
  let cur = 0

  while (true) {
    if (cur > instructions.length - 1) return yield true // :: program end
    const instruction = instructions[cur]
    const { operation, argument, executed } = instruction

    if (executed) return yield false // :: encountered a repeated instruction
    instruction.executed = true

    switch (operation) {
      case 'acc':
        acc += argument
        cur += 1
        break
      case 'jmp':
        cur += argument
        break
      case 'nop': // :: fallthrough
      default:
        cur += 1
    }

    yield acc
  }
}

const __easysolver = async (lines) => {
  // :: let the interpreter run in its entirety
  const results = [...__interpreter(lines)]
  return results[results.length - 2]
}

const __hardsolver = async (lines) => {
  // :: get the lines with `jmp` or `nop` instructions
  const candidateLineNumbers = lines
    .map((line, i) => [line, i])
    .filter(([line]) => line.match(/^(nop|jmp)/i))
    .map(([, i]) => i)

  // :: fun brute-force method :p
  for (let i = 0; i < candidateLineNumbers.length; i++) {
    // :: switch the instruction on the corresponding linenumber
    const linenumber = candidateLineNumbers[i]
    const instructions = [...lines]
    const instruction = instructions[linenumber]

    instructions[linenumber] = instruction.match(/^nop/i)
      ? instruction.replace('nop', 'jmp')
      : instruction.replace('jmp', 'nop')
    // :: ---

    const results = [...__interpreter(instructions)]
    const isValid = results[results.length - 1]
    if (isValid) return results[results.length - 2]
  }

  // :: we shouldn't reach this point
  //    if we did stuff right :p
  return null
}

module.exports = { solver, name: PROBLEM_NAME }
