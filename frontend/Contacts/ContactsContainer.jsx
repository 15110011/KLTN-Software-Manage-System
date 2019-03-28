import * as React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import ContactDetail from './ContactDetail';
import CreateContact from './CreateContact';
import ContactList from './ContactList';

function ContactContainer(props) {

  const [canClickAdd, setCanClickAdd] = React.useState(false)

  React.useEffect(() => {
    // Effect
    if (window.location.pathname == '/contacts') {
      setCanClickAdd(true)
    }
    else {
      setCanClickAdd(false)
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

        {canClickAdd &&
          <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/contacts/add')}><AddIcon />&nbsp;Add Contact</Button>
        }


      </Paper>
      <BreadcrumbsItem to='/contacts'>Contacts</BreadcrumbsItem>
      <Switch>
        <Route exact path="/contacts" component={(props) => (<ContactList {...props} />)} />
        <Route path="/contacts/add" component={(props) => (<CreateContact {...props} />)} />
        <Route path="/contacts/:id" component={(props) => (<ContactDetail {...props} />)} />
      </Switch>
    </div>
  )
}

export default ContactContainer;