import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel } from '@material-ui/core'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AsyncSelect from '../../components/AsyncSelectCustom'
import SelectCustom from '../../components/SelectCustom'
import styles from './styles'
import { apiGet, apiPatch } from '../../common/Request';
import { GROUP_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import { BAD_REQUEST } from '../../common/Code';

function GroupDialog(props) {
  const { group, toggleDialog, onUpdateSuccess, classes, user } = props

  const [error, setError] = React.useState({})

  const [updateObj, setUpdateObj] = React.useState({
    _type: group._type,
    name: group.name,
    editor: group.editor
  })

  const onPatchData = () => {

    const cloneObj = JSON.parse(JSON.stringify(updateObj))

    let cloneErr = {}
    if (cloneObj.editor)
      cloneObj.editor = cloneObj.editor.id
    apiPatch(GROUP_URL + '/' + group.id, cloneObj, false, true).then(res => {
      if (res.data.code == "token_not_valid") {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
            props.history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            onPatchData()
          }
        })
      }
      else if (res.data.code == BAD_REQUEST) {
        const { code, ...rest } = res.data
        cloneErr = rest
      }
      else {
        // props.onCreateGroupSuccess(res.data)
        props.onUpdateSuccess()
      }
      setError(cloneErr)
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    onPatchData()
  }

  const onChangeInput = (e) => {
    setUpdateObj({ ...updateObj, [e.target.name]: e.target.value })
  }

  const handleChangeSelectEditor = (value, action) => {

    if (action.action == 'select-option') {

      setUpdateObj({ ...updateObj, editor: value })
    }
  }

  return (
    <Dialog
      open={true}
      onClose={toggleDialog}
      maxWidth='sm'
      fullWidth
      classes={{ paper: classes.dialogRoot }}
    >
      <DialogTitle>UPDATE GROUP <strong> {group.name} </strong></DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent style={{ overflowY: 'unset' }}>
          <Grid container spacing={8}>
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
                value={updateObj.name}
                name="name"
                classes={{
                  underline: classes.cssUnderline,
                }}
                required
              />
            </Grid>

            {user.profile.is_manager &&
              <>
                <Grid item xs={3} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Group type
              </InputLabel>
                </Grid>

                <Grid item xs={9}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={updateObj._type == 'PRIVATE'}
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
                        checked={updateObj._type == 'PUBLIC'}
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
            {updateObj._type == 'PUBLIC' &&
              <>
                <Grid item xs={3} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                  >
                    Editor
              </InputLabel>
                </Grid>
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
                    value={updateObj.editor}
                    name="editor"
                    fullWidth
                    single
                    data={updateObj.editor && {
                      label: `${updateObj.editor.username} (${updateObj.editor.email})`,
                      value: updateObj.editor.id,
                      ...updateObj.editor
                    }}
                  />
                </Grid>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="Cancel" color="primary" onClick={toggleDialog}>Cancel</Button>
          <Button type="subbmit" color="secondary">Submit</Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}

export default withStyles(styles)(GroupDialog)