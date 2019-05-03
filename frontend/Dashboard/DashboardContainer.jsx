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
import TicketTableDetail from './Salerep/TicketTableDetail'
import CampaignTableDetail from './Salerep/CampaignTableDetail'
import FollowUpTableDetail from './Salerep/FollowUp/FollowUpTableDetail'

function Dashboard(props) {

  return (
      <USERCONTEXT.Consumer>
        {({ user }) => 
        {
          return (
          <>
          <Paper className="d-flex justify-content-between" style={{
              padding: '11px 72px',
              marginBottom: '10px',
              marginTop: 10,
              backgroundColor: '#fff',
            }}>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'span'}
                container={Breadcrumb}
                finalProps={{
                  style: { color: 'rgb(51, 51, 51)', fontWeight: 'bold' }
                }}
              />
            </Paper>
            <BreadcrumbsItem to='/dashboard'>Dashboard</BreadcrumbsItem>
            <Switch>
              <Route path="/dashboard/ticket-detail" component={(props) => (<TicketTableDetail {...props} user={user} />)} />
              <Route path="/dashboard/campaign-detail" component={(props) => (<CampaignTableDetail {...props} user={user} />)} />
              <Route path="/dashboard/follow-up-detail" component={(props) => (<FollowUpTableDetail {...props} user={user} />)} />
              <Route path='/' component={props => {
                if (user.profile.is_manager)
                  return <ManagerDashboard {...props} user={user} />
                return <SalerepDashboard {...props} user={user} />
              }} />
            </Switch>
          </>
        )}}
      </USERCONTEXT.Consumer>
  )
}

export default Dashboard