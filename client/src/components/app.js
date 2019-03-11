import React, { Component } from 'react';
import queryString from 'query-string'
import "../stylesheets/application.scss"
import { connect } from 'react-redux'
import { login } from '../actions/sessionActions'
import { ProtectedRoute } from '../util/routeUtil'
import { Route, Switch, withRouter } from 'react-router-dom'

import Dashboard from './dashboard'
import Landing from './landing'
import Navbar from './navbar'


import * as API from '../util/game_api_util'
class App extends Component {
  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      this.props.login(query.token)
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/dashboard" component={ Dashboard } />
          <Route path="/" component={ Landing } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  { login }
)(App))