import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MailDetail from './MailDetail'
import SideBarMailBox from './SideBarMailBox'
import MailList from './MailList'
import styles from './MailBoxListStyle.js'
import { initMailWebsocket } from '../../common/Utils';




function MailBoxList(props) {

  const { classes, history, user } = props;

  const [value, setValue] = React.useState(0)
  const [mailDetail, setMailDetail] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const [socket, setSocket] = React.useState(null)
  const [emails, setEmails] = React.useState(null)


  React.useEffect(() => {
    const ws = initMailWebsocket(user.id)
    setSocket(ws)
    ws.onmessage = event => {
      setEmails(JSON.parse(event.data))
    }
  }, [])



  const handleChange = (event, value) => {
    setValue(value)
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleViewDetail = (event, id) => {
    setMailDetail(true)
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper>
            <SideBarMailBox
              handleClick={handleClick}
              setOpen={setOpen}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <MailList
              handleViewDetail={handleViewDetail}
              handleChangeIndex={handleChangeIndex}
              handleChange={handleChange}
              emails={emails}
              value={value}
              history={history}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MailBoxList);