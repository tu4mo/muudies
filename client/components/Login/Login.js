import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
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
      <div className="vertical-center">
        <form onSubmit={this.handleSubmit} className="box">
          <input ref="email" placeholder="email" type="email" />
          <input ref="pass" placeholder="password" type="password" />
          <div className="text-center">
            <button className="button button-orange" type="submit">Log In</button>
            <Link to="/signup" className="button button-orange">Sign Up</Link>
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
