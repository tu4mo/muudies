import React, { Component } from 'react'
import { Link } from 'react-router'

import './Header.scss'

class Header extends Component {
  constructor(props, context) {
    super(props)
  }

  renderHeaderButtons() {
    if (this.props.loggedIn) {
      return (
        <div className="header-buttons">
          <Link to="/logout" className="button button-bordered button-small">Log Out</Link>
        </div>
      )
    }
  }

  render() {
    const menuItems = [
      { to: '/', label: 'Rate' },
      { to: '/stats', label: 'Stats' }
    ]

    const renderedMenuItems = menuItems.map((item) => {
      return <Link to={item.to} className={'menu-item' + (this.context.router.isActive(item.to, true) ? ' menu-item-active' : '')}>{item.label}</Link>
    })

    return (
      <div>
        <header className="header">
          <h1 alt="Muudy">Muudy</h1>
          {this.renderHeaderButtons()}
        </header>
        <nav className="menu">
          {renderedMenuItems}
        </nav>
      </div>
    )
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static PropTypes = {
    loggedIn: React.PropTypes.bool.isRequired
  }
}

export default Header
