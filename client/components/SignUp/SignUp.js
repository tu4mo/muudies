import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '..'
import auth from '../../auth'

import './SignUp.scss'

class SignUp extends Component {
  handleSubmit = (event) => {
    event.preventDefault()

    const email = this.email.value
    const username = this.username.value
    const password = this.password.value

    auth.signUp(email, username, password, (success) => {
      if (success) {
        this.props.history.push('/')
      }
    })
  }

  render () {
    return (
      <div className="vertical-center">
        <form onSubmit={this.handleSubmit} className="box">
          <input ref={email => (this.email = email)} placeholder="email" type="email" required />
          <input ref={username => (this.username = username)} placeholder="username" type="text" required />
          <input ref={password => (this.password = password)} placeholder="password" type="password" required />
          <div className="text-center">
            <Button style="orange" type="submit">Sign Up</Button>
            <Button onClick={() => this.props.history.push('/')} style="orange">Cancel</Button>
          </div>
        </form>
      </div>
    )
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default SignUp
