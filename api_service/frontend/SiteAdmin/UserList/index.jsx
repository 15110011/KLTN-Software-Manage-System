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

  console.log(userData)
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
        <Grid item xs={12}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridGap: 10
          }}>
            <div style={{ padding: '20px 0' }}>
              <h3>Bill to:</h3>
              <p>Name</p>
              <p>Address</p>
              <p>Phone</p>
              <p>Email</p>
            </div>
            <div style={{ padding: '20px 0' }}>
              <h3>Product:</h3>
              <p>Name</p>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <table style={{ width: '100%' }} border="1">
              <tr>
                <th>Packages</th>
                <th>Features</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>License</th>
                <th>Pricing</th>
              </tr>
              <tr>
                <td>Package 1</td>
                <td>Feature 1</td>
                <td>1</td>
                <td>Unlimited</td>
                <td>#3434234234</td>
                <td style={{ textAlign: 'right' }}>$100</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: 'right' }}>Total</td>
                <td style={{ textAlign: 'right' }}>100</td>
              </tr>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UserList);