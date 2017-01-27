export default {
  async login (email, password, cb) {
    if (localStorage.token) {
      cb(true)
      this.onChange(true)
      return
    }

    const res = await fetch('/api/authenticate', {
      body: `email=${email}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    if (res.ok) {
      const json = await res.json()
      localStorage.token = json.data.token
      cb(true)
      this.onChange(true)
    } else {
      cb(false)
      this.onChange(false)
    }
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

  async signUp (email, username, password, cb) {
    const res = await fetch('/api/users', {
      body: `email=${email}&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    if (res.ok) {
      this.login(email, username, (success) => {
        cb(success)
      })
    } else {
      cb(false)
    }
  },

  onChange () {}
}
