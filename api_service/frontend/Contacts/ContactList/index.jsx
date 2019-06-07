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
import { InputLabel, DialogTitle, TablePagination, Divider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import Popover from '@material-ui/core/Popover'
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import MTableBody from 'material-table/dist/m-table-body'
import BookmarkIcon from '@material-ui/icons/Bookmark'


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
import UpdateGroup from '../UpdateGroupDialog'
import ImportDialog from '../ImportDialog'

function ContactList(props) {
  const [contacts, setContacts] = React.useState({ data: [], total: 0 })
  const [groups, setGroups, setGroupURL, forceUpdateGroup] = useFetchData(GROUP_URL, props.history, { data: [], total: 0 })


  const [selectingGroup, setSelectingGroup] = React.useState(-1)
  const [selectingGroupIndex, setSelectingGroupIndex] = React.useState(0)

  const [actionAnchorEl, setActionAnchorEl] = React.useState(null)
  const [groupDialog, setGroupDialog] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)
  const [createContactDialog, setCreateContactDialog] = React.useState(false)

  const [deleteContactConfirm, setDeleteContactConfirm] = React.useState(false)
  const [deleteContacts, setDeleteContacts] = React.useState([])
  const [changeGroupDialog, setChangeGroupDialog] = React.useState(false)
  const [updateGroupDialog, setUpdateGroupDialog] = React.useState(false)
  // const [activePage, setActivePage] = React.useState(0)
  const [importDialog, setImportDialog] = React.useState(false)
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


  const { classes, disabledAction, handleAddContact, allContacts } = props;
  console.log(allContacts, 'hihi')
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

  const onChangeGroup = (e, i) => {
    setSelectingGroup(e.target.value)
    setSelectingGroupIndex(parseInt(i.props.name))
    apiGet(GROUP_URL + '/' + e.target.value + '/contacts', true).then(res => {
      // setContacts({ ...res.data })
      tableRef.current.onQueryChange()
    })
  }

  const onClickActionBtn = e => {
    setActionAnchorEl(e.currentTarget)
  }


  const toggleGroupDialog = () => {
    setGroupDialog(!groupDialog)
  }

  const toggleImportDialog = () => {
    setImportDialog(!importDialog)
  }

  const onCreateGroupSuccess = (newGroup) => {
    // setGroups({ data: groups.data.concat(newGroup), total: groups.total + 1 })
    forceUpdateGroup()
    setCompleteNotice('Successfully Created')
    notiTimeout.success = setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
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

  const onUpdateGroupSuccess = () => {

    setCompleteNotice('Successfully Updated')
    notiTimeout.success = setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    forceUpdateGroup()
    setUpdateGroupDialog(false)
  }

  const canUpdateGroup = ((groups.data[0] && selectingGroup != groups.data[0].id)
    || (groups.data[0] && groups.data[selectingGroupIndex]._type == 'PUBLIC'))
    && (groups.data[selectingGroupIndex].creator.id == props.user.id)
  return (
    <div className={classes.root}>
      {importDialog &&
        <ImportDialog toggleImportDialog={toggleImportDialog} />
      }
      {completeNotice != '' && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice != '' && <CustomSnackbar isErr msg={errNotice} />}
      {createContactDialog &&
        <CreateContact onCreateSuccess={onCreateContactSuccess} groups={groups} toggleDialog={toggleCreateDialog}
          selectingGroup={groups.data[selectingGroupIndex]}
        />
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

      {/*
        update selecting group
      */}
      {updateGroupDialog && <UpdateGroup group={groups.data[selectingGroupIndex]}
        toggleDialog={() => { setUpdateGroupDialog(!updateGroupDialog) }}
        onUpdateSuccess={() => { onUpdateGroupSuccess() }}
        user={props.user}
      />}

      {/* END */}

      <Dialog
        open={deleteContactConfirm}
        onClose={() => setDeleteContactConfirm(false)}
      >
        <DialogTitle>
          DELETE CONTACT(S)
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeleteContacts([])
            setDeleteContactConfirm(false)
          }}>Cancel</Button>
          <Button onClick={() => { onDeleteContacts() }} color='primary'>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <DialogTitle>
          DELETE GROUP <strong>{contacts.group}</strong>
        </DialogTitle>sele.id
        <DialogContent>
          <DialogContentText>
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setConfirmDelete(false) }}>Cancel</Button>
          <Button onClick={() => { onDeleteGroup() }} color='primary' >Delete group</Button>
        </DialogActions>
      </Dialog>
      {
        groupDialog && <GroupDialog toggleGroupDialog={toggleGroupDialog}
          canAddContacts={true} defaultGroup={groups.data[0].id}
          user={props.user}
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
        <MenuItem onClick={() => toggleImportDialog()}>Import Contact Data</MenuItem>
        {
          selectingGroupIndex !== 0 && groups.data[selectingGroupIndex].creator.id == props.user.id &&
          <MenuItem onClick={() => setConfirmDelete(true)}>Delete Selecting Contact Group</MenuItem>
        }

        {canUpdateGroup &&
          <MenuItem onClick={() => setUpdateGroupDialog(true)}>Update Selecting Contact Group's Detail</MenuItem>}
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
                groups.data.map((g, index) => {
                  let classRoot = {}
                  if (index == 0) {

                  }
                  else if (g._type == 'PUBLIC') {
                    classRoot = classes.groupPublic
                  }
                  else {
                    classRoot = classes.groupPrivate
                  }
                  let duplicateTime = 0
                  if (allContacts) {
                    g.contacts.forEach(c => {
                      if (allContacts.some(ac => ac.id === c.id)) {
                        duplicateTime += 1
                      }
                    })
                  }
                  return (
                    <MenuItem value={g.id} name={index} key={`groups${g.id}`}>
                      <BookmarkIcon classes={{ root: classRoot }} />&nbsp;&nbsp;{g.name} ({g.total_contact - duplicateTime})
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        {!disabledAction &&
          <Grid item xs={1} className='my-3 d-flex flex-column justify-content-end'>
            <Button onClick={onClickActionBtn}>Action</Button>
          </Grid>
        }
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
                      else if (columnId == 5) {
                        search.org = value
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
                  {
                    title: 'Organization',
                    field: 'org',
                  },
                ]}
                data={(query) =>
                  new Promise((resolve, reject) => {
                    let searchString = `${search.first_name ? '&first_name=' + search.first_name : ''}`
                    searchString += `${search.last_name ? '&last_name=' + search.last_name : ''}`
                    searchString += `${search.mail ? '&mail=' + search.mail : ''}`
                    searchString += `${search.phone ? '&phone=' + search.phone : ''}`
                    searchString += `${search.org ? '&org=' + search.org : ''}`
                    apiGet(GROUP_URL + '/' + selectingGroup
                      + '/contacts' +
                      `?page=${activePage}&limit=${query.pageSize}` + searchString, true).then(res => {
                        let data = []
                        let duplicateTime = 0
                        if (!disabledAction) {
                          data = res.data.data.map((d, index) => ({
                            '#': activePage * query.pageSize + index + 1,
                            fullName: d.first_name + ' ' + d.last_name,
                            firstName: d.first_name,
                            lastName: d.last_name,
                            email: d.mail,
                            phone: d.phone,
                            org: d.org,
                            id: d.id,
                            contact: d
                          })
                          )
                        }
                        else {

                          data = res.data.data.reduce((acc, d, index) => {
                            if (!allContacts.some(c => c.id === d.id)) {
                              acc.push({
                                '#': activePage * query.pageSize + index + 1,
                                fullName: d.first_name + ' ' + d.last_name,
                                firstName: d.first_name,
                                lastName: d.last_name,
                                email: d.mail,
                                phone: d.phone,
                                org: d.org,
                                id: d.id,
                                contact: d
                              })
                            }
                            else {
                              duplicateTime += 1
                            }
                            return acc
                          }
                            , [])
                        }
                        resolve({
                          data,
                          page: res.data.page,
                          totalCount: res.data.total - duplicateTime
                        })
                      })
                  })
                }

                title="Contacts List"
                actions={

                  !disabledAction ? [
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
                  ]
                    : [
                      {
                        icon: 'add',
                        tooltip: 'Add Contact',
                        onClick: (event, rows) => {
                          handleAddContact(rows)
                        },
                      },
                    ]
                }
                onRowClick={
                  !disabledAction && (
                    (e, rowData) => {
                      props.history.push('/contacts/' + rowData.id)
                    }
                  )
                }
                options={{
                  search: false,
                  selection: true,
                  selectionProps: rowData => ({
                    disabled: true
                  }),
                  filtering: true,
                  paging: true,
                  debounceInterval: 300,
                }}
              />
          }
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(ContactList);