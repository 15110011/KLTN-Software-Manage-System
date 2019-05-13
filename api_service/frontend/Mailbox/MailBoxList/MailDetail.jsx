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
import BackIcon from '@material-ui/icons/ArrowBack';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './MailBoxListStyle.js'
import SideBarMailBox from './SideBarMailBox'

function MailDetail(props) {

  const { classes, history } = props

  const [expanded, setExpanded] = React.useState(false)
  const [noExpand, setNoExpand] = React.useState(true)
  const [open, setOpen] = React.useState(true)

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
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <IconButton onClick={() => history.push('/inbox')}>
                  <BackIcon fontSize="small" />
                </IconButton>
              </Grid>
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
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" className={classes.inline} color="textPrimary">
                        Ali Connors
              </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
        </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MailDetail);