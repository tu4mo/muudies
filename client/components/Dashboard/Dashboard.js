import React, { Component } from 'react'
import Button from '../Button/Button'
import Stats from '../Stats/Stats'
import Slider from 'rc-slider'
import 'whatwg-fetch'

import 'rc-slider/assets/index.css'
import './Dashboard.scss'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mood: 50,
      saveButtonDisabled: false,
      saveButtonTitle: 'Save'
    }
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
                tipTransitionName="rc-slider-tooltip-zoom-down"
                onChange={this.handleMoodChange}
                value={this.state.mood}
              />
            </div>
            <p className="text-center">
              <Button
                style="white animated"
                disabled={this.state.saveButtonDisabled}
                onClick={this.handleSaveClick}>
                {this.state.saveButtonTitle}
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
