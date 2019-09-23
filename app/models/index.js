const path = require('path')
const fs = require('fs')
const { appRoot } = require('../../config')

const dir = path.resolve(`${appRoot}/app/models/`)
fs.readdirSync(dir).forEach((file) => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const name = file.replace('.js', '')
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    exports[name] = require(`./${file}`)
    /* eslint-enable global-require */
    /* eslint-enable import/no-dynamic-require */
  }
})
