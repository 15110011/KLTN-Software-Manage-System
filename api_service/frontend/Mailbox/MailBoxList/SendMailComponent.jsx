import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BackIcon from '@material-ui/icons/ArrowBack';
import ReplyIcon from '@material-ui/icons/Reply';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Editor } from "react-draft-wysiwyg";
import "../../common/react-draft-wysiwyg.css";
import styles from './MailBoxListStyle.js'
import SideBarMailBox from './SideBarMailBox'
// API
import { apiGet, apiPost } from '../../common/Request';
import { SEND_EMAIL, REFRESH_TOKEN_URL } from '../../common/urls'
import { BAD_REQUEST, } from "../../common/Code";
import { htmlToState, draftToRaw } from "../../common/Utils";


function SendMailComponent(props) {

  const { classes, handleCloseReply, user, data, sendTo } = props;
  const [sendEmail, setSendEmail] = React.useState({
    user_id: user.id,
    to: sendTo.mail,
    from: 'theaqvteam@gmail.com',
    subject: '',
    message: '',
    ...data,
    threadId: data.threadId.thread_id
  })
  const [editorState, setEditorState] = React.useState(htmlToState(""))


  const handleSendEmail = () => {
    const data = {
      ...sendEmail,
      message: draftToRaw(editorState),
    }
    apiPost(SEND_EMAIL, { data }, false, false)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              // notification()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          // notification()
          // setCreateCampaignDialog(false)
        }
      })
  }

  const onChangeSendMail = e => {
    setSendEmail({ [e.target.name]: e.target.value })
  }

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  console.log(sendTo)

  return (
    <Paper style={{ padding: '15px', marginTop: '20px' }}>
      <Grid container>
        <Grid item xs={12} style={{ display: 'inline-flex' }}>
          <ReplyIcon fontSize="small" />
          &nbsp;
          <Typography variant="span">
            {sendEmail.to}
          </Typography>
        </Grid>
        &nbsp;
           <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          onEditorStateChange={onEditorStateChange}
        />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', paddingTop: '15px', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleSendEmail()}
        >
          Send
          </Button>
        &nbsp;
          <Button
          onClick={() => handleCloseReply()}
          variant="contained" color="default" className={classes.button}>
          Cancel
          </Button>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(SendMailComponent);