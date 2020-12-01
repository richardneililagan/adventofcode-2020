const path = require('path')
const { readdirSync } = require('fs')

// :: ---

// :: get all algorithms available
const algorithms = readdirSync(__dirname, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((directory) => directory.name)
  .map((directoryname) => {
    const modulePath = path.join(__dirname, directoryname)

    // :: { solver, name }
    return { ...require(modulePath), key: directoryname }
  })

module.exports = { algorithms }
