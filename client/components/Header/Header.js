import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '..'
import './Header.scss'

class Header extends Component {
  renderHeaderButtons () {
    const accountDropdown = <Link to="/logout" className="button__dropdown-item">Log Out</Link>

    if (this.props.loggedIn) {
      return (
        <div className="header-buttons">
          <Button
            dropdown={accountDropdown}
            style="bordered small"
          >
            Account
          </Button>
        </div>
      )
    }
  }

  render () {
    return (
      <header className="header">
        <h1 className="header-logo"><Link to="/">Muudy</Link></h1>
        {this.renderHeaderButtons()}
      </header>
    )
  }

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
  }
}

export default Header
