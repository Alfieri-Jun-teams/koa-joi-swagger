const ISADMIN = Symbol('Context#isAdmin')

module.exports = {
  isAdmin: {
    get () {
      if (this[ISADMIN] === undefined && this.session.account) {
        this[ISADMIN] = this.session.account.user_type === 'admin'
      }
      return this[ISADMIN]
    }
  }
}
