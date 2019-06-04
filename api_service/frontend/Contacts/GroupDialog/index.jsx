import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel } from '@material-ui/core'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AsyncSelect from '../../components/AsyncSelectCustom'
import SelectCustom from '../../components/SelectCustom'
import styles from './styles'
import { apiGet, apiPost } from '../../common/Request';
import { GROUP_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import { BAD_REQUEST } from '../../common/Code';

function GroupDialog(props) {

  const [createObj, setCreateObj] = React.useState({
    contacts: [],
    name: '',
    editor: null,
    _type: 'PRIVATE'
  })

  const [error, setError] = React.useState({})


  const [allContacts, setAllContacts] = React.useState({ contacts: [] })

  // React.useEffect(() => {
  //   // Effect
  //   apiGet(GROUP_URL + '?group=All Contacts', true).then(res => {
  //     setAllContacts(res.data)
  //   })
  // }, [])


  const { toggleGroupDialog, canAddContacts, classes, defaultGroup, user } = props


  // event handler 
  const onChangeInput = (e) => {
    setCreateObj({ ...createObj, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(GROUP_URL + '/' + defaultGroup + "/contacts?q=" + action.option.value).then(res => {
        const cloneContacts = [].concat(createObj.contacts)
        const realResult = res.data.contacts.find(c => {
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
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateObj({ ...createObj, contacts: value })
    }
  }

  const handleChangeSelectEditor = (value, action) => {
    if (action.action == 'select-option') {

      setCreateObj({ ...createObj, editor: value })
    }
  }

  const fetchSuggestion = (input) => {
    return apiGet(GROUP_URL + '/' + defaultGroup + "/contacts?q=" + input).then(res => {
      return res.data.suggestions.map(s => ({ label: s, value: s }))
    })
  }

  const onPostData = () => {

    const cloneObj = JSON.parse(JSON.stringify(createObj))

    let cloneErr = {}

    cloneObj.contacts = cloneObj.contacts.map(c => c.id)
    if (cloneObj.editor) {
      cloneObj.editor = cloneObj.editor.id
    }
    apiPost(GROUP_URL, cloneObj, false, true).then(res => {
      if (res.data.code == "token_not_valid") {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
            props.history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            onPostData()
          }
        })
      }
      else if (res.data.code == BAD_REQUEST) {
        const { code, ...rest } = res.data
        cloneErr = rest
      }
      else {
        props.onCreateGroupSuccess(res.data)
      }
      setError(cloneErr)
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
      classes={{ paper: classes.dialogRoot }}
    >
      <DialogTitle>CREATE NEW CONTACT GROUP</DialogTitle>
      <form onSubmit={onCreateForm}>
        <DialogContent style={{ overflowY: 'unset' }}>
          {Object.keys(error).map((k) => {
            return (
              <div className="text-danger">{error[k]}</div>
            )
          })}
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
                error={error.name}
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
            {user.profile.is_manager &&
              <>
                <Grid item xs={3} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                  >
                    Group type
              </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={createObj._type == 'PRIVATE'}
                        onChange={onChangeInput}
                        value='PRIVATE'
                        color="primary"
                        name='_type'
                      />
                    }
                    label="Private"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={createObj._type == 'PUBLIC'}
                        onChange={onChangeInput}
                        value='PUBLIC'
                        color="primary"
                        name='_type'
                      />
                    }
                    label="Public"
                  />
                </Grid>
              </>
            }
            {createObj._type == 'PUBLIC' &&
              <Grid item xs={3} style={{ position: 'relative' }}>
                <InputLabel
                  classes={{
                    root: classes.cssLabel
                  }}
                >
                  Editor
                </InputLabel>
              </Grid>
            }
            {createObj._type == 'PUBLIC' &&
              <Grid item xs={9}>
                <SelectCustom
                  options={user.sale_reps.map(r => {
                    return {
                      label: r.user.username + ` (${r.user.email})`,
                      value: r.user.id,
                      ...r.user
                    }
                  })}
                  handleChange={handleChangeSelectEditor}
                  value={createObj.editor}
                  name="editor"
                  fullWidth
                  single
                  data={createObj.editor && {
                    label: `${createObj.editor.label}`,
                    value: createObj.editor.id,
                    ...createObj.editor
                  }}
                />
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="Cancel" color="primary" onClick={toggleGroupDialog}>Cancel</Button>
          <Button type="subbmit" color="secondary">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default withStyles(styles)(GroupDialog)