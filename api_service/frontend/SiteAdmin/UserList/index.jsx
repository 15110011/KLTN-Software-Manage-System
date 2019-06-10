import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import styles from './UserListStyle'
import CreateUser from '../CreateUser';
import useFetchData from '../../CustomHook/useFetchData'

// API
import { USER_URL } from '../../common/urls';
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function UserList(props) {
  const [createUserDialog, setCreateUserDialog] = React.useState(false)
  const [userData, setUserData] = useFetchData(USER_URL, props.history, {
    data: [],
    total: 0
  })
  const { classes } = props;
  const search = {}

  const handleOpenDialog = () => {
    setCreateUserDialog(true)
  }

  const handleCloseDialog = e => {
    setCreateUserDialog(false)
  }

  let activePage = 0

  return (
    <div className={classes.root}>
      <CreateUser createUserDialog={createUserDialog} handleOpenDialog={handleOpenDialog} handleCloseDialog={handleCloseDialog} />
      <Grid classes={{ container: classes.fixTable }} container spacing={24}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral' },
              { title: 'Username', field: 'username' },
              { title: 'Email', field: 'email' },
              { title: 'Phone', field: 'phone' },
              {
                title: 'Role', field: 'role', lookup: {
                  "Manager": "Manager", "Sale": "Sale"
                }
              },
            ]}
            data={userData.data.map((u, index) => ({
              'numeral': activePage * 5 + index + 1,
              username: u.username,
              email: u.email,
              role: u.profile.is_manager ? 'Manager' : 'Sale',
              phone: u.profile.phone
            })
            )}
            title="Manage User"
            options={{
              filtering: true
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Create New User',
                onClick: (event, rows) => {
                  setCreateUserDialog(true)
                },
                isFreeAction: true
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UserList);