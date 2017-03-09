import React, { Component, PropTypes } from 'react'
import auth from '../../auth'
import Header from '../Header/Header'
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
    return (
      <div className="app">
        <div className="app-header">
          <Header loggedIn={this.state.loggedIn} />
        </div>
        <div className="app-body">
          {this.props.children}
        </div>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.node
  }
}

export default App
