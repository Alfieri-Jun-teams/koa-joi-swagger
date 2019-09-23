const _ = require('lodash')
const development = require('./default.config')
const release = require('./release.config')
const production = require('./prod.config')

const env = process.env.NODE_ENV || 'development'
const configs = {
  development,
  production,
  release
}
const defaultConfig = {
  env,
  appRoot: process.env.PWD
}
const config = _.merge(defaultConfig, configs[env])

module.exports = config
