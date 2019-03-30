import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel } from '@material-ui/core'

import SelectCustom from '../../../../components/SelectCustom'
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

  React.useEffect(() => {
    // Effect
    apiGet(GROUP_URL + '?group=All Contacts', true).then(res => {
      setAllContacts(res.data)
    })
  }, [])


  const { toggleGroupDialog, canAddContacts, classes } = props


  // event handler 
  const onChangeInput = (e) => {
    setCreateObj({ ...createObj, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (values, element) => {
    setCreateObj({ ...createObj, contacts: values })
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
                  <SelectCustom
                    options={allContacts.contacts.map(c => ({
                      label: `${c.first_name} ${c.last_name}`,
                      value: c.id,
                      ...c
                    }))}
                    handleChange={(values, element) => handleChangeSelect(values, element)}
                    data={
                      createObj.contacts
                        .reduce((acc, c) => {
                          console.log(c)
                          acc.push({ label: `${c.label}`, value: c.id, ...c })
                          return acc
                        }, [])
                    }
                    multi
                    placeholder=""
                    label=""
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