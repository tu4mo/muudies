import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import auth from './auth'
import App from './components/App/App'
import Logout from './components/Logout/Logout'
import SignUp from './components/SignUp/SignUp'
import Stats from './components/Stats/Stats'
import './styles/base.scss'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace('/')
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="logout" component={Logout} />
      <Route path="signup" component={SignUp} />
      <Route path="stats" component={Stats} onEnter={requireAuth} />
    </Route>
  </Router>,
  document.getElementById('root')
)
