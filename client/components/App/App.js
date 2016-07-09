import React, { Component } from 'react'
import { Link } from 'react-router'
import auth from '../../auth'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import Header from '../Header/Header'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: auth.loggedIn()
    }
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <Header loggedIn={this.state.loggedIn} />
        </div>
        <div className="app-body">
          {!this.props.children ? (this.state.loggedIn ? <Dashboard /> : <Login />) : this.props.children}
        </div>
      </div>
    )
  }
}

export default App
