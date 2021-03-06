#!/usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')

const { algorithms } = require('./algorithms')

// :: ---

const ALGORITHM_QUESTION = {
  type: 'list',
  name: 'algorithm',
  message: 'Which problem?',
  choices: algorithms.map((algo) => ({
    value: algo,
    name: algo.name,
  })),
}

const DIFFICULTY_QUESTION = {
  type: 'list',
  name: 'difficulty',
  message: 'Which difficulty?',
  default: 'easy',
  choices: [
    { value: 'easy', name: 'Easy' },
    { value: 'hard', name: 'Hard' },
  ],
}

// :: ---

const __run = async () => {
  console.clear()

  const { algorithm, difficulty } = await inquirer.prompt([
    ALGORITHM_QUESTION,
    DIFFICULTY_QUESTION,
  ])

  console.clear()
  console.log(chalk.yellowBright(`[${algorithm.name}]`), '\n')

  // :: initialize timer before running algorithm process
  const timer = process.hrtime()
  const answer = await algorithm.solver(difficulty)

  // :: compute in seconds
  const [seconds, nanos] = process.hrtime(timer)
  const elapsed = seconds + nanos / 1e9

  // :: outputs
  console.log(
    'Solution completed in',
    chalk.bold.greenBright(elapsed),
    'seconds.'
  )
  console.log(
    'Solution found:',
    chalk.bold.cyanBright(JSON.stringify(answer)),
    '\n'
  )
}

const __benchmark = async () => {
  console.clear()

  const { algorithm, difficulty } = await inquirer.prompt([
    ALGORITHM_QUESTION,
    DIFFICULTY_QUESTION,
  ])

  console.clear()
  console.log('Benchmarking:', chalk.yellowBright(`[${algorithm.name}]`), '\n')

  const PROFILE_LENGTH = 100
  const tasks = Array(PROFILE_LENGTH)
    .fill(0)
    .map(async () => {
      const timer = process.hrtime()
      await algorithm.solver(difficulty)

      const [seconds, nanos] = process.hrtime(timer)
      return seconds + nanos / 1e9
    })

  const times = await Promise.all(tasks)
  const p95times = [...times].slice(
    ~~((PROFILE_LENGTH * 0.1) / 2),
    times.length - ~~((PROFILE_LENGTH * 0.1) / 2)
  )

  const average = p95times.reduce((a, v) => a + v, 0) / p95times.length
  console.log(`95p average over ${times.length} runs:`, average, '\n')
}

module.exports = { run: __run, benchmark: __benchmark }
