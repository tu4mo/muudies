import React, { Component } from 'react'
import moment from 'moment'

import './Stats.scss'

class Stats extends Component {
  constructor (props) {
    super(props)

    this.state = {
      moods: {}
    }
  }

  componentWillMount () {
    this.getStats()
  }

  getStats () {
    fetch('/api/moods', {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      const moods = {}

      for (let mood of data) {
        moods[mood.date] = mood.mood
      }

      this.setState({ moods })
    })
  }

  renderStats () {
    const toDate = new Date()
    const fromDate = new Date()
    const lastSevenDays = []

    fromDate.setDate(fromDate.getDate() - 6)

    for (let d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
      lastSevenDays.push(new Date(d))
    }

    return lastSevenDays.map((day) => {
      const mood = this.state.moods[moment(day).format('YYYY-MM-DD')]

      return (
        <div className="stat" key={day}>
          <div className="stat__bar" style={{ height: `${mood}%`, backgroundPositionY: `${100 - mood}%` }}>
            <div className="stat__number">{mood}</div>
          </div>
          <div className="stat__title">
            <div className="stat__weekday">
              {moment(day).format('ddd')}
            </div>
            <div className="stat__date">
              {moment(day).format('D.M.')}
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className="stats">
        {this.renderStats()}
      </div>
    )
  }
}

export default Stats
