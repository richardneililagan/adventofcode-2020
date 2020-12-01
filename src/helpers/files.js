const path = require('path')
const fs = require('fs')
const readline = require('readline')

// :: ---

const getInputFile = (dirname, difficulty) => {
  return path.join(dirname, `input.${difficulty}.txt`)
}

/**
 * Reads the contents of a file and buffers each line into a 1D array.
 * @param {string} filepath Absolute path to file to read.
 */
const readFileToArray = (filepath) => {
  const filestream = fs.createReadStream(filepath)
  const crawler = readline.createInterface({
    input: filestream,
    terminal: false,
    console: false,
  })

  return new Promise((resolve) => {
    const lines = []

    crawler.on('line', (line) => lines.push(line))
    crawler.on('close', () => resolve(lines))
  })
}

module.exports = { getInputFile, readFileToArray }
