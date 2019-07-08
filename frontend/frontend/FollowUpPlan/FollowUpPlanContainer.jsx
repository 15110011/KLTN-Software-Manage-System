import * as React from 'react'
import FollowUpPlanList from './FollowUpPlanList/FollowUpPlanList';
import { Route, NavLink, Switch } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FollowUpPlanBreadcrumb from './FollowUpPlanBreadcrumb'
import CreateFollowUpPlan from './CreateFollowUpPlan/index'
import FollowUpPlanDetail from './FollowUpPlanDetail/index'

function FollowUpPlanContainer(props) {
  const { classes, user } = props
  return (
    <div>
      
      <FollowUpPlanBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/follow-up-plans'>FOLLOW UP PLANS</BreadcrumbsItem>
      <Switch>
        <Route exact path="/follow-up-plans" component={props => <FollowUpPlanList {...props} user={user} />} />
        {
          props.user.profile.is_manager &&
          <Route path="/follow-up-plans/add" component={(props) => (<CreateFollowUpPlan {...props} user={user} />)} />
        }
        <Route path="/follow-up-plans/:id" component={(props) => (<FollowUpPlanDetail {...props} user={user} />)} />
      </Switch>
    </div>
  )
}

export default FollowUpPlanContainer;