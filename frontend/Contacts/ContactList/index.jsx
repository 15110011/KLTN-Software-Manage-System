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
import { InputLabel, DialogTitle, TablePagination } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import Popover from '@material-ui/core/Popover'
import { Dialog, DialogActions, DialogContent } from '@material-ui/core'
import MTableBody from 'material-table/dist/m-table-body'


import useFetchData from '../../CustomHook/useFetchData'
import { CONTACT_URL, GROUP_URL } from "../../common/urls";
import { apiGet, apiDelete } from '../../common/Request';
import { getDefaultCompilerOptions } from 'typescript';
import GroupDialog from '../GroupDialog'
import CreateContact from '../CreateContact'
import CustomSnackbar from '../../components/CustomSnackbar'

import styles from './ContactListStyle'
import { BAD_REQUEST } from '../../common/Code';
import AddToGroup from '../AddToGroup';
import { ConsolidatePluginClass } from 'fuse-box/plugins/ConsolidatePlugin';


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

  const [deleteContactConfirm, setDeleteContactConfirm] = React.useState(false)
  const [deleteContacts, setDeleteContacts] = React.useState([])
  const [changeGroupDialog, setChangeGroupDialog] = React.useState(false)
  // const [activePage, setActivePage] = React.useState(0)
  let activePage = 0

  const search = {}



  const [selectingContacts, setSelectingContacts] = React.useState([])

  const tableRef = React.useRef(null);



  // const [contacts, setContacts] = React.useState({ data: [], total: 0 })
  React.useEffect(() => {
    // Effect
    if (groups.data[0]) {
      setSelectingGroup(groups.data[0].id)
      // apiGet(GROUP_URL + '/' + groups.data[0].id + '/contacts', true).then(res => {
      //   setContacts({ ...res.data })
      // })
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
  }, [])



  //event handler 

  const onChangeGroup = (e) => {

    setSelectingGroup(e.target.value)
    apiGet(GROUP_URL + '/' + e.target.value + '/contacts', true).then(res => {
      // setContacts({ ...res.data })
      tableRef.current.onQueryChange(123123)
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
    setCompleteNotice('Successfully Created')
    toggleGroupDialog()
  }


  const onDeleteGroup = () => {

    apiDelete(GROUP_URL + '/' + selectingGroup, true).then(res => {
      if (!res.data.code) {
        setCompleteNotice('Successfully Deleted')
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
    setCompleteNotice('Successfully Created')
    setCreateContactDialog(false)
    notiTimeout.success = setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    if (selectingGroup in isAddedToGroups) {
      forceUpdateGroup()
      apiGet(GROUP_URL + '/' + selectingGroup + '/contacts', true).then(res => {
        // setContacts({ ...res.data })
        tableRef.current.onQueryChange(123123)
      })

    }
    else {
      setSelectingGroup(groups.data[0].id)
      forceUpdateGroup()
      apiGet(GROUP_URL + '/' + groups.data[0].id + '/contacts', true).then(res => {
        // setContacts({ ...res.data })
        tableRef.current.onQueryChange()
      })
    }
  }

  const onDeleteContacts = () => {
    const contactsInfo = {
      contacts: deleteContacts, group: selectingGroup,
      isDefaultGroup: selectingGroup == groups.data[0].id
    }
    apiDelete(CONTACT_URL + '/' + 'batchdelete', contactsInfo, true).then(res => {
      if (res.data.code == BAD_REQUEST) {
        setErrNotice('Delete failed')
        notiTimeout.err = setTimeout(() => {
          setErrNotice(false)
        }, 2000);
      } else {
        setCompleteNotice('Successfully Deleted')
        notiTimeout.success = setTimeout(() => {
          setCompleteNotice(false)
        }, 2000);
        forceUpdateGroup()
        apiGet(GROUP_URL + '/' + selectingGroup + '/contacts', true).then(res => {
          // setContacts({ ...res.data })
          tableRef.current.onQueryChange()
        })
        setDeleteContactConfirm(false)
      }
    })
  }

  //Move contacts
  const toggleAddToGroupDialog = () => {
    setChangeGroupDialog(!changeGroupDialog)
  }


  const onMoveContactSuccess = (newContact, isAddedToGroups) => {
    setCompleteNotice('Successfully Added')
    notiTimeout.success = setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    setChangeGroupDialog(false)
    forceUpdateGroup()
  }
  return (
    <div className={classes.root}>
      {completeNotice != '' && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice != '' && <CustomSnackbar isErr msg={errNotice} />}
      {createContactDialog &&
        <CreateContact onCreateSuccess={onCreateContactSuccess} groups={groups} toggleDialog={toggleCreateDialog} />
      }

      {/*
        Move contacts Popover 
      */}
      {changeGroupDialog &&
        <AddToGroup groups={groups} selectingGroup={selectingGroup}
          toggleDialog={toggleAddToGroupDialog} selectingContacts={selectingContacts}
          onSuccess={onMoveContactSuccess}
        />
      }

      {/*END*/}

      <Dialog
        open={deleteContactConfirm}
        onClose={() => setDeleteContactConfirm(false)}
      >
        <DialogTitle>
          Delete contacts
        </DialogTitle>
        <DialogContent>
          This action cannot be undone
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeleteContacts([])
            setDeleteContactConfirm(false)
          }}>Cancel</Button>
          <Button onClick={() => { onDeleteContacts() }}>Delete</Button>
        </DialogActions>
      </Dialog>
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
          canAddContacts={true} defaultGroup={groups.data[0].id}
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
            <MenuItem onClick={() => setConfirmDelete(true)}>Delete Selecting Contact Group</MenuItem>
            :
            <MenuItem disabled>Cannot Delete Default Contact Group</MenuItem>
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
          {
            selectingGroup == -1 ?
              ''
              :
              <MaterialTable
                tableRef={tableRef}
                components={
                  {
                    Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                      if (columnId == 1) {
                        search.first_name = value
                      }
                      else if (columnId == 2) {
                        search.last_name = value
                      }
                      else if (columnId == 3) {
                        search.mail = value
                      }
                      else if (columnId == 4) {
                        search.phone = value
                      }
                      activePage = 0
                      props.onFilterChanged(columnId, value);
                      //Columnid la thu tu cot tren bang (ko tinh selection)
                    }} />,
                    Pagination: props => <TablePagination {...props}
                      page={activePage} rowsPerPageOptions={[5, 10, 20]}
                      count={props.count}
                      onChangePage={(e, nextPage) => {
                        props.onChangePage(a, nextPage)
                        // setActivePage(nextPage)
                        activePage = nextPage
                      }}
                    />
                  }
                }
                columns={[
                  { title: '#', field: '#', type: 'numeric', cellStyle: { width: '100px' }, filtering: false },
                  { title: 'First name', field: 'firstName' },
                  { title: 'Last name', field: 'lastName' },
                  {
                    title: 'Email', field: 'email'
                  },
                  {
                    title: 'Phone',
                    field: 'phone',
                  },
                ]}
                data={(query) =>
                  new Promise((resolve, reject) => {
                    let searchString = `${search.first_name ? '&first_name=' + search.first_name : ''}`
                    searchString += `${search.last_name ? '&last_name=' + search.last_name : ''}`
                    searchString += `${search.mail ? '&mail=' + search.mail : ''}`
                    searchString += `${search.phone ? '&phone=' + search.phone : ''}`
                    apiGet(GROUP_URL + '/' + selectingGroup
                      + '/contacts' +
                      `?page=${activePage}&limit=${query.pageSize}` + searchString, true).then(res => {
                        const data = res.data.data.map((d, index) => ({
                          '#': activePage * query.pageSize + index + 1,
                          fullName: d.first_name + ' ' + d.last_name,
                          firstName: d.first_name,
                          lastName: d.last_name,
                          email: d.mail,
                          phone: d.phone,
                          id: d.id
                        })
                        )
                        resolve({
                          data,
                          page: res.data.page,
                          totalCount: res.data.total
                        })
                      })
                  })
                }

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
                  {

                    icon: 'delete',
                    tooltip: 'Delete Contacts',
                    onClick: (event, rows) => {
                      // setCreateContactDialog(true)
                      setDeleteContacts(rows.map(r => r.id))
                      setDeleteContactConfirm(true)
                    },
                  },
                  {
                    icon: 'swap_horiz',
                    tooltip: 'Add these contacts to group',
                    onClick: (event, rows) => {
                      setSelectingContacts(rows)
                      setChangeGroupDialog(true)
                    },
                  }
                ]}
                onRowClick={
                  (e, rowData) => {

                    props.history.push('/contacts/' + rowData.id)
                  }
                }
                options={{
                  search: false,
                  selection: true,
                  filtering: true,
                  paging: true,
                  debounceInterval: 300
                }}
              />
          }
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(ContactList);