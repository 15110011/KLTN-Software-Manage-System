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
import { NOT_AUTHORIZED, BAD_REQUEST } from './common/Code'
import { MeAPI, REFRESH_TOKEN_URL, GMAIL_AUTH_URL } from './common/urls'
import { apiGet, apiPost } from './common/Request'
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './common/Utils'
import USER_CONTEXT from './components/UserContext'
import Register from './auth/Register';
import Dashboard from './Dashboard/DashboardContainer';
import ProductsContainer from './Products/ProductsContainer';
import ContactContainer from './Contacts/ContactsContainer';
import { ObjectFlags } from 'typescript';
import CampaignContainer from './Campaigns/CampaignsContainer';
import MarketingPlanContainer from './MarketingPlan/MarketingPlanContainer';
import FollowUpPlanContainer from './FollowUpPlan/FollowUpPlanContainer'
import SiteAdminContainer from './SiteAdmin/SiteAdminContainer';
import CategoryContainer from './Category/CategoryContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#fff',
    minHeight: '100vh',
    height: 'auto'
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: '65px'
  },
  appBarSpacer: theme.mixins.toolbar
});

class Content extends React.Component {
  state = {
    user: {
      profile: {
        is_manager: false
      }
    },
    login: Boolean(localStorage.getItem('token')),
    initUrl: window.location.pathname == '/register' || window.location.pathname == '/login' ? '/dashboard' : window.location.pathname,
    readyGmail: false,

  };

  componentWillMount() {
    this.getMe()
    // if(gapi)
    // gapi.client.init({
    //   apiKey: API_KEY,
    //   clientId: CLIENT_ID,
    //   discoveryDocs: DISCOVERY_DOCS,
    //   scope: SCOPES
    // })
    // if (window.location.pathname != '/login') {
    //   this.setState({ initUrl:  })
    // }
  }

  componentDidMount() {
    function initGoogle(func) {

      window.gapi.load('client:auth2', function () {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,

        }).then(func)
      });
    }
    const googleLoadTimer = setInterval(() => {
      window.loadingStatus = 'INIT'
      if (window.gapi) {
        window.loadingStatus = 'LOADING'
        clearInterval(googleLoadTimer);
        initGoogle(() => {
          window.loadingStatus = 'LOADED'
          this.setState({ readyGmail: true })
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          const status = gapi.auth2.getAuthInstance()
          if (status) { updateSigninStatus(status.isSignedIn.get()) }
          else {
            updateSigninStatus(false)
          }

        });
      }
    }, 90);


    function updateSigninStatus(status) {
      if (status) {
        // apiPost(GMAIL_AUTH_URL, { access_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token }, false, true).then(res => {
        //   console.log(res)
        // })
      }
      else {
        //Delete this later
        // gapi.auth2.getAuthInstance().signIn().then(res => {
        // })
        window.gapi.auth2.getAuthInstance().grantOfflineAccess()
          .then((res) => {
            console.log(res)
            apiPost(GMAIL_AUTH_URL, { code: res.code }, false, true).then(res => {
              console.log(res)
            })
          });
      }
    }

  }



  refreshToken = () => {
    apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
      if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
        this.props.history.push('/logout')
      }
      else {
        localStorage.setItem("token", res.data.access)
        this.getMe()
      }

    })
  }

  getMe = () => {
    apiGet(MeAPI, true).then(res => {
      if (res.data.code == "token_not_valid") {
        this.refreshToken()
      }
      else if (res.data.code == NOT_AUTHORIZED) {
        const { initUrl } = this.state
        // if (window.location.pathname != '/register' && window.location.pathname != '/login') {
        this.props.history.push('/logout')
        // }

      }
      else {
        this.setState({ user: res.data })
      }
    })
  }

  setUser = (user) => {
    this.setState({ user })
    // if (Object.keys(user).length == 0) {
    // this.props.history.push('/')
    // }
  }

  setLogin = (status) => {
    this.setState({ login: status })
  }


  render() {
    const { classes } = this.props;
    const { user, initUrl, login, readyGmail } = this.state;

    return (
      <USER_CONTEXT.Provider value={{ user }}>
        <div className={classes.root}>
          <CssBaseline />

          {login && <SidebarContainer />}
          <div className={classes.content}>
            {/* {login && <div className={classes.appBarSpacer} />} */}
            <Switch>
              <Route
                path="/logout"
                component={props => (
                  <Logout {...props} setLogin={this.setLogin} loginURL={window.location.pathname} setUser={this.setUser} initUrl={initUrl} />
                )}
              />

              {!login && !user.username && <Switch>

                <Route
                  path="/register"
                  component={props => (
                    <Register {...props} setLogin={this.setLogin} setUser={this.setUser} user={user} initUrl={initUrl} />
                  )}
                />
                <Route
                  path="/login"
                  component={props => (
                    <Login {...props} setLogin={this.setLogin} setUser={this.setUser} user={user} initUrl={initUrl} />
                  )}
                />
                <Route path="/" component={props => {
                  return <Redirect to="/login" />
                }} />

              </Switch>}
              )}
            </Switch>

            {login && user.username && readyGmail &&
              <Switch>
                <Route
                  path="/dashboard"
                  component={Dashboard}
                />
                <Route
                  path="/products"
                  component={props => <ProductsContainer {...props} user={user} />}
                />
                <Route
                  path="/contacts"
                  component={ContactContainer}
                />
                <Route
                  path="/product-categories"
                  component={props => <CategoryContainer {...props} user={user} />}
                />
                <Route
                  path="/campaigns"
                  component={props => <CampaignContainer {...props} user={user} />}
                />
                <Route
                  path="/marketing-plans"
                  component={props => <MarketingPlanContainer {...props} user={user} />}
                />
                <Route
                  path="/follow-up-plans"
                  component={props => <FollowUpPlanContainer {...props} user={user} />}
                />
                <Route
                  path="/settings"
                  component={SiteAdminContainer}
                />
                <Route path='/' component={props => {
                  return <Redirect to={'/dashboard'} />
                }} />
              </Switch>
            }
          </div>
        </div>
      </USER_CONTEXT.Provider>
    );
  }
}

export default withStyles(styles)(withRouter(Content))
