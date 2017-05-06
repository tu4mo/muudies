import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import auth from './auth'
import asyncComponent from './asyncComponent'
import {
  Header,
  Login,
  Logout
} from './components'

import './App.scss'

class App extends Component {
  state = {
    loggedIn: auth.loggedIn()
  }

  componentDidMount () {
    auth.onChange = this.updateAuth
  }

  updateAuth = (loggedIn) => {
    this.setState({
      loggedIn
    })
  }

  render () {
    const Dashboard = asyncComponent(() => import('./components/Dashboard').then(module => module.default))
    const SignUp = asyncComponent(() => import('./components/SignUp').then(module => module.default))

    return (
      <BrowserRouter>
        <div className="app">
          <div className="app-header">
            <Header loggedIn={this.state.loggedIn} />
          </div>
          <div className="app-body">
            <Route exact path="/" render={() => (
              auth.loggedIn() ? <Dashboard /> : <Redirect to="/login" />
            )} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
