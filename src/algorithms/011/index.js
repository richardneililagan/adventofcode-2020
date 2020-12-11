const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 11 - Seating System'

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

const __easysolver = async (lines) => {
  const DELTA_VECTORS = [-1, 0, 1]
    .reduce((a, x) => [...a, ...[-1, 0, 1].map((y) => [x, y])], [])
    .filter(([x, y]) => !(x === 0 && y === 0))

  // :: parse into the seat layout
  const layout = lines.map((line, y) => {
    return Array(...line).map((char, x) => {
      return char === 'L'
        ? {
            x,
            y,
            adjacents: DELTA_VECTORS.map(([dx, dy]) => [x - dx, y - dy]).filter(
              ([x, y]) =>
                x >= 0 && y >= 0 && x < lines[0].length && y < lines.length
            ),
            occupied: false,
          }
        : null
    })
  })

  // :: parse into flat structure
  const seats = layout.reduce(
    (a, row) => [...a, ...row.filter((seat) => seat)],
    []
  )

  // :: LET'S GOOOOOOOOOO
  const tick = () => {
    const switchingSeats = seats
      .map((seat) => {
        const adjacentStates = seat.adjacents
          .map(([x, y]) => layout[y][x])
          .filter((pos) => pos) // :: remove floor tiles
          .map((seat) => seat.occupied)

        if (
          seat.occupied &&
          adjacentStates.filter((state) => state).length >= 4
        ) {
          return [seat.x, seat.y]
        } else if (
          !seat.occupied &&
          adjacentStates.filter((state) => state).length === 0
        ) {
          return [seat.x, seat.y]
        } else {
          return null
        }
      })
      .filter((seat) => seat)

    switchingSeats.forEach(([x, y]) => {
      layout[y][x].occupied = !layout[y][x].occupied
    })

    return switchingSeats.length
  }

  while (tick()) {
    // :: grab a coffee
  }

  return seats.filter((seat) => seat.occupied).length
}

const __hardsolver = async (lines) => {
  //
}

module.exports = { solver, name: PROBLEM_NAME }
