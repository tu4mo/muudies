import React, { PropTypes } from 'react'

import './Button.scss'

const Button = (props) => {
  const { children, disabled, onClick, type, style } = props

  const classNames = ['button']

  if (style.includes('animated')) classNames.push('button--animated')
  if (style.includes('bordered')) classNames.push('button--bordered')
  if (style.includes('orange')) classNames.push('button--orange')
  if (style.includes('small')) classNames.push('button--small')
  if (style.includes('white')) classNames.push('button--white')

  return (
    <button
      disabled={disabled}
      className={classNames.join(' ')}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.string
}

export default Button
