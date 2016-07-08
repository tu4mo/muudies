import React, { Component } from 'react'
import { Link } from 'react-router'

import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  renderHeaderButtons() {
    if (this.props.loggedIn) {
      return (
        <div className="header-buttons">
          <Link to="/logout" className="button button-white button-small">Log Out</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <header className="header">
        <h1 alt="Muudy">Muudy</h1>
        {this.renderHeaderButtons()}
      </header>
    )
  }

  static PropTypes = {
    loggedIn: React.PropTypes.bool.isRequired
  }
}

export default Header
