import React, { Component } from 'react'
import Slider from 'rc-slider'
import { Link } from 'react-router'

import 'rc-slider/assets/index.css'
import './Dashboard.scss'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  handleSaveClick() {

  }

  log(value) {
    document.body.style.backgroundPositionX = value + '%'
    console.log(value);
  }

  componentWillUnmount() {
    document.body.style.backgroundPositionX = '50%'
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-content">
          <div className="slider-container">
            <h2>Rate Your Mood</h2>
            <Slider
              tipTransitionName="rc-slider-tooltip-zoom-down"
              onChange={this.log.bind(this)}
              defaultValue={50}
            />
          </div>
          <p className="text-center">
            <button className="button button-white" onClick={this.handleSaveClick()}>Save</button>
          </p>
        </div>
      </div>
    )
  }
}

export default Dashboard
