import React, { Component } from 'react'
import Slider from 'rc-slider'
import { Link } from 'react-router'

const style = {width: 600, height: 400, marginBottom: 160, marginLeft: 50, margin: '50px auto'}
const parentStyle = {overflow: 'hidden'}

import 'rc-slider/assets/index.css'
import './Dashboard.scss'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  log(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <div style={style}>
          <Slider
            tipTransitionName="rc-slider-tooltip-zoom-down"
            onChange={this.log.bind(this)}
          />
        </div>
        <Link to="/logout">Log Out</Link>
      </div>
    )
  }
}

export default Dashboard
