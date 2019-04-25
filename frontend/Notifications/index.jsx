import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './NotificationStyles'
import 'react-perfect-scrollbar/dist/css/styles.css';
import * as PerfectScrollbar from 'react-perfect-scrollbar'
import { Scrollbars } from 'react-custom-scrollbars';

function Notification(props) {
  const { socket, classes, notifications } = props
  const handelScroll = e => {
    console.log(document.body.offsetHeight, document.body.scrollTop, document.body.scrollHeight)
    if (document.body.offsetHeight + document.body.scrollTop == document.body.scrollHeight) {
      console.log('end')
    }
  }
  return (
    <Scrollbars
      onScroll={handelScroll}
    >
      {
        notifications.length > 0 ?
          notifications.map((notification, i) => {
            return (
              <List key={i} >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={`${notification.avatar}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Duc Anh fix CSS"
                    secondary={
                      <React.Fragment >
                        <Typography style={{ display: 'inline-block', width: '230px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: "ellipsis" }} component="span" className={classes.inline} color="textPrimary">
                          {notification.content}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            )
          })
          : <ListItemText
            secondary={
              <React.Fragment >
                <Typography style={{ display: 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'height': '40px', 'marginTop': '5%' }} component="span" className={classes.inline} color="textPrimary">
                  No new notifications
                </Typography>
              </React.Fragment>
            }
          />
      }
    </Scrollbars>
  )
}
export default withStyles(styles)(Notification)