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
  const state = {
    ship: { x: 0, y: 0 },
    waypoint: { x: 10, y: 1 }, // :: 10 units east, 1 unit north
  }

  const ACTIONS = {
    N: (value) => (state.waypoint.y += value),
    S: (value) => (state.waypoint.y -= value),
    E: (value) => (state.waypoint.x += value),
    W: (value) => (state.waypoint.x -= value),
    L: (value) => {
      // :: value is angle of rotation
      const __cos = Math.cos(rads(value))
      const __sin = Math.sin(rads(value))

      const { x, y } = state.waypoint
      state.waypoint.x = Math.round(x * __cos - y * __sin)
      state.waypoint.y = Math.round(x * __sin + y * __cos)
    },
    R: (value) => {
      // :: value is angle of rotation
      // :: this is clockwise, so negative rotation
      const __cos = Math.cos(rads(-value))
      const __sin = Math.sin(rads(-value))

      const { x, y } = state.waypoint
      state.waypoint.x = Math.round(x * __cos - y * __sin)
      state.waypoint.y = Math.round(x * __sin + y * __cos)
    },
    F: (value) => {
      state.ship.x += value * state.waypoint.x
      state.ship.y += value * state.waypoint.y
    },
  }

  lines
    .map((line) => {
      const { action, value } = line.match(
        /(?<action>[nsewrlf])(?<value>-?\d*)/i
      ).groups

      return { action, value: Number(value) }
    })
    .forEach(({ action, value }) => ACTIONS[action](value))

  const manhattan = Math.abs(state.ship.x) + Math.abs(state.ship.y)
  return manhattan
}

module.exports = { solver, name: PROBLEM_NAME }
