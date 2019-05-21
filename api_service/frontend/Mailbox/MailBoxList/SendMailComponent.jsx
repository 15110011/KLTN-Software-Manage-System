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

function SendMailComponent(props) {

  const { classes } = props;

  return (
    <Paper style={{ padding: '15px', marginTop: '20px' }}>
      <Grid container>
        <Grid item xs={12} style={{ display: 'inline-flex' }}>
          <ReplyIcon fontSize="small" />
          &nbsp;
          <Typography variant="span">
            Thao Nguyen
          </Typography>
        </Grid>
        &nbsp;
           <Editor
          // editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
        // onEditorStateChange={onEditorStateChange}
        />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', paddingTop: '15px', justifyContent: 'flex-end' }}>
        <Button
          variant="contained" color="primary" className={classes.button}>
          Send
          </Button>
        &nbsp;
          <Button
          onClick={() => setIsReply(false)}
          variant="contained" color="default" className={classes.button}>
          Cancel
          </Button>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(SendMailComponent);