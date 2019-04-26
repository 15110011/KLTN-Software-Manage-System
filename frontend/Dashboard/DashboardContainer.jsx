import * as React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  NavLink
} from 'react-router-dom';
import { Paper } from '@material-ui/core'

import USERCONTEXT from '../components/UserContext'
import SalerepDashboard from './Salerep'
import ManagerDashboard from './Manager'

function Dashboard(props) {


  return (
      <USERCONTEXT.Consumer>
        {({ user }) => (
          <>
          <Paper className="d-flex justify-content-between" style={{
              padding: '11px 72px',
              marginBottom: '10px',
              marginTop: 10,
              backgroundColor: '#e9ecef',
            }}>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'span'}
                container={Breadcrumb}
                finalProps={{
                  style: { color: '#333333' }
                }}
              />
            </Paper>
            <BreadcrumbsItem to='/dashboard'>Dashboard</BreadcrumbsItem>
            <Switch>
              <Route path='/' component={props => {
                if (user.profile.is_manager)
                  return <ManagerDashboard {...props} user={user} />
                return <SalerepDashboard {...props} user={user} />

              }} />

            </Switch>
          </>
        )}
      </USERCONTEXT.Consumer>
  )
}

export default Dashboard