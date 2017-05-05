import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '..'
import auth from '../../auth'

import './Login.scss'

class Login extends Component {
  state = {
    error: false
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const email = this.email.value
    const password = this.password.value

    auth.login(email, password, (loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: true })
      } else {
        this.props.history.push('/')
      }
    })
  }

  render () {
    return (
      <div className="login-box-container vertical-center">
        <form onSubmit={this.handleSubmit} className="box login-box-animation">
          <input ref={email => (this.email = email)} placeholder="email" type="email" required />
          <input ref={password => (this.password = password)} placeholder="password" type="password" required />
          <div className="text-center">
            <Button style="orange" type="submit">Log In</Button>
            <Button style="orange" onClick={() => this.props.history.push('/signup')}>Sign Up</Button>
          </div>
          {this.state.error && (<p className="error">Invalid username or password</p>)}
        </form>
      </div>
    )
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default Login
