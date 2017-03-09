import React, { Component, PropTypes } from 'react'
import Button from '../Button/Button'
import Stats from '../Stats/Stats'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'

import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import './Dashboard.scss'

const Handle = Slider.Handle

class Dashboard extends Component {
  state = {
    mood: 50,
    saveButtonDisabled: false,
    saveButtonTitle: 'Save'
  }

  handleMoodChange = (value) => {
    document.body.style.backgroundPositionX = value + '%'
    this.setState({ mood: value })
  }

  handleSaveClick = async () => {
    this.setState({ saveButtonDisabled: true })

    const res = await fetch('/api/moods', {
      body: `mood=${this.state.mood}`,
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    if (res.ok) {
      this.setState({ saveButtonTitle: 'Saved' })
    } else {
      this.setState({ saveButtonTitle: 'Error' })
    }

    this.restoreSaveButtonState()
  }

  restoreSaveButtonState () {
    setTimeout(() => {
      this.setState({
        saveButtonDisabled: false,
        saveButtonTitle: 'Save'
      })
    }, 5000)
  }

  componentWillUnmount () {
    document.body.style.backgroundPositionX = '50%'
  }

  render () {
    return (
      <div>
        <Stats />
        <div className="dashboard">
          <div className="dashboard-content">
            <div className="slider-container">
              <h2>Rate Your Mood</h2>
              <Slider
                handle={handle}
                onChange={this.handleMoodChange}
                value={this.state.mood}
              />
            </div>
            <div className="text-center">
              <Button
                style="white animated"
                disabled={this.state.saveButtonDisabled}
                onClick={this.handleSaveClick}>
                {this.state.saveButtonTitle}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  )
}

handle.propTypes = {
  dragging: PropTypes.bool,
  index: PropTypes.number,
  value: PropTypes.number
}

export default Dashboard
