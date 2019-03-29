import * as React from 'react'
import ProductList from './ProductList/ProductList';
import { Route, NavLink, Switch } from 'react-router-dom'

import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import ProductDetail from './ProductDetail/ProductDetail';
import CreateProduct from './CreateProduct/CreateProduct';
import ProductBreadcrumb from './ProductBreadcrumb'

function ProductsContainer(props) {
  return (
    <div>
      <ProductBreadcrumb user={props.user} history={props.history} />
      <BreadcrumbsItem to='/products'>Products</BreadcrumbsItem>
      <Switch>
        <Route exact path="/products" component={(props) => (<ProductList {...props} />)} />
        {
          props.user.profile.is_manager &&
          <Route path="/products/add" component={(props) => (<CreateProduct {...props} />)} />
        }
        <Route path="/products/:id" component={(props) => (<ProductDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default ProductsContainer;