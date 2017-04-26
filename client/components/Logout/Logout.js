import React, { Component } from 'react'
import PropTypes from 'prop-types'
import auth from '../../auth'

class Logout extends Component {
  componentWillMount () {
    auth.logout()
    this.props.history.push('/')
  }

  render () {
    return <p>Logging out...</p>
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }
}

export default Logout
