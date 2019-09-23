const { appRoot } = require('../config')

const files = [
  {
    name: 'context',
    path: `${appRoot}/app/common/context.js`
  },
  {
    name: 'router',
    path: `${appRoot}/app/routes/index.js`
  }
]

files.forEach((item) => {
  /* eslint-disable import/no-dynamic-require */
  /* eslint-disable global-require */
  exports[item.name] = require(`${item.path}`)
  /* eslint-enable global-require */
  /* eslint-enable import/no-dynamic-require */
})
