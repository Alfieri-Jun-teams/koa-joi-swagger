const convert = require('joi-to-json-schema')
const { Validator } = require('jsonschema')
const Joi = require('joi')

const v = new Validator()

const validate = async (model, json) => {
  const jsonSchema = convert(Joi.object().keys(model.requestBody.body))
  if (model.requestBody) {
    const { requestBody: { required } } = model
    jsonSchema.required = required
    const result = await v.validate(json, jsonSchema)
    if (result.errors[0]) {
      const err = new Error()
      err.status = 422
      err.message = result.errors[0].message
      err.stack = result.errors[0].stack
      throw err
    }
  }
}

class BaseController {
  constructor () {
    this.validate = validate
  }
}

module.exports = BaseController
