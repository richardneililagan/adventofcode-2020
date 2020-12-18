const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 17 - Conway Cubes'

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
  // :: let's consider the initial 2D input across {x,y} where z = 0.
  // :: while our space is 3D, we can just keep our data structure flat ---
  //    at least for now

  const KEY = (x, y, z) => `${x}|${y}|${z}`

  // :: SPACE tracks all our Conway Cubes' activation state,
  //    where the state of a Conway Cube at {x,y,z} is at STATE[POS],
  //      and POS is the string interpolation of `x,y,z`.
  // :: TODO this will def be faster if we can keep {x,y,z} as primitive numbers somehow
  const SPACE = {}
  lines.forEach((line, y) =>
    line
      .split('')
      .forEach((char, x) => char === '#' && (SPACE[KEY(x, y, 0)] = true))
  )

  // :: coordinate map of {x,y,z} deltas where a Conway Cube exerts influence to.
  // :: >> [1,0,0], [-1,0,0], [1,1,0], ...
  const REACH = [-1, 0, 1]
  const INFLUENCE_DELTAS = REACH.reduce(
    (a, x) => [
      ...a,
      ...REACH.reduce((a, y) => [...a, ...REACH.map((z) => [x, y, z])], []),
    ],
    []
  ).filter(([x, y, z]) => !(x === 0 && y === 0 && z === 0))

  // :: perform one cycle
  const tick = () => {
    const INFLUENCE = {} // :: tracks active Conway Cube influence on any other Conway Cube
    Object.entries(SPACE)
      .filter(([, value]) => value) // :: we only wanna see active cube influence
      .forEach(([key]) => {
        const [x, y, z] = key.split('|').map(Number)

        // :: make sure we also (eventually) consider the current cube for influence
        if (INFLUENCE[key] === undefined) INFLUENCE[key] = 0

        // :: collate how many (active) cubes are exerting influence on any other cube
        INFLUENCE_DELTAS.forEach(([dx, dy, dz]) => {
          const key = KEY(x + dx, y + dy, z + dz)
          INFLUENCE[key] = (INFLUENCE[key] || 0) + 1
        })
      })

    // :: evaluate influences with the current Conway Cube activation states
    Object.entries(INFLUENCE).forEach(([key, influence]) => {
      if (SPACE[key]) {
        // :: cube is currently active
        SPACE[key] = influence === 2 || influence === 3
      } else {
        // :: cube is not currently active
        SPACE[key] = influence === 3
      }
    })
  }

  // :: run for 6 ticks
  Array(6).fill(0).forEach(tick)

  // :: then count cubes that have been left at an activated state
  return Object.values(SPACE).filter((state) => state).length
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
