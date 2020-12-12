const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 12 - Rain Risk'

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

const rads = (degs) => (degs * Math.PI) / 180

const __easysolver = async (lines) => {
  let state = { x: 0, y: 0, bearing: 0 }

  const ACTIONS = {
    N: (value) => ({ ...state, y: state.y + value }),
    S: (value) => ({ ...state, y: state.y - value }),
    E: (value) => ({ ...state, x: state.x + value }),
    W: (value) => ({ ...state, x: state.x - value }),
    R: (value) => ({ ...state, bearing: state.bearing - value }),
    L: (value) => ({ ...state, bearing: state.bearing + value }),
    F: (value) => ({
      ...state,
      x: state.x + value * Math.cos(rads(state.bearing)),
      y: state.y + value * Math.sin(rads(state.bearing)),
    }),
  }

  lines
    .map((line) => {
      const { action, value } = line.match(
        /(?<action>[nsewrlf])(?<value>-?\d*)/i
      ).groups

      return { action, value: Number(value) }
    })
    .forEach(({ action, value }) => (state = ACTIONS[action](value)))

  return ~~(Math.abs(state.x) + Math.abs(state.y))
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
