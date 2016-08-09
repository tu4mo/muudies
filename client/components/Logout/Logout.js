import React, { Component, PropTypes } from 'react'
import auth from '../../auth'

class Logout extends Component {
  constructor (props, context) {
    super(props)
  }

  componentWillMount () {
    auth.logout()
    this.context.router.push('/')
  }

  render () {
    return <p>Logging out...</p>
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
}

export default Logout
