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
    document.body.style.backgroundPositionX = '0%'
  }

  render() {
    return (
      <div className="dashboard">
        <div className="slider-container">
          <Slider
            tipTransitionName="rc-slider-tooltip-zoom-down"
            onChange={this.log.bind(this)}
            defaultValue={50}
          />
        </div>
        <button className="button button-bordered" onClick={this.handleSaveClick()}>Save</button>
      </div>
    )
  }
}

export default Dashboard
