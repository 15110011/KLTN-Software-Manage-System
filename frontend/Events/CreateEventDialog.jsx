import * as React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Input, InputLabel } from '@material-ui/core'
import { IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { Input, InputLabel } from '@material-ui/core'


import * as dateFns from 'date-fns'

import { apiPost } from '../common/Request'
import CustomSnackbar from '../components/CustomSnackbar'
import styles from './EventStyles'



function CreateEventDialog(props) {

  const { classes, toggleDialog, assigned_to, targets, order, marketing, isNotOriginal } = props

  const [createEvent, setCreateEvent] = React.useState({
    name: '',
    assigned_to: assigned_to ? assigned_to : '',
    start_date: dateFns.format(Date.now()),
    end_date: dateFns.format(Date.now()),
    order: order ? order : '',
    marketing: marketing ? marketing : '',
    content: '',
    contacts: targets.map(t => ({
      label: t.first_name + ' ' + t.last_name, value: t.id, ...t
    })),
    priority: 0
  })


  const onChangeInput = e => {
    setCreateEvent({ ...createEvent, [e.target.name]: e.target.value })
  }

  return (
    <Dialog
      open={true}
      onClose={toggleDialog}
      fullWidth maxWidth='md'
    >
      <DialogTitle style={{ position: 'relative' }}>Quick Create Event
        <Tooltip title="Close Dialog">
          <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }} onClick={toggleDialog}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={8}>
          <Grid className={classes.inputCustom} item xs={2}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              required
            >
              Subject
                    </InputLabel>
          </Grid>
          <Grid item xs={4} className='pr-5'>
            <Input
              onChange={onChangeInput}
              name="name"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.name}
              required
              fullWidth
            />
          </Grid>
          <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              required
            >
              Assigned to
                    </InputLabel>
          </Grid>
          <Grid item xs={4}>
            <Input
              onChange={onChangeInput}
              name="name"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.name}
              required
              fullWidth
            />
          </Grid>
          <Grid className={classes.inputCustom} item xs={2}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              required
            >
              Start date
                    </InputLabel>
          </Grid>
          <Grid item xs={4} className='pr-5'>
            <Input
              onChange={onChangeInput}
              name="name"
              type="date"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.name}
              required
              fullWidth
            />
          </Grid>
          <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              required
            >
              End date
                    </InputLabel>
          </Grid>
          <Grid item xs={4}>
            <Input
              onChange={onChangeInput}
              name="name"
              type="date"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.name}
              required
              fullWidth
            />
          </Grid>
          <Grid className={classes.inputCustom} item xs={2}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              required
            >
              Activity type
            </InputLabel>
          </Grid>
          <Grid item xs={4} className='pr-5'>
            <Input
              onChange={onChangeInput}
              name="name"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.name}
              required
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

    </DialogContent>
  )
}


export default withStyles(styles)(CreateEventDialog)