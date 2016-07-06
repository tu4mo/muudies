import React, { Component } from 'react'
import { Link } from 'react-router'
import auth from '../../auth'
import Dashboard from '../Dashboard/Dashboard'
import Landing from '../Landing/Landing'
import Header from '../Header/Header'

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
      <div>
        <Header />
        {this.state.loggedIn ? <Dashboard /> : <Landing />}
        {this.props.children}
      </div>
    )
  }
}

export default App
