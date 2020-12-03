const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 03 - Toboggan Trajectory'

const solver = async (difficulty) => {
  const inputfile = getInputFile(__dirname, difficulty)
  const lines = await readFileToArray(inputfile)

  // :: make sure we don't have any blank lines
  const topography = lines.filter((line) => line.length > 0)

  switch (difficulty) {
    case 'easy':
      return await __easysolver(topography)
    case 'hard':
      return await __hardsolver(topography)
    default:
      return null
  }
}

const __easysolver = async (lines) => {
  const SLOPE = [3, 1]

  // :: generate all coordinates we need to check
  const locations = []
  for (
    let x = SLOPE[0], y = SLOPE[1];
    y < lines.length;
    x += SLOPE[0], y += SLOPE[1]
  ) {
    locations.push([x, y])
  }

  // :: gather the map features at those points
  const features = locations.map(([x, y]) => lines[y][x % lines[y].length])
  const treeCount = features.filter((f) => f === '#').length

  return treeCount
}

const __hardsolver = async (lines) => {
  // :: essentially the same algorithm,
  //    iterated across a number of slopes into a product
  const SLOPES = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  const product = SLOPES.reduce((a, [sx, sy]) => {
    const locations = []
    for (let x = sx, y = sy; y < lines.length; x += sx, y += sy)
      locations.push([x, y])

    return (
      a *
      locations
        .map(([x, y]) => lines[y][x % lines[y].length])
        .filter((f) => f === '#').length
    )
  }, 1)

  return product
}

module.exports = {
  solver,
  name: PROBLEM_NAME,
}
