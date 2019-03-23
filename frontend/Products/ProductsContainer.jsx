import * as React from 'react'
import ProductList from './ProductList/ProductList';
import { Route, NavLink, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Breadcrumb from '../components/Breadcrumb'
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import ProductDetail from './ProductDetail/ProductDetail';
import CreateProduct from './CreateProduct/CreateProduct';

function Products(props) {
  return (
    <div>
      <Paper className="d-flex justify-content-between" style={{
        padding: '11px',
        marginBottom: '10px'
      }}>
        <Breadcrumbs
          separator={<b> / </b>}
          item={NavLink}
          finalItem={'b'}
          container={Breadcrumb}
          finalProps={{
            style: { color: 'black' }
          }}
        />
        <Button color="primary" aria-label="Add" variant="contained" onClick={()=> props.history.push('/products/add')}><AddIcon />&nbsp;Add Product</Button>
      </Paper>
      <BreadcrumbsItem to='/products'>Products</BreadcrumbsItem>
      <Switch>
        <Route exact path="/products" component={(props) => (<ProductList {...props} />)} />
        <Route path="/products/add" component={(props) => (<CreateProduct {...props} />)} />
        <Route path="/products/:id" component={(props) => (<ProductDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default Products;