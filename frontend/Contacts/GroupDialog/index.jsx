import * as React from 'react'
import { withStyles } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel } from '@material-ui/core'

import styles from './styles'

function GroupDialog(props) {

  const [createObj, setCreateObj] = React.useState({

  })


  const { toggleGroupDialog, canAddContacts, classes } = props


  // event handler 
  const onChangeInput = (e) => {
    setCreateObj({ ...createObj, [e.target.name]: e.target.value })
  }

  return (
    <Dialog
      open={true}
      onClose={toggleGroupDialog}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>Create New Contact Group</DialogTitle>
      <DialogContent>
        <Grid container spacing={8} >
          <Grid item xs={3} style={{ position: 'relative' }}>
            <InputLabel
              classes={{
                root: classes.cssLabel
              }}
            >
              Contact Name
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
            />
          </Grid>
          {
            canAddContacts &&
            <>
              <Grid item xs={3}>
                <InputLabel
                  classes={{
                    root: classes.cssLabel
                  }}
                >
                  Contacts
                </InputLabel>
              </Grid>
              <Grid item xs={9}>
                  
              </Grid>
            </>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="subbmit" color="secondary">Submit</Button>
        <Button type="Cancel" color="primary" onClick={toggleGroupDialog}>Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}

export default withStyles(styles)(GroupDialog)