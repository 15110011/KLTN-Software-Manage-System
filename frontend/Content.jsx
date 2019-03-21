import * as React from 'react';
import { useState } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  NavLink
} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import SidebarContainer from './Sidebar/SidebarContainer'

import Logout from './auth/Logout';
import Login from './auth/Login';
import { NOT_AUTHORIZED } from './common/Code'
import { MeAPI } from './common/urls'
import { apiGet } from './common/Request'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import Breadcrumb from './components/Breadcrumb'
import USER_CONTEXT from './components/UserContext'
import Register from './auth/Register';
import Dashboard from './Dashboard/Dashboard';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    justifyContent: 'center',
    paddingTop: '65px'
  },
  appBarSpacer: theme.mixins.toolbar
});

class Content extends React.Component {
  state = {
    user: {},
    initUrl: '/'
  };

  componentWillMount() {
    this.getMe()
    if (window.location.pathname != '/login') {
      this.setState({ initUrl: window.location.pathname })
    }
  }

  getMe = () => {
    apiGet(MeAPI).then(res => {
      if (res.data.code == NOT_AUTHORIZED) {
        this.props.history.push('/logout')
      }
      else {
        this.setState({ user: res.data })
      }
    })
  }

  setUser = (user) => {
    this.setState({ user })
    if (Object.keys(user).length == 0) {
      this.props.history.push('/')
    }
  }


  render() {
    const { classes } = this.props;
    const { user, initUrl } = this.state;

    return (
      <USER_CONTEXT.Provider value={{ user, setUser: this.setUser }}>
        <div className={classes.root}>
          <CssBaseline />

          {/* {user.username &&  */}
          <SidebarContainer />
          {/* } */}
          <div className={classes.content}>
            {user.username && <div className={classes.appBarSpacer} />}
            <Switch>
              <Route
                path="/logout"
                component={props => (
                  <Logout {...props} loginURL={window.location.pathname} setUser={this.setUser} />
                )}
              />
              <Route
                path="/login"
                component={props => (
                  <Login {...props} setUser={this.setUser} user={user} initUrl={initUrl} />
                )}
              />
              <Route
                path="/register"
                component={props => (
                  <Register {...props} setUser={this.setUser} user={user} initUrl={initUrl} />
                )}
              />


              {/* {!user.username && (
                <Route path="/" component={props => <Redirect to="/login" />} />
              )} */}
              {/* {user.username && ( */}
                <React.Fragment>
                  <Route
                    path="/dashboard"
                    component={props => (
                      <Dashboard {...props} />
                    )}
                  />
                  <Route
                    path="/projects"
                    component={props => (
                      <Projects {...props} />
                    )}
                  />
                  <Route
                    path="/staffs"
                    component={props => (
                      <Staffs {...props} />
                    )}
                  />
                  <Route exact path="/" component={props => <Redirect to="/projects" />} />
                </React.Fragment>
              {/* )} */}
            </Switch>
          </div>
        </div>
      </USER_CONTEXT.Provider>
    );
  }
}

export default withStyles(styles)(withRouter(Content))
