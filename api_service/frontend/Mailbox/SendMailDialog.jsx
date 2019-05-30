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
import { apiPost } from '../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import { SEND_EMAIL, CONTACT_MARKETING_URL, REFRESH_TOKEN_URL } from '../common/urls';
import { BAD_REQUEST, } from "../common/Code";
import { htmlToState, draftToRaw } from "../common/Utils";
import { Editor } from "react-draft-wysiwyg";
import "../common/react-draft-wysiwyg.css";
import { apiPatch } from '../common/Request';

function SendMailDialog(props) {

  const { classes, sendTo, toggleDialog, user, onComplete, setMailDialog, setSuccessNoti } = props
  const [mail, setMail] = React.useState({
    user_id: user.id,
    to: sendTo.mail,
    from: 'theaqvteam@gmail.com',
    subject: '',
    message: ''
  })

  const [editorState, setEditorState] = React.useState(htmlToState(""))

  const [error, setError] = React.useState({})

  const onChangeInput = e => {
    setMail({ ...mail, [e.target.name]: e.target.value })
  }

  const onSendMail = () => {
    const data = {
      ...mail,
      message: draftToRaw(editorState),
    }
    apiPost(SEND_EMAIL, { data }, false, false)
      .then(res => {
        // notification()
        // setCreateCampaignDialog(false)
        onComplete(res.data)
      })
    setMailDialog(false)
    // notification('Successfully Sent')
    setSuccessNoti('Successfully Sent')
  }

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={toggleDialog}
        maxWidth="md"
        fullWidth
      >
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
                value={mail.from}
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
            <Grid item xs={10} className="pt-3">
              {/* <Input
              onChange={onChangeInput}
              name="text"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={user.text}
              fullWidth
            /> */}
              <Editor
                editorState={editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={onEditorStateChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button style={{ marginRight: '20px' }} variant="contained" color="primary" onClick={onSendMail}>SEND</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(SendMailDialog)

