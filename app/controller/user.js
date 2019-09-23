const model = require('../models')
const BaseController = require('../common/baseController')
const service = require('../services')

class UserController extends BaseController {
  // eslint-disable-next-line class-methods-use-this
  async index (ctx) {
    const params = ctx.query
    ctx.body = await service.user.index(params)
  }

  async create (ctx) {
    const params = ctx.request.body
    await super.validate(model.user.create, params)
    ctx.body = await service.user.create(params)
  }

  // eslint-disable-next-line class-methods-use-this
  async show (ctx) {
    const { params } = ctx
    ctx.body = await service.user.show(params)
  }

  // eslint-disable-next-line class-methods-use-this
  async update (ctx) {
    const params = Object.assign(ctx.params, ctx.request.body)
    ctx.body = await service.user.update(params)
  }

  // eslint-disable-next-line class-methods-use-this
  async destroy (ctx) {
    const { params } = ctx
    ctx.body = await service.user.destroy(params)
  }
}

const user = new UserController()
module.exports = user
