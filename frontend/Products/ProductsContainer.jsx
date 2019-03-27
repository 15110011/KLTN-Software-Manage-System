import * as React from 'react'
import ProductList from './ProductList/ProductList';
import { Route, NavLink, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Breadcrumb from '../components/Breadcrumb'
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import ProductDetail from './ProductDetail/ProductDetail';
import CreateProduct from './CreateProduct/CreateProduct';

function ProductsContainer(props) {
  const [status, setStatus] = React.useState(false)
  const [checkCreateProductButton, setcheckCreateProductButton] = React.useState(true)

  React.useEffect(() => {
    if (window.location.pathname == '/products') {
      setcheckCreateProductButton(true)
    } else {
      setcheckCreateProductButton(false)
    }
  })
  return (
    <div>
      <Paper className="d-flex justify-content-between" style={{
        padding: '11px 72px',
        marginBottom: '10px',
        marginTop: 10,
        backgroundColor: '#F5F5F5'
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
        {
          props.user.profile.is_manager && checkCreateProductButton &&
          <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/products/add')}><AddIcon />&nbsp;Add Product</Button>
        }
      </Paper>
      <BreadcrumbsItem to='/products'>Products</BreadcrumbsItem>
      <Switch>
        <Route exact path="/products" component={(props) => (<ProductList {...props} />)} />
        {
          props.user.profile.is_manager &&
          <Route path="/products/add" component={(props) => (<CreateProduct {...props} setStatus={setStatus} />)} />
        }
        <Route path="/products/:id" component={(props) => (<ProductDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default ProductsContainer;