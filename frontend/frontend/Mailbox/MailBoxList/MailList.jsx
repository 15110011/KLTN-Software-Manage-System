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
import SideBarMailBox from './SideBarMailBox'


import styles from './MailBoxListStyle.js'


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '12px' }}>
      {children}
    </Typography>
  );
}

let id = 0;
function createData(from, title, content, date) {
  id += 1;
  return { id, from, title, content, date };
}

const rows = [
  createData('Frozen yoghurt', 'Title', 'This is content', '05/10/2019'),
  createData('Frozen yoghurt', 'Title', 'This is content', '05/10/2019'),
  createData('Frozen yoghurt', 'Title', 'This is content', '05/10/2019'),
  createData('Frozen yoghurt', 'Title', 'This is content', '05/10/2019'),
  createData('Frozen yoghurt', 'Title', 'This is content', '05/10/2019'),
];

function MailList(props) {

  const {
    classes,
    value,
    handleChange,
    history,
    emails
  } = props;
  const [open, setOpen] = React.useState(true)


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Primary"
              icon={<InboxIcon />}
            />
            {/* <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Tab 2"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Tab 3"
              /> */}
          </Tabs>
          {value === 0 &&
            <TabContainer>
              <Table className={classes.table}>
                <TableBody>
                  {/* {emails.data.length > 0
                    ? emails.data.map((email, i) => {
                      return ( */}
                  <TableRow
                    // key={i}
                    onClick={() => history.push('/inbox/11')}
                    className={classes.rowData}
                  >
                    <TableCell className={classes.checkboxWidth} padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell className={classes.fromWidth} align="left">Dang Van Minh</TableCell>
                    <TableCell align="left">
                      <div className={classes.titleContent}>
                        <div>
                          {/* {email.subject.reduce((acc, c) => {
                                  acc += ' '
                                  return acc
                                }).slice(0, -1)} */}
                          ádsadasdsa
                              </div>
                        <div item xs={10} className={classes.etcDot}>
                          &nbsp;-&nbsp;
                                <span>12321312jsdsdssdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdjjdjdjdj3</span>
                          {/* {
                                dangerouslySetInnerHTML={{ __html: email.message }}>
                              } */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.dateWidth} align="right"><i>{}</i></TableCell>
                  </TableRow>
                  {/* )
                    })
                    : <div className={classes.titleContent}>No emails in your mailbox</div>
                  } */}
                </TableBody>
              </Table>
            </TabContainer>}
          {/* {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>} */}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MailList);