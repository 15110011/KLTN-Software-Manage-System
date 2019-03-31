import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel } from '@material-ui/core'

import AsyncSelect from '../../components/AsyncSelectCustom'
import styles from './styles'
import { apiGet, apiPost } from '../../common/Request';
import { GROUP_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import { BAD_REQUEST } from '../../common/Code';

function GroupDialog(props) {

  const [createObj, setCreateObj] = React.useState({
    contacts: [],
    name: ''
  })

  const [allContacts, setAllContacts] = React.useState({ contacts: [] })

  // React.useEffect(() => {
  //   // Effect
  //   apiGet(GROUP_URL + '?group=All Contacts', true).then(res => {
  //     setAllContacts(res.data)
  //   })
  // }, [])


  const { toggleGroupDialog, canAddContacts, classes, defaultGroup } = props


  // event handler 
  const onChangeInput = (e) => {
    setCreateObj({ ...createObj, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (value, action, a) => {
    if (action.action == 'input-change') {

    }
    else if (action.action == 'select-option') {
      apiGet(GROUP_URL + '/' + defaultGroup + "/contacts?q=" + action.option.value).then(res => {
        const cloneContacts = [].concat(createObj.contacts)
        const realResult = res.data.contacts.find(c => {
          console.log(c)
          return c.first_name + ' ' + c.last_name == action.option.value
        })
        cloneContacts.push({
          ...realResult,
          label: realResult.first_name + ' ' + realResult.last_name,
          value: realResult.first_name + ' ' + realResult.last_name
        })
        setCreateObj({ ...createObj, contacts: cloneContacts })
      })
    }
  }

  const fetchSuggestion = (input) => {
    return apiGet(GROUP_URL + '/' + defaultGroup + "/contacts?q=" + input).then(res => {
      return res.data.suggestions.map(s => ({ label: s, value: s }))
    })
  }

  const onPostData = () => {

    const cloneObj = JSON.parse(JSON.stringify(createObj))

    cloneObj.contacts = cloneObj.contacts.map(c => c.id)

    apiPost(GROUP_URL, cloneObj, false, true).then(res => {
      if (res.data.code == "token_not_valid") {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
            this.props.history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            onPostData()
          }
        })
      }
      else {
        props.onCreateGroupSuccess(res.data)
      }
    })
  }

  const onCreateForm = e => {
    e.preventDefault()
    onPostData()
  }

  return (
    <Dialog
      open={true}
      onClose={toggleGroupDialog}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>Create New Contact Group</DialogTitle>
      <form onSubmit={onCreateForm}>
        <DialogContent>
          <Grid container spacing={8} >
            <Grid item xs={3} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Group Name
            </InputLabel>
            </Grid>
            <Grid item xs={9}>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.name}
                name="name"
                classes={{
                  underline: classes.cssUnderline,
                }}
                required
              />
            </Grid>
            {
              props.canAddContacts &&
              <>
                <Grid item xs={3} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                  >
                    Contacts
                </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <AsyncSelect
                    options={allContacts.contacts.map(c => ({
                      label: `${c.first_name} ${c.last_name}`,
                      value: c.id,
                      ...c
                    }))}
                    handleChange={(values, element) => handleChangeSelect(values, element)}
                    onChangeSelect={(values, element) => handleChangeSelect(values, element)}
                    data={
                      createObj.contacts
                        .reduce((acc, c) => {
                          acc.push({ label: `${c.label}`, value: c.id, ...c })
                          return acc
                        }, [])
                    }
                    multi
                    placeholder=""
                    label=""
                    loadOptions={fetchSuggestion}
                  />
                </Grid>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="Cancel" color="primary" onClick={toggleGroupDialog}>Cancel</Button>
          <Button type="subbmit" color="secondary">Submit</Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}

export default withStyles(styles)(GroupDialog)