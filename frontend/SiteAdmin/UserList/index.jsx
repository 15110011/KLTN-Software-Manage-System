import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import styles from './UserListStyle'
import CreateUser from '../CreateUser';
import useFetchData from '../../CustomHook/useFetchData'

// API
import { RegisterURL } from '../../common/urls';
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function UserList(props) {
  const [createUserDialog, setCreateUserDialog] = React.useState(false)
  const [userData, setUserData] = useFetchData(RegisterURL, props.history, {
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
              { title: 'Role', field: 'role' },
            ]}
            // data={(query) =>
            //   new Promise((resolve, reject) => {
            //     let searchString = `${search.username ? '&username=' + search.username : ''}`
            //     searchString += `${search.email ? '&email=' + search.email : ''}`
            //     searchString += `${search.phone ? '&phone=' + search.phone : ''}`
            //     apiGet(RegisterURL + '/' + `?page=${activePage}&limit=${query.pageSize}` + searchString, true).then(res => {
            //       const data = res.data.data.map((u, index) => ({
            //         'numeral': activePage * query.pageSize + index + 1,
            //         username: u.username,
            //         email: u.email,
            //         role: u.role,
            //         phone: u.phone
            //       })
            //       )
            //       resolve({
            //         data,
            //         page: res.data.page,
            //         totalCount: res.data.total
            //       })
            //     })
            //   })}
            title="Manage User"
            options={{
              search: false
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