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


import styles from './MailBoxListStyle.js'

function SideBarMailBox(props) {

  const {
    classes,
    handleClick,
    setOpen
  } = props;

  return (
    <div>
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText inset primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Drafts" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MoveToInbox />
          </ListItemIcon>
          <ListItemText inset primary="Inbox" />
        </ListItem>
      </List>
    </div>
  )
}

export default withStyles(styles)(SideBarMailBox);