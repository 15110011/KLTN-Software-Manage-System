import * as React from 'react'
import FollowUpPlanList from './FollowUpPlanList/FollowUpPlanList';
import { Route, NavLink, Switch } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MarketingPlanList from './MarketingPlanList';
import CreateMarketingPlan from './CreateMarketingPlan/index';
import MarketingPlanDetail from './MarketingDetail';

// Component
import MarketingPlanBreadcrumb from './MarketingPlanBreadcrumb'

function MarketingPlanContainer(props) {
  const { user } = props
  return (
    <div>
      <MarketingPlanBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/marketing-plans'>Marketing Plans</BreadcrumbsItem>
      <Switch>
        <Route exact path="/marketing-plans" component={(props) => (<MarketingPlanList {...props} />)} />
        {
          props.user.profile.is_manager &&
          <Route path="/marketing-plans/add" component={(props) => (<CreateMarketingPlan {...props} user={user} />)} />
        }
        <Route path="/marketing-plans/:id" component={(props) => (<MarketingPlanDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default MarketingPlanContainer;