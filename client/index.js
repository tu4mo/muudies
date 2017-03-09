import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import auth from './auth'
import App from './components/App/App'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import SignUp from './components/SignUp/SignUp'
import Stats from './components/Stats/Stats'

import './styles/base.scss'

function requireAuth (nextState, replace) {
  if (!auth.loggedIn()) {
    replace('/login')
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          import('./components/Dashboard/Dashboard').then(Dashboard => {
            cb(null, Dashboard.default)
          }).catch(err => {
            console.log('Failed to load Dashboard', err)
          })
        }}
        onEnter={requireAuth}
      />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={SignUp} />
      <Route path="stats" component={Stats} onEnter={requireAuth} />
    </Route>
  </Router>,
  document.getElementById('root')
)
