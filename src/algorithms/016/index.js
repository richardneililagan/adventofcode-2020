const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 16 - Ticket Translation'

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

const __parseRules = (lines) => {
  let curindex = 0
  let sink = []

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      curindex += 1
      i += 1
      continue
    }

    if (!sink[curindex]) sink[curindex] = []
    sink[curindex].push(lines[i])
  }

  const [rules, myTicket, nearbyTickets] = sink

  return [
    rules.map((rule) => {
      const [rulename, conditions] = rule.split(': ')
      return { rulename, conditions: conditions.split(' or ') }
    }),
    ...myTicket.map((ticket) => ticket.split(',').map(Number)),
    nearbyTickets.map((ticket) => ticket.split(',').map(Number)),
  ]
}

const __easysolver = async (lines) => {
  // :: composer function to check for validity of a number with respect to a rule
  const RULECHECK = (min, max) => (n) => n >= min && n <= max
  const [rules, , nearbyTickets] = __parseRules(lines)

  const validators = rules.reduce((a, { conditions }) => {
    return [
      ...a,
      ...conditions.map((c) => {
        const [min, max] = c.split('-')
        return RULECHECK(Number(min), Number(max))
      }),
    ]
  }, [])

  return nearbyTickets.reduce((a, ticket) => {
    const invalid = ticket.find((n) => !validators.some((v) => v(n)))
    return invalid === undefined ? a : a + invalid
  }, 0)
}

const __hardsolver = async (lines) => {
  const RULECHECK = (min, max) => (n) => n >= min && n <= max
  const [__rules, myTicket, nearbyTickets] = __parseRules(lines)

  const ticketFieldsCount = myTicket.length

  const rules = __rules.map(({ rulename, conditions }) => ({
    rulename,
    ticketFieldCandidates: Array(ticketFieldsCount).fill(true),
    conditions: conditions.map((c) => {
      const [min, max] = c.split('-')
      return RULECHECK(Number(min), Number(max))
    }),
  }))

  const validators = rules.reduce(
    (a, { conditions }) => [...a, ...conditions],
    []
  )

  const validTickets = nearbyTickets.filter((ticket) =>
    ticket.every((n) => validators.some((v) => v(n)))
  )

  // :: yuck
  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < validTickets.length; j++) {
      for (let k = 0; k < ticketFieldsCount; k++) {
        rules[i].ticketFieldCandidates[k] &= rules[i].conditions.some((c) =>
          c(validTickets[j][k])
        )
      }
    }
  }

  rules.forEach((rule) => {
    rule.specificity = rule.ticketFieldCandidates.reduce((a, v) => a + v, 0)
  })

  const FIELD_MAP = Array(ticketFieldsCount).fill(null)

  rules
    .sort((a, b) => Number(a.specificity) - Number(b.specificity))
    .forEach((rule) => {
      const fieldIndex = rule.ticketFieldCandidates.findIndex(
        (field, i) => !!field && FIELD_MAP[i] === null
      )
      FIELD_MAP[fieldIndex] = rule
      rule.fieldIndex = fieldIndex
    })

  const targetFields = rules
    .filter(({ rulename }) => rulename.startsWith('departure'))
    .map(({ fieldIndex }) => fieldIndex)

  return targetFields.reduce((a, v) => a * myTicket[v], 1)
}

module.exports = { solver, name: PROBLEM_NAME }
