import * as React from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Breadcrumb from '../components/Breadcrumb'
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'


function FollowUpPlanBreadcrumb(props) {
  const [checkCreateFollowUpPlanButton, setcheckCreateFollowUpPlanButton] = React.useState(true)

  React.useEffect(() => {
    if (window.location.pathname == '/follow-up-plans') {
      setcheckCreateFollowUpPlanButton(true)
    } else {
      setcheckCreateFollowUpPlanButton(false)
    }
  })
  return (
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
      {/* {
        props.user.profile.is_manager && checkCreateFollowUpPlanButton &&
        <Button color="primary" aria-label="Add" variant="contained" onClick={() => props.history.push('/follow-up-plans/add')}><AddIcon />&nbsp;Add Plan</Button>
      } */}
    </Paper>)
}

export default FollowUpPlanBreadcrumb;