import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import styles from './NotificationStyles'

function Notification(props) {
  const { socket, classes, notifications } = props

  return (
    notifications.length > 0 ?
      notifications.map((notification, i) => {
        return (
          <List key={i} >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar className={classes.purpleAvatar}>S</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment >
                    <Typography style={{ display: 'inline-block', width: '230px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: "ellipsis" }} component="span" className={classes.inline} color="textPrimary">
                      {notification.content}
                    </Typography>
                  </React.Fragment>
                }
                secondary={"49 minutes ago"}
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
  )
}
export default withStyles(styles)(Notification)