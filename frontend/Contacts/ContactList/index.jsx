import * as React from 'react'

import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { InputLabel, DialogTitle } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import { Dialog, DialogActions, DialogContent } from '@material-ui/core'


import useFetchData from '../../CustomHook/useFetchData'
import { CONTACT_URL, GROUP_URL } from "../../common/urls";
import { apiGet, apiDelete } from '../../common/Request';
import { getDefaultCompilerOptions } from 'typescript';
import GroupDialog from '../GroupDialog'
import CreateContact from '../CreateContact'
import CustomSnackbar from '../../components/CustomSnackbar'

import styles from './ContactListStyle'

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexGrow: 1,
//     justifyContent: 'center'
//   },
//   paper: {
//     padding: theme.spacing.unit * 4,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   fixTable: {
//     maxWidth: '90%',
//   }
// });

function ContactList(props) {
  const [contacts, setContacts] = React.useState({ data: [], total: 0 })
  const [groups, setGroups, setGroupURL, forceUpdateGroup] = useFetchData(GROUP_URL, props.history, { data: [], total: 0 })
  const [selectingGroup, setSelectingGroup] = React.useState(-1)
  const [actionAnchorEl, setActionAnchorEl] = React.useState(null)
  const [groupDialog, setGroupDialog] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [createContactDialog, setCreateContactDialog] = React.useState(false)



  // const [contacts, setContacts] = React.useState({ data: [], total: 0 })
  React.useEffect(() => {
    // Effect
    if (groups.data[0]) {
      setSelectingGroup(groups.data[0].id)
      apiGet(GROUP_URL + '/' + groups.data[0].id + '/contacts', true).then(res => {
        setContacts({ ...res.data })
      })
    }

  }, [groups.data.length])


  const { classes } = props;

  let notiTimeout = {}
  //Clear timer
  React.useEffect(() => {

    // Cleanup
    return () => {
      Object.keys(notiTimeout).forEach(k => {
        clearTimeout(notiTimeout[k])
      })
    }
  })


  //event handler 

  const onChangeGroup = (e) => {

    setSelectingGroup(e.target.value)
    apiGet(GROUP_URL + '/' + e.target.value + '/contacts', true).then(res => {
      setContacts({ ...res.data })
    })
  }

  const onClickActionBtn = e => {
    setActionAnchorEl(e.currentTarget)
  }


  const toggleGroupDialog = () => {
    setGroupDialog(!groupDialog)
  }

  const onCreateGroupSuccess = (newGroup) => {
    setGroups({ data: groups.data.concat(newGroup), total: groups.total + 1 })
    setCompleteNotice('Successfully Create')
    toggleGroupDialog()
  }


  const onDeleteGroup = () => {

    apiDelete(GROUP_URL + '/' + selectingGroup, true).then(res => {
      if (!res.data.code) {
        setCompleteNotice('Successfully Delete')
        notiTimeout.success = setTimeout(() => {
          setCompleteNotice(false)
        }, 2000);

        forceUpdateGroup()
        setConfirmDelete(false)
        setActionAnchorEl(null)
        setSelectingGroup(groups.data[0].id)
      }
      else {
        setErrNotice(res.data.msg)
        notiTimeout.err = setTimeout(() => {
          setErrNotice(false)
        }, 2000);
      }
    })
  }

  const toggleCreateDialog = () => {
    setCreateContactDialog(false)
  }

  const onCreateContactSuccess = (newContact, isAddedToGroups) => {
    setCompleteNotice('Successfully Create')
    setCreateContactDialog(false)
    const newContacts = [].concat(contacts.data)
    if (selectingGroup in isAddedToGroups) {
      forceUpdateGroup()
      apiGet(GROUP_URL + '/' + selectingGroup + '/contacts', true).then(res => {
        setContacts({ ...res.data })
      })

    }
    else {
      setSelectingGroup(groups.data[0].id)
      forceUpdateGroup()
      apiGet(GROUP_URL + '/' + groups.data[0].id + '/contacts', true).then(res => {
        setContacts({ ...res.data })
      })
    }
  }


  return (
    <div className={classes.root}>
      {completeNotice != '' && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice != '' && <CustomSnackbar isErr msg={errNotice} />}
      {createContactDialog &&
        <CreateContact onCreateSuccess={onCreateContactSuccess} groups={groups} toggleDialog={toggleCreateDialog} />
      }
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>
          Delete group <strong>{contacts.group}</strong>
        </DialogTitle>
        <DialogContent>
          This action cannot be undone
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setConfirmDelete(false) }}>Cancel</Button>
          <Button onClick={() => { onDeleteGroup() }}>Delete group</Button>
        </DialogActions>
      </Dialog>
      {
        groupDialog && <GroupDialog toggleGroupDialog={toggleGroupDialog}
          canAddContacts={true}
          onCreateGroupSuccess={onCreateGroupSuccess} />
      }
      <Menu
        anchorEl={actionAnchorEl}
        // anchorOrigin={{ horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(actionAnchorEl)}
        onClose={() => setActionAnchorEl(null)}
      >
        <MenuItem onClick={() => toggleGroupDialog()}>Create Contact Group</MenuItem>
        {
          contacts.group != "All Contacts" ?
            <MenuItem onClick={() => setConfirmDelete(true)}>Delete Selecting:w Contact Group</MenuItem>
            :
            <MenuItem disabled>Cannot Delete Default Contact Group</MenuItemdisabled>
        }
      </Menu>
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={2} className='my-3'>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Contact Group</InputLabel>
            <Select
              value={selectingGroup}
              onChange={onChangeGroup}
              displayEmpty
              name="Active"
              variant="filled"
              className={classes.selectEmpty}
            >
              {
                groups.data.map(g => {
                  return (
                    <MenuItem value={g.id} key={`groups${g.id}`}>
                      {g.name} ({g.total_contact})
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} className='my-3 d-flex flex-column justify-content-end'>
          <Button onClick={onClickActionBtn}>Action</Button>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: '#', type: 'numeric', cellStyle: { width: '100px' } },
              { title: 'Full name', field: 'fullName' },
              { title: 'Email', field: 'email' },
              {
                title: 'Phone',
                field: 'phone',
              },
            ]}
            data={contacts.data.map(
              (c, index) => ({
                '#': index + 1,
                fullName: c.first_name + ' ' + c.last_name,
                email: c.mail,
                phone: c.phone
              })
            )}
            title="Contacts List"
            actions={[
              {
                icon: 'add',
                tooltip: 'Create New Contact',
                onClick: (event, rows) => {
                  setCreateContactDialog(true)
                },
                isFreeAction: true
              },
            ]}
            options={{
              selection: true,
              filtering: true,
              paging: false
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(ContactList);