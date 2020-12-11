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
      const adjacents = DELTA_VECTORS.map(([dx, dy]) => [x - dx, y - dy])
        .filter(
          ([x, y]) =>
            x >= 0 && y >= 0 && x < lines[0].length && y < lines.length
        )
        .filter(([x, y]) => lines[y][x] === 'L')

      return char === 'L'
        ? {
            x,
            y,
            adjacents,
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
        const adjacentStates = seat.adjacents.map(
          ([x, y]) => layout[y][x].occupied
        )
        const occupieds = adjacentStates.filter((state) => state).length

        if (seat.occupied && occupieds >= 4) return [seat.x, seat.y]
        else if (!seat.occupied && occupieds === 0) return [seat.x, seat.y]
        else return null
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
  const LAYOUT_WIDTH = lines[0].length
  const LAYOUT_HEIGHT = lines.length
  const DELTA_VECTORS = [-1, 0, 1]
    .reduce((a, x) => [...a, ...[-1, 0, 1].map((y) => [x, y])], [])
    .filter(([x, y]) => !(x === 0 && y === 0))

  // :: essentially same modus operandi
  const layout = lines.map((line, y) =>
    Array(...line).map((char, x) => {
      // :: ... it just differs on how we're parsing [adjacent] seats
      if (char !== 'L') return null

      const adjacents = DELTA_VECTORS.reduce((a, [dx, dy]) => {
        let k = 1
        let [kx, ky] = [dx, dy]
        while (
          x + kx >= 0 &&
          x + kx < LAYOUT_WIDTH &&
          y + ky >= 0 &&
          y + ky < LAYOUT_HEIGHT
        ) {
          const [px, py] = [x + kx, y + ky]
          if (lines[py][px] === 'L') return [...a, [px, py]]
          // :: ---
          k += 1
          ;[kx, ky] = [dx * k, dy * k]
        }

        // :: if we reach here, we didn't find a seat in this direction
        return a
      }, [])

      return { x, y, adjacents, occupied: false }
    })
  )

  // :: parse into flat structure
  const seats = layout.reduce((a, row) => [...a, ...row.filter((s) => s)], [])

  // :: LET'S GO AGAAAAAAAAAAAIN
  const tick = () => {
    const switchingSeats = seats
      .map((seat) => {
        const povStates = seat.adjacents.map(([x, y]) => layout[y][x].occupied)
        const occupieds = povStates.filter((state) => state).length

        if (seat.occupied && occupieds >= 5) return [seat.x, seat.y]
        else if (!seat.occupied && occupieds === 0) return [seat.x, seat.y]
        else return null
      })
      .filter((seat) => seat)

    switchingSeats.forEach(([x, y]) => {
      layout[y][x].occupied = !layout[y][x].occupied
    })

    return switchingSeats.length
  }

  while (tick()) {
    // :: grab a pizza
  }

  return seats.filter((seat) => seat.occupied).length
}

module.exports = { solver, name: PROBLEM_NAME }
