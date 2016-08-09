import 'whatwg-fetch'

module.exports = {
  login (email, password, cb) {
    if (localStorage.token) {
      cb(true)
      this.onChange(true)
      return
    }

    fetch('/api/authenticate', {
      body: `email=${email}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          localStorage.token = json.data.token
          cb(true)
          this.onChange(true)
        })
      } else {
        cb(false)
        this.onChange(false)
      }
    })
    .catch((err) => {
      cb(false)
      this.onChange(false)
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  signUp (email, username, password, cb) {
    fetch('/api/users', {
      body: `email=${email}&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
    .then((res) => {
      if (res.ok) {
        this.login(email, username, (success) => {
          cb(success)
        })
      } else {
        cb(false)
      }
    })
    .catch((err) => {
      cb(false)
    })
  },

  onChange () {}
}
