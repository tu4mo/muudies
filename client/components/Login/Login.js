import React, { Component, PropTypes } from 'react'
import auth from '../../auth'
import './Login.scss'

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
      <form onSubmit={this.handleSubmit} className="login">
        <input ref="email" placeholder="email" type="email" />
        <input ref="pass" placeholder="password" type="password" />
        <div className="text-center">
          <button className="button button-orange" type="submit">Log In</button>
        </div>
        {this.state.error && (<p className="error">Invalid username or password</p>)}
      </form>
    )
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
}

export default Login
