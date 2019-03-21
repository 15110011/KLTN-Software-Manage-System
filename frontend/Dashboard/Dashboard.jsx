import * as React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  NavLink
} from 'react-router-dom';

function Dashboard(props) {
  return (
    <div>
      <Breadcrumbs
        separator={<b> / </b>}
        item={NavLink}
        finalItem={'b'}
        container={Breadcrumb}
        finalProps={{
          style: { color: 'black' }
        }}
      />
      DashBoard
    </div>
  )
}

export default Dashboard