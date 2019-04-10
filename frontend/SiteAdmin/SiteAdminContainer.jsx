import * as React from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import USERCONTEXT from '../components/UserContext'
import CreateUser from './CreateUser';
import UserList from './UserList';

function SiteAdminContainer(props) {

  return (
    <div>
      <USERCONTEXT.Consumer>
        {({ user }) => (
          <>
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

              {/* {canClickAdd &&
            <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/contacts/add')}><AddIcon />&nbsp;Add Contact</Button>
          } */}

            </Paper>
            <BreadcrumbsItem to='/settings'>Settings</BreadcrumbsItem>
            <Switch>
              <Route exact path="/settings" component={(props) => (<UserList {...props} user={user} />)} />
              <Route path="/" component={(props) => (<Redirect to='/settings' />)} />
            </Switch>
          </>
        )}
      </USERCONTEXT.Consumer>
    </div>
  )
}

export default SiteAdminContainer;