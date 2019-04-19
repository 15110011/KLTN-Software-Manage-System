import * as React from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import CategoryBreadcrumb from './CategoryBreadcrumb'
import CategoryList from './CategoryList/index'
import CategoryDetail from './CategoryDetail/index'
import ProductTypeDetail from './ProductTypeDetail/index'

function CategoryContainer(props) {

  const { classes } = props;

  return (
    <div>
      <CategoryBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/stocks'>Category</BreadcrumbsItem>
      <Switch>
        <Route exact path="/stocks" component={(props) => (<CategoryList {...props} />)} />
        <Route path="/stocks/category/:id" component={(props) => (<CategoryDetail {...props} />)} />
        <Route path="/stocks/product-type/:id" component={(props) => (<ProductTypeDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default CategoryContainer;