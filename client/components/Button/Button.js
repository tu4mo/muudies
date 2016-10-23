import React, { Component, PropTypes } from 'react'

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
        {this.state.dropdownVisible && dropdown.map(item => (
          <ul className="button__dropdown" key={item.label}>
            <li className="button__dropdown-item" onClick={item.action}>{item.label}</li>
          </ul>
        ))}
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    dropdown: PropTypes.array,
    onClick: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.string
  }
}

export default Button
