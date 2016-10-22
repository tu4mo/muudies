import React, { Component, PropTypes } from 'react'
import Button from '../Button/Button'
import { browserHistory } from 'react-router'
import auth from '../../auth'

import './Login.scss'

class Login extends Component {
  constructor (props, context) {
    super(props)

    this.state = {
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: true })
      }
    })
  }

  render () {
    return (
      <div className="login-box-container vertical-center">
        <form onSubmit={this.handleSubmit} className="box login-box-animation">
          <input ref="email" placeholder="email" type="email" required />
          <input ref="pass" placeholder="password" type="password" required />
          <div className="text-center">
            <Button style="orange" type="submit">Log In</Button>
            <Button style="orange" onClick={() => browserHistory.push('/signup')}>Sign Up</Button>
          </div>
          {this.state.error && (<p className="error">Invalid username or password</p>)}
        </form>
      </div>
    )
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
}

export default Login
