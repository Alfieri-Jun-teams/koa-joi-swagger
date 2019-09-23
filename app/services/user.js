class UserService {
  // eslint-disable-next-line class-methods-use-this
  async index (params) {
    // console.log('-------->', params)
    return 'Hello'
  }

  // eslint-disable-next-line class-methods-use-this
  async create (params) {
    // console.log('-------->', params)
    return 'world'
  }

  // eslint-disable-next-line class-methods-use-this
  async show (params) {
    // console.log('-------->', params)
    return 'Hello'
  }

  // eslint-disable-next-line class-methods-use-this
  async update (params) {
    // console.log('-------->', params)
    return 'world'
  }

  // eslint-disable-next-line class-methods-use-this
  async destroy (params) {
    // console.log('-------->', params)
    return 'Hello'
  }
}

const user = new UserService()
module.exports = user
