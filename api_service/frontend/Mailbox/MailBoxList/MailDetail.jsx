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
import SendMailComponent from './SendMailComponent'
import { initMailWebsocket } from '../../common/Utils';

function MailDetail(props) {

  const { classes, history, backToInbox, user } = props

  const [expanded, setExpanded] = React.useState(null)
  const [noExpand, setNoExpand] = React.useState([])
  const [open, setOpen] = React.useState(true)
  const [isReply, setIsReply] = React.useState([])
  const [showReply, setShowReply] = React.useState(false)
  const [anchorElAdd, setAnchorElAdd] = React.useState(null)
  const [socket, setSocket] = React.useState(null)
  const [emails, setEmails] = React.useState([])
  

  React.useEffect(() => {
    const ws = initMailWebsocket(user.id)
    setSocket(ws)
    ws.onmessage = event => {
      let response = JSON.parse(event.data)
      setEmails(response)
      setIsReply(Array.from({ length: response.data.messages.length }, (v, i) => false))
      setNoExpand(Array.from({ length: response.data.messages.length }, (p, i) => true))
    }
  }, [])

  const handleClick = event => {
    setAnchorElAdd(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAdd(null);
  };

  const handleCloseReply = (i) => {
    let cloneIsReply = [...isReply]
    cloneIsReply[i] = false
    setIsReply(cloneIsReply)
  }

  const handleReply = (i) => {
    let cloneIsReply = [...isReply]
    cloneIsReply[i] = !cloneIsReply[i]
    setIsReply(cloneIsReply)
  }

  console.log(emails)



  const handleChange = panel => (event, expanded) => {
    // setExpanded(expanded ? panel : false);
    // setShowReply(!showReply)
    // setNoExpand(!noExpand)
  };

  const handleExpand = (i) => {
    let cloneNoExpand = [...noExpand]
    cloneNoExpand[i] = !cloneNoExpand[i]
    setNoExpand(cloneNoExpand)
  };
  console.log(emails)
  console.log(noExpand)

  const handleShowReply = () => {
    setShowReply(!showReply)
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
              {
                emails.data && emails.data.messages.map((e, i) => {
                  if (e.from.length > 0) {
                    let name = ''
                    let mail = ''
                    let fromName = e.from[0].match(/(.+) (<.+>)/)
                    name = fromName[1]
                    mail = fromName[2]
                    return (
                      <ListItem key={i} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar className={classes.pinkAvatar}>M</Avatar>
                        </ListItemAvatar>
                        <ExpansionPanel
                          style={{ margin: 'unset' }}
                          classes={{ root: classes.expandCus }}
                          // expanded={expanded === 'panel2'}
                          onChange={(e) => handleChange(i)}
                        >
                          <ExpansionPanelSummary
                            onClick={(e) => handleExpand(i)}
                            classes={{ expanded: classes.expandSumCus, content: classes.expandSumCus, root: classes.expandSumRoot }}
                          >
                            <ListItemText
                              primary={
                                name
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" className={classes.inline} color="textPrimary">
                                    {e.from ? 'to me' : mail}
                                  </Typography>
                                  {noExpand[i] &&
                                    <div dangerouslySetInnerHTML={{ __html: e.message }} className={classes.etcDot}>
                                    </div>
                                  }
                                </React.Fragment>
                              }
                            />
                            <ListItemText
                              secondary={<div style={{ fontSize: '12px', padding: '10px', textAlign: 'right' }}><i>May 10, 2019, 3:27 PM (10 days ago)</i></div>}
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing>
                              <Grid item xs={11}>
                                <Typography variant="span">
                                  <span className={classes.etcDot} dangerouslySetInnerHTML={{ __html: e.message }}></span>
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  onClick={(event) => {
                                    handleReply(i)
                                  }}
                                  style={{ outline: 'none', float: 'right' }}
                                >
                                  <ReplyIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                {
                                  isReply[i] &&
                                  <SendMailComponent
                                    handleCloseReply={() => handleCloseReply(i)}
                                    user={user}
                                    sendTo={}
                                  />
                                }
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </ListItem>
                    )
                  } else {
                    return (
                      <ListItem key={i} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar className={classes.pinkAvatar}>M</Avatar>
                        </ListItemAvatar>
                        <ExpansionPanel
                          style={{ margin: 'unset' }}
                          classes={{ root: classes.expandCus }}
                          // expanded={expanded === 'panel2'}
                          onChange={(e) => handleChange(i)}
                        >
                          <ExpansionPanelSummary
                            onClick={(e) => handleExpand(i)}
                            classes={{ expanded: classes.expandSumCus, content: classes.expandSumCus, root: classes.expandSumRoot }}
                          >
                            <ListItemText
                              primary={
                                "theaqvteam@gmail.com"
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography component="span" className={classes.inline} color="textPrimary">
                                  </Typography>
                                  {noExpand[i] &&
                                    <div dangerouslySetInnerHTML={{ __html: e.message }} className={classes.etcDot}>
                                    </div>
                                  }
                                </React.Fragment>
                              }
                            />
                            <ListItemText
                              secondary={<div style={{ fontSize: '12px', padding: '10px', textAlign: 'right' }}><i>May 10, 2019, 3:27 PM (10 days ago)</i></div>}
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing>
                              <Grid item xs={11}>
                                <Typography variant="span">
                                  <span className={classes.etcDot} dangerouslySetInnerHTML={{ __html: e.message }}></span>
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  onClick={(event) => {
                                    handleReply(i)
                                  }}
                                  style={{ outline: 'none', float: 'right' }}
                                >
                                  <ReplyIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                {
                                  isReply[i] &&
                                  <SendMailComponent
                                    handleCloseReply={() => handleCloseReply(i)}
                                    sendTo={}
                                  />
                                }
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </ListItem>
                    )
                  }
                })
              }
              <Divider />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.greenAvatar}>C</Avatar>
                </ListItemAvatar>
                <ExpansionPanel
                  style={{ margin: 'unset' }}
                  classes={{ root: classes.expandCus }}
                  // expanded={expanded === 'panel2'}
                  onChange={handleChange()}
                // onClick={handleShowReply}
                >
                  <ExpansionPanelSummary
                    classes={{ expanded: classes.expandSumCus, content: classes.expandSumCus, root: classes.expandSumRoot }}
                  >
                    <ListItemText
                      primary="Dang Van Minh"
                      secondary={
                        <React.Fragment>
                          <Typography component="span" className={classes.inline} color="textPrimary">
                            (+84) 374 834 476
                          </Typography>
                          {noExpand &&
                            <div className={classes.etcDot}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </div>
                          }
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      secondary={<div style={{ fontSize: '12px', padding: '10px', textAlign: 'right' }}><i>May 10, 2019, 3:27 PM (10 days ago)</i></div>}
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing>
                      <Grid item xs={12}>
                        <Typography variant="span">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </ListItem>
            </List>
            <Divider />

            <Grid container spacing={8}>
              {/* <Grid item xs={12}>
                {
                  isReply &&
                  <SendMailComponent />
                }
              </Grid> */}
              <Grid item xs={12}>
                {/* {
                  !isReply &&
                  <SendMailComponent />
                } */}
                <Button
                  onClick={handleClick}
                  style={{ margin: '15px 0 0 25px' }} variant="outlined" color="default" className={classes.button}>
                  &nbsp;
                  Add conversation
                  </Button>
                <Menu
                  anchorEl={anchorElAdd}
                  anchorOrigin={{ vertical: 'top', horizontal: 'between' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'between' }}
                  open={Boolean(anchorElAdd)}
                  onClose={() => setAnchorElAdd(null)}
                >
                  <MenuItem onClick={() => handleSendEmail()}>Send Mail</MenuItem>
                  <MenuItem onClick={() => handleSendEmail()}>Call</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div >
  )
}

export default withStyles(styles)(MailDetail);