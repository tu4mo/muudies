import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import auth from '../../auth'
import asyncComponent from '../../asyncComponent'
import Header from '../Header'
import Login from '../Login'
import Logout from '../Logout'
import SignUp from '../SignUp'
import './App.scss'

class App extends Component {
  state = {
    loggedIn: auth.loggedIn()
  }

  updateAuth (loggedIn) {
    this.setState({
      loggedIn
    })
  }

  componentWillMount () {
    auth.onChange = this.updateAuth.bind(this)
  }

  render () {
    const Dashboard = asyncComponent(() =>
      import('../Dashboard').then(module => module.default)
    )

    return (
      <Router>
        <div className="app">
          <div className="app-header">
            <Header loggedIn={this.state.loggedIn} />
          </div>
          <div className="app-body">
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
