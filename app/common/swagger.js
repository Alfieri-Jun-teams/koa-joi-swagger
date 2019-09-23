const Joi = require('joi')
const convert = require('joi-to-json-schema')
const _ = require('lodash')
const dir = require('dir_filenames')
const path = require('path')
const { appRoot } = require('../../config')

const parameters = (value) => {
  let content = {}
  if (value.query) {
    content.parameters = []
    const params = convert(Joi.object(value.query))
    Object.entries(params.properties).forEach((prop, v) => {
      content.parameters.push({
        name: prop,
        in: 'query',
        description: v.description,
        schema: {
          type: v.type
        },
        required: false
      })
    })
  }

  if (value.params) {
    content.parameters = []
    const params = convert(Joi.object(value.params))
    Object.entries(params.properties).forEach((prop, v) => {
      content.parameters.push({
        name: prop,
        in: 'path',
        description: v.description,
        schema: {
          type: v.type
        },
        required: true
      })
    })
  }

  if (value.requestBody) {
    const { type, properties } = convert(Joi.object(value.requestBody.body))
    content.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type,
            properties,
            required: value.requestBody.required
          }
        }
      }
    }
  }

  return content
}

const generateSwagger = (info) => {
  const items = dir(`${appRoot}/app/models`)
  _.remove(items, n => n === `${appRoot}/app/models/index.js`)
  const methods = []
  const components = {}
  components.schemas = {}
  items.forEach((item) => {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    const model = require(item)
    /* eslint-enable global-require */
    /* eslint-enable import/no-dynamic-require */
    const lowerCaseSchemaName = path.parse(item).base.replace(/\.\w+$/, '')
    const schemaName = lowerCaseSchemaName.slice(0, 1).toUpperCase() + lowerCaseSchemaName.slice(1)
    Object.entries(model).forEach(([key, value]) => {
      if (key === 'schema') {
        const modelSchema = convert(value)
        const schema = {}
        schema[schemaName] = {
          type: 'object',
          properties: modelSchema.properties
        }
        components.schemas = _.merge(components.schemas, schema)
      } else {
        const content = {
          tags: value.tags,
          summary: value.summary,
          description: value.description,
          ...parameters(value)
        }

        if (value.output) {
          const outputTemp = {}
          const resp = {}
          Object.entries(value.output).forEach(([k, v]) => {
            resp[k] = {
              description: 'response',
              content: {
                'application/json': {
                  schema: {
                    type: convert(v).type,
                    properties: convert(v).properties
                  }
                }
              }
            }
            _.merge(outputTemp, resp)
          })
          content.responses = outputTemp
        } else {
          content.responses = {
            200: {
              description: 'response success',
              content: {
                'application/json': {
                  schema: { $ref: `#/components/schemas/${schemaName}` }
                }
              }
            }
          }
        }

        const swaggerMethod = {}
        swaggerMethod[(value.method).toString()] = content

        const swaggerItem = {}
        swaggerItem[(value.path).toString()] = swaggerMethod
        methods.push(swaggerItem)
      }
    })
  })

  let mergeMethod = {}
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < methods.length; ++i) {
    mergeMethod = _.merge(mergeMethod, methods[i])
  }

  return {
    openapi: '3.0.0',
    info,
    paths: mergeMethod,
    components
  }
}

module.exports = {
  generateSwagger
}
