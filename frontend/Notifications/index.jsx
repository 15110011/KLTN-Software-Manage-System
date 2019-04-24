import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './NotificationStyles'

function Notification(props) {
  const { socket, classes, notifications } = props
  return (
    <>
      {
        notifications && notifications.notifications.map((notification, i) => {
          return (
            <List key={i}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`${notification.avatar}`} />
                </ListItemAvatar>
                <ListItemText
                  primary="Duc Anh fix CSS"
                  secondary={
                    <React.Fragment>
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
      }
    </>
  )
}
export default withStyles(styles)(Notification)