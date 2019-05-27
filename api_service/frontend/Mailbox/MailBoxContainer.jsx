import * as React from 'react'
import FollowUpPlanList from './FollowUpPlanList/FollowUpPlanList';
import { Route, NavLink, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MailBoxBreadcrumb from './MailBoxBreadcrumb'
import MailBoxList from './MailBoxList'
import MailDetail from './MailBoxList/MailDetail'
import SideBarMailBox from './MailBoxList/SideBarMailBox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './MailboxStyles.js'

function MailBoxContainer(props) {
  const { classes, user } = props
  return (
    <div>
      <MailBoxBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/inbox'>Inbox</BreadcrumbsItem>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Paper>
            <SideBarMailBox
            // handleClick={handleClick}
            // setOpen={setOpen}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Switch>
            <Route exact path="/inbox" component={props => <MailBoxList {...props} user={user} />} />
            <Route path="/inbox/:id" component={(props) => (<MailDetail {...props} user={user} backToInbox={true} />)} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MailBoxContainer);