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
import BackIcon from '@material-ui/icons/ArrowBack';
import ReplyIcon from '@material-ui/icons/Reply';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Editor } from "react-draft-wysiwyg";
import "../../common/react-draft-wysiwyg.css";
import styles from './MailBoxListStyle.js'
import SideBarMailBox from './SideBarMailBox'

function MailDetail(props) {

  const { classes, history, backToInbox } = props

  const [expanded, setExpanded] = React.useState(false)
  const [noExpand, setNoExpand] = React.useState(true)
  const [open, setOpen] = React.useState(true)
  const [isReply, setIsReply] = React.useState(false)
  const handleReply = () => {
    setIsReply(true)
  }
  const handleExpandMore = () => {
    setExpanded(!expanded)
    setNoExpand(!noExpand)
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={8}>
              {
                backToInbox &&
                <Grid item xs={12}>
                  <IconButton onClick={() => history.push('/inbox')}>
                    <BackIcon fontSize="small" />
                  </IconButton>
                </Grid>
              }
            </Grid>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.purpleAvatar}>T</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Dang Van Minh"
                  secondary={
                    <React.Fragment>
                      {
                        noExpand &&
                        <>
                          <Typography component="span" className={classes.inline} color="textPrimary">
                            {'<'}hepmy666@gmail.com{'>'}
                          </Typography>
                          <div onClick={handleExpandMore} className="my-3" style={{ color: 'black', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: 'dasdasdasd...' }}>

                          </div>
                        </>
                      }
                      {
                        expanded &&
                        <div onClick={handleExpandMore} className="my-3" style={{ color: 'black', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: '12asdasdasdasdasjasdhaskdhasdhk' }}>
                        </div>
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.purpleAvatar}>T</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Thao Nguyen"
                  secondary={
                    <React.Fragment>
                      {
                        noExpand &&
                        <>
                          <Typography component="span" className={classes.inline} color="textPrimary">
                            {'<'}thaocuvu@gmail.com{'>'}
                          </Typography>
                          <div onClick={handleExpandMore} className="my-3" style={{ color: 'black', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: 'dasdasdasd...' }}>
                          </div>
                        </>
                      }
                      {
                        expanded &&
                        <div onClick={handleExpandMore} className="my-3" style={{ color: 'black', cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: '12asdasdasdasdasjasdhaskdhasdhk' }}>
                        </div>
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Button
                    onClick={() => { handleReply() }}
                    style={{ margin: '15px 0 0 25px' }} variant="outlined" color="default" className={classes.button}>
                    <ReplyIcon fontSize="small" />
                    &nbsp;
                    Reply
                  </Button>
                </Grid>
                <Grid style={{ padding: '20px' }} item xs={12}>
                  {
                    isReply &&
                    <Paper style={{ padding: '15px' }}>
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
                  }
                </Grid>
              </Grid>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MailDetail);