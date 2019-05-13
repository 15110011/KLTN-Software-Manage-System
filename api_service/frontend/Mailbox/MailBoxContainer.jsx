import * as React from 'react'
import FollowUpPlanList from './FollowUpPlanList/FollowUpPlanList';
import { Route, NavLink, Switch } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MailBoxBreadcrumb from './MailBoxBreadcrumb'
import MailBoxList from './MailBoxList'
import MailDetail from './MailBoxList/MailDetail'

function MailBoxContainer(props) {
  const { classes, user } = props
  return (
    <div>
      <MailBoxBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/inbox'>Inbox</BreadcrumbsItem>
      <Switch>
        <Route exact path="/inbox" component={props => <MailBoxList {...props} user={user} />} />
        <Route path="/inbox/:id" component={(props) => (<MailDetail {...props} user={user} />)} />
      </Switch>
    </div>
  )
}

export default MailBoxContainer;