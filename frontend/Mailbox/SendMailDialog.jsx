import * as React from 'react'

import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/core/AccessTime'

import * as dateFns from 'date-fns'

import { Input, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import styles from './MailboxStyles'
import { apiPost } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import { GMAIL_SEND_URL, CONTACT_MARKETING_URL } from '../../common/urls';


function SendMailDialog(props) {

  const { classes, contact, toggleDialog, user, updateMailMetric } = props
  const [mail, setMail] = React.useState({
    subject: '',
    to: contact ? contact.mail : '',
    text: ''
  })

  const [error, setError] = React.useState({})

  const onChangeInput = e => {
    setMail({ ...mail, [e.target.name]: e.target.value })
  }

  const onSendMail = () => {

    apiPost(GMAIL_SEND_URL, mail, false, true).then(res => {
    })
    if (updateMailMetric) {
      updateMailMetric()
    }
  }

  return (
    <Dialog open={true} onClose={toggleDialog}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <Grid container spacing={8}>
          <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
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
          <Grid item xs={10}>
            <Input
              onChange={onChangeInput}
              name="subject"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={mail.subject}
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
              To
            </InputLabel>
          </Grid>
          <Grid item xs={10}>
            <Input
              onChange={onChangeInput}
              name="to"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={mail.to}
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
            >
              From
            </InputLabel>
          </Grid>
          <Grid item xs={10}>
            <Input
              name="from"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={user.email}
              fullWidth
              disabled
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
              Content
            </InputLabel>
          </Grid>
          <Grid item xs={10}>
            <Input
              onChange={onChangeInput}
              name="text"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={user.text}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSendMail}>SEND</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(SendMailDialog)

