
import * as React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import Breadcrumb from '../components/Breadcrumb'
import EmailTemplateList from './EmailTemplateList';
// import CreateEmailTemplate from './CreateEmailTemplate';
// import EmailTemplateDetail from './EmailTemplateDetail';
import USERCONTEXT from '../components/UserContext'


function EmailTemplateContainer(props) {

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
                  <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/campaigns/add')}><AddIcon />&nbsp;Add EmailTemplates</Button>
                } */}
          </Paper>
          <BreadcrumbsItem to='/email-templates'>Email Templates</BreadcrumbsItem>
          <Switch>
            <Route exact path="/email-templates" component={(props) => (<EmailTemplateList {...props} user={user} />)} />
            {/* <Route path="/email-templates/add" component={(props) => (<CreateEmailTemplate {...props} user={user} />)} /> */}
            {/* <Route path="/email-templates/:id" component={(props) => (<EmailTemplateDetail {...props} />)} /> */}
          </Switch>
        </>
      </div>
    </div>
  )
}

export default EmailTemplateContainer;