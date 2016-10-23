import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Button from '../Button/Button'

import './Header.scss'

/*
const menuItems = [
  { to: '/', label: 'Rate' },
  { to: '/stats', label: 'Stats' }
]
*/

class Header extends Component {
  constructor (props, context) {
    super(props)
  }

  renderHeaderButtons () {
    if (this.props.loggedIn) {
      return (
        <div className="header-buttons">
          <Button
            dropdown={[
              { label: 'Log Out', action: () => browserHistory.push('/logout') }
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

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired
  }
}

export default Header
