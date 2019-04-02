import * as React from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import MarketingPlanList from './MarketingPlanList';
import CreateMarketingPlan from './CreateMarketingPlan';
import MarketingPlanDetail from './MarketingDetail';

// Component
import MarketingPlanBreadcrumb from './MarketingPlanBreadcrumb'

function MarketingPlanContainer(props) {

  return (
    <div>
      <MarketingPlanBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/marketing-plans'>Marketing Plans</BreadcrumbsItem>
      <Switch>
        <Route exact path="/marketing-plans" component={(props) => (<MarketingPlanList {...props} />)} />
        {
          props.user.profile.is_manager &&
          <Route path="/marketing-plans/add" component={(props) => (<CreateMarketingPlan {...props} />)} />
        }
        <Route path="/marketing-plans/:id" component={(props) => (<MarketingPlanDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default MarketingPlanContainer;