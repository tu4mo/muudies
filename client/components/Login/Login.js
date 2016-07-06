import React, { Component, PropTypes } from 'react'
import auth from '../../auth'

class Login extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: true })
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        <label>
          <input ref="email" placeholder="email" type="email" />
        </label>
        <label>
          <input ref="pass" placeholder="password" type="password" />
        </label>
        <button type="submit">Log In</button>
        {this.state.error && (<p>Bad login information</p>)}
      </form>
    )
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
}

export default Login
