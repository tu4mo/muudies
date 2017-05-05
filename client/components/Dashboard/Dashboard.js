import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Stats
} from '..'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import auth from '../../auth'

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

  componentWillMount () {
    if (!auth.loggedIn()) {
      this.props.history.replace('/login')
    }
  }

  componentWillUnmount () {
    document.body.style.backgroundPositionX = '50%'
  }

  render () {
    const { mood, saveButtonDisabled, saveButtonTitle } = this.state

    return [
      <Stats />,
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="slider-container">
            <h2>Rate Your Mood</h2>
            <Slider
              handle={handle}
              onChange={this.handleMoodChange}
              value={mood}
            />
          </div>
          <div className="text-center">
            <Button
              style="white animated"
              disabled={saveButtonDisabled}
              onClick={this.handleSaveClick}>
              {saveButtonTitle}
            </Button>
          </div>
        </div>
      </div>
    ]
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }
}

const handle = ({ value, dragging, index, ...restProps }) => (
  <Tooltip
    overlay={value}
    visible={dragging}
    placement="top"
    key={index}
  >
    <Handle {...restProps} />
  </Tooltip>
)

handle.propTypes = {
  dragging: PropTypes.bool,
  index: PropTypes.number,
  value: PropTypes.number
}

export default Dashboard
