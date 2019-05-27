import * as React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import ReportBreadcrumb from './ReportBreadcrumb'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Report from './index'
import styles from './Styles.js'

function ReportContainer(props) {
  const { classes, user } = props
  return (
    <div>
      <ReportBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/inbox'>Report</BreadcrumbsItem>
      <Switch>
        <Route exact path="/report" component={props => <Report {...props} user={user} />} />
      </Switch>
    </div>
  )
}

export default withStyles(styles)(ReportContainer);