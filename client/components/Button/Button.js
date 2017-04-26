import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

class Button extends Component {
  state = {
    dropdownVisible: false
  }

  toggleDropdown = () => {
    this.setState({ dropdownVisible: !this.state.dropdownVisible })
  }

  render () {
    const { children, disabled, dropdown, onClick, type, style } = this.props

    const classNames = ['button']

    if (style.includes('animated')) classNames.push('button--animated')
    if (style.includes('bordered')) classNames.push('button--bordered')
    if (style.includes('orange')) classNames.push('button--orange')
    if (style.includes('small')) classNames.push('button--small')
    if (style.includes('white')) classNames.push('button--white')

    return (
      <div className="button__container">
        <button
          disabled={disabled}
          className={classNames.join(' ')}
          onClick={dropdown ? this.toggleDropdown : onClick}
          type={type}
        >
          {children}
        </button>
        {this.state.dropdownVisible &&
          <div className="button__dropdown">
            <div className="button__dropdown-arrow" />
            {dropdown}
          </div>
        }
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    dropdown: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.string
  }
}

export default Button
