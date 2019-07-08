import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import {
  InputLabel, DialogTitle, TablePagination, Divider,
  Dialog, DialogActions, DialogContent, DialogContentText, Button
} from '@material-ui/core';
import styles from './UserListStyle'
import CreateUser from '../CreateUser';
import useFetchData from '../../CustomHook/useFetchData'
import CustomSnackbar from "../../components/CustomSnackbar";

// API
import { USER_URL } from '../../common/urls';
import { apiPost, apiGet, apiDelete } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function UserList(props) {
  const [createUserDialog, setCreateUserDialog] = React.useState(false)
  const [userData, setUserData, setURL, forceUpdate] = useFetchData(USER_URL, props.history, {
    data: [],
    total: 0
  })
  const [deleteUser, setDeleteUser] = React.useState([])
  const [deleteUserDialog, setDeleteUserDialog] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false);

  const { classes } = props;
  const search = {}

  const handleOpenDialog = () => {
    setCreateUserDialog(true)
  }

  const handleCloseDialog = e => {
    setCreateUserDialog(false)
  }
  const tableRef = React.useRef(null);


  let activePage = 0

  const onDeleteUser = e => {
    apiDelete(`${USER_URL}/` + 'batchdelete', { ids: deleteUser }, true).then((res) => {
      if (res.data.code == BAD_REQUEST) {
        setErrNotice('Delete failed');
        setTimeout(() => {
          setErrNotice(false);
        }, 2000);
      } else {
        setCompleteNotice('Successfully Deleted');
        setTimeout(() => {
          setCompleteNotice(false);
        }, 2000);
        forceUpdate()
        setDeleteUserDialog(false)
      }
    });
  }

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice && <CustomSnackbar isErr msg={errNotice} />}
      {
        deleteUserDialog &&
        <Dialog
          open={deleteUserDialog}
          onClose={() => setDeleteUser(false)}
        >
          <DialogTitle>
            Confirm Action
        </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete user?
              This action cannot be undone.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setDeleteUser([]);
              setDeleteUserDialog(false);
            }}
            >
              Cancel
          </Button>
            <Button onClick={() => { onDeleteUser(); }} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>
      }
      <CreateUser forceUpdate={forceUpdate} createUserDialog={createUserDialog} handleOpenDialog={handleOpenDialog} handleCloseDialog={handleCloseDialog} />
      <Grid classes={{ container: classes.fixTable }} container spacing={24}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
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
            data={userData.data.reduce((acc, u, index) => {
              if (!u.is_superuser) {
                acc.push({
                  'numeral': activePage * 5 + index + 1,
                  username: u.username,
                  email: u.email,
                  role: u.profile.is_manager ? 'Manager' : 'Sale',
                  phone: u.profile.phone,
                  id: u.id
                })
              }
              return acc
            }
              , [])}
            title="Manage User"
            options={{
              filtering: true,
              selection: true
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Create New User',
                onClick: (event, rows) => {
                  setCreateUserDialog(true)
                },
                isFreeAction: true
              },
              {

                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rows) => {
                  setDeleteUser(rows.map(r => r.id));
                  setDeleteUserDialog(true)
                },
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UserList);