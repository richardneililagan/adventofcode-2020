const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 18 - Operation Order'

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

// :: ---

const __value = (operand, dict) => {
  if (operand[0] !== '_') return Number(operand)
  else return __solve(dict[operand], dict)
}

const __solve = (expression, dict) => {
  const fragments = expression.split(' ').reduce(
    (a, v, i) => {
      if (i % 2) {
        a.operation = v
        return a
      } else {
        a.n =
          a.operation === '+' ? a.n + __value(v, dict) : a.n * __value(v, dict)
        return a
      }
    },
    { n: 0, operation: '+' }
  )

  return fragments.n
}

// :: ---

const __easysolver = async (lines) => {
  // :: get a (hopefully! :p) unique string
  // >> __44c1558c5878d842
  const randomkey = () =>
    `__${require('crypto').randomBytes(8).toString('hex')}`

  const MATCHER = /\([^\(\)]*\)/

  // :: ---

  return lines.reduce((a, expression) => {
    const EXPRESSIONS = {}
    for (
      let match = expression.match(MATCHER);
      match;
      match = expression.match(MATCHER)
    ) {
      const subexpression = match[0]
      const placeholder = randomkey()

      expression = expression.replace(subexpression, placeholder)
      EXPRESSIONS[placeholder] = subexpression.substr(
        1,
        subexpression.length - 2
      )
    }

    return a + __solve(expression, EXPRESSIONS)
  }, 0)
}

// :: YUCK
const __hardsolver = async (lines) => {
  // :: same algorithm, but we also perform expression aliasing for `m + n` pairs

  // :: get a (hopefully! :p) unique string
  // >> __44c1558c5878d842
  const randomkey = () =>
    `__${require('crypto').randomBytes(8).toString('hex')}`

  const PARENS_MATCHER = /\([^\(\)]*\)/
  const ADDITION_MATCHER = /[_0-9a-f]+\s\+\s[_0-9a-f]+/

  // :: ---

  return lines.reduce((a, expression) => {
    const EXPRESSIONS = {}

    // :: alias parens pairs
    for (
      let match = expression.match(PARENS_MATCHER);
      match;
      match = expression.match(PARENS_MATCHER)
    ) {
      let subexpression = match[0]
      const placeholder = randomkey()
      expression = expression.replace(subexpression, placeholder)

      // :: alias additions in the parens
      for (
        let match = subexpression.match(ADDITION_MATCHER);
        match;
        match = subexpression.match(ADDITION_MATCHER)
      ) {
        const subsubexpression = match[0]
        const placeholder = randomkey()

        subexpression = subexpression.replace(subsubexpression, placeholder)
        EXPRESSIONS[placeholder] = subsubexpression
      }

      EXPRESSIONS[placeholder] = subexpression.substr(
        1,
        subexpression.length - 2
      )
    }

    // :: alias addition pairs
    for (
      let match = expression.match(ADDITION_MATCHER);
      match;
      match = expression.match(ADDITION_MATCHER)
    ) {
      const subexpression = match[0]
      const placeholder = randomkey()

      expression = expression.replace(subexpression, placeholder)
      EXPRESSIONS[placeholder] = subexpression
    }

    return a + __solve(expression, EXPRESSIONS)
  }, 0)
}

module.exports = { solver, name: PROBLEM_NAME }
