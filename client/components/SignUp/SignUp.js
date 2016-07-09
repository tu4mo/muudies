import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import auth from '../../auth'
import './SignUp.scss'

class SignUp extends Component {
  constructor(props, context) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const username = this.refs.username.value
    const password = this.refs.password.value

    auth.signUp(email, username, password, (success) => {
      if (success) {
        this.context.router.push('/')
      }
    })
  }

  render() {
    return (
      <div className="vertical-center">
        <form onSubmit={this.handleSubmit} className="box">
          <input ref="email" placeholder="email" type="email" required />
          <input ref="username" placeholder="username" type="text" required />
          <input ref="password" placeholder="password" type="password" required />
          <div className="text-center">
            <button className="button button-orange" type="submit">Sign Up</button>
            <Link to="/" className="button button-orange">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
}

export default SignUp
