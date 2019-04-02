import * as React from 'react'
import FollowUpPlanList from './FollowUpPlanList/FollowUpPlanList';
import { Route, NavLink, Switch } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FollowUpPlanBreadcrumb from './FollowUpPlanBreadcrumb'
import CreateFollowUpPlan from './CreateFollowUpPlan/index'
import CustomSnackbar from '../components/CustomSnackbar'


function FollowUpPlanContainer(props) {
  const { classes } = props

  return (
    <div>
      
      <FollowUpPlanBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/follow-up-plans'>FOLLOW UP PLAN</BreadcrumbsItem>
      <Switch>
        <Route exact path="/follow-up-plans" component={(props) => (<FollowUpPlanList {...props} />)} />
        {
          props.user.profile.is_manager &&
          <Route path="/follow-up-plans/add" component={(props) => (<CreateFollowUpPlan {...props} />)} />
        }
        {/* <Route path="/follow-up-plans/:id" component={(props) => (<ProductDetail {...props} />)} /> */}
      </Switch>
    </div>
  )
}

export default FollowUpPlanContainer;