
import * as React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import CampaignList from './CampaignList';
import CreateCampaign from './CreateCampaign';
import CampaignDetail from './CampaignDetail';
import USERCONTEXT from '../components/UserContext'


function CampaignContainer(props) {

  const { user } = props;
  const [canClickAdd, setCanClickAdd] = React.useState(false)

  React.useEffect(() => {
    // Effect
    if (window.location.pathname == '/campaigns') {
      setCanClickAdd(true)
    }
    else {
      setCanClickAdd(false)
    }
  })

  return (
    <div>
      <div>

        <>
        <Paper className="d-flex justify-content-between" style={{
              padding: '11px 72px',
              marginBottom: '10px',
              marginTop: 10,
              backgroundColor: '#e9ecef',
            }}>
              <Breadcrumbs
                separator={<b> / </b>}
                item={NavLink}
                finalItem={'span'}
                container={Breadcrumb}
                finalProps={{
                  style: { color: '#333333' }
                }}
              />
            {/* 
                {canClickAdd &&
                  <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/campaigns/add')}><AddIcon />&nbsp;Add Campaigns</Button>
                } */}
          </Paper>
          <BreadcrumbsItem to='/campaigns'>Campaigns</BreadcrumbsItem>
          <Switch>
            <Route exact path="/campaigns" component={(props) => (<CampaignList {...props} user={user} />)} />
            <Route path="/campaigns/add" component={(props) => (<CreateCampaign {...props} user={user} />)} />
            <Route path="/campaigns/:id" component={(props) => (<CampaignDetail {...props} />)} />
          </Switch>
        </>
      </div>
    </div>
  )
}

export default CampaignContainer;