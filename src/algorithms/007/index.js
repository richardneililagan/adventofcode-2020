const { getInputFile, readFileToArray } = require('../../helpers/files')

// :: ---

const PROBLEM_NAME = 'Day 07 - Handy Haversacks'

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

const __parsebag = (record) => {
  if (record === 'no other') return null
  // :: ---

  const { num, color } = record.match(/(?<num>\d*)?\s?(?<color>.*)/).groups
  const amount = +num || 1
  return { amount, color }
}

const __easysolver = async (lines) => {
  // :: This should reduce the lines into arrays of struct [container, ...contents],
  //    where each record of a bag is a string of either 'no other' (equivalent to null)
  //    or of format 'N colorA colorB' (e.g. "3 shiny gold").
  //
  // :: e.g. an array of ['light red', '3 shiny gold', '2 dark blue'] means that
  //         a light red bag contains 3 shiny gold bags and 2 dark blue bags.
  //
  // :: e.g. an array of ['dotted black', 'no other'] means that
  //         a dotted black bag does not contain any other bags.
  const bags = lines
    .map((line) => line.split(' contain '))
    .map(([container, contents]) => [
      container,
      ...contents.replace('.', '').split(', '),
    ])
    .map((bags) => bags.map((bag) => bag.replace(/\s?bags?/i, '')))

  // :: builds the relationships between the bags
  const links = bags
    .map((bag) => bag.map(__parsebag))
    .reduce((a, [container, ...contents]) => {
      if (!a[container.color]) {
        a[container.color] = {
          color: container.color,
          parents: [],
          children: [],
        }
      }

      const __container = a[container.color]
      contents
        .filter((bag) => bag)
        .forEach((bag) => {
          if (!a[bag.color])
            a[bag.color] = { color: bag.color, parents: [], children: [] }
          __container.children.push(a[bag.color])
          a[bag.color].parents.push(__container)
        })

      return a
    }, {})

  const __recurse = (bag, set) => {
    set.add(bag.color)
    bag.parents.forEach((b) => __recurse(b, set))
  }

  const __set = new Set()
  links['shiny gold'].parents.forEach((p) => __recurse(p, __set))

  return __set.size
}

const __hardsolver = async (lines) => {
  // :: essentially the same algorithm ...
  const links = lines
    .map((line) => line.split(' contain '))
    .map(([container, contents]) => [
      container,
      ...contents.replace('.', '').split(', '),
    ])
    .map((bags) => bags.map((bag) => bag.replace(/\s?bags?/i, '')))
    .map((bag) => bag.map(__parsebag))
    .reduce((a, [container, ...contents]) => {
      if (!a[container.color]) {
        a[container.color] = {
          color: container.color,
          parents: [],
          children: [],
        }
      }

      const __container = a[container.color]
      contents
        .filter((bag) => bag)
        .forEach((bag) => {
          if (!a[bag.color]) {
            a[bag.color] = { color: bag.color, parents: [], children: [] }
          }

          // ... except we track the quantity of each bag inside the container bag
          __container.children.push([bag.amount, a[bag.color]])
          a[bag.color].parents.push(__container)
        })

      return a
    }, {})

  const __recurse = (bag) =>
    1 + // :: the bag itself, plus ...
    // :: the contents of the bags inside it
    bag.children.reduce((a, [amount, bag]) => a + amount * __recurse(bag), 0)

  return (
    // :: subtract the actual shiny gold bag from the total
    __recurse(links['shiny gold']) - 1
  )
}

module.exports = { solver, name: PROBLEM_NAME }
