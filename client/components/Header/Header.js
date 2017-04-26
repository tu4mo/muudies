import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './Header.scss'

/*
const menuItems = [
  { to: '/', label: 'Rate' },
  { to: '/stats', label: 'Stats' }
]
*/

class Header extends Component {
  renderHeaderButtons () {
    if (this.props.loggedIn) {
      return (
        <div className="header-buttons">
          <Button
            dropdown={[
              { label: 'Log Out', action: () => this.props.history.push('/logout') }
            ]}
            style="bordered small"
          >
            Account
          </Button>
        </div>
      )
    }
  }

  render () {
    /*
    const renderedMenuItems = menuItems.map((item) => {
      return <Link key={item.to} to={item.to} className={'menu-item' + (this.context.router.isActive(item.to, true) ? ' menu-item-active' : '')}>{item.label}</Link>
    })
    */

    return (
      <div>
        <header className="header">
          <h1 alt="Muudy">Muudy</h1>
          {this.renderHeaderButtons()}
        </header>
        {/* this.props.loggedIn && <nav className="menu">{renderedMenuItems}</nav> */}
      </div>
    )
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
  }
}

export default Header
