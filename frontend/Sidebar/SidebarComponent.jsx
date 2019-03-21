import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import cn from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonalIcon from '@material-ui/icons/PersonOutlined'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles.js'

const SidebarComponent = props => {
  const { openSidebar, classes, selecting } = props
  const [toggle, setToggle] = React.useState({

  })

  return (
    <>
      <AppBar
        position="absolute"
        className={cn(classes.appBar, openSidebar && classes.appBarShift)}
      >
        <Toolbar disableGutters={!openSidebar} className={cn(classes.toolbar)}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.onToggleDrawer}
            className={cn(
              classes.menuButton,
              openSidebar && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
          </Typography>
          <IconButton color="inherit">
            {localStorage.getItem('login') && (
              <Link
                to="/logout"
                className="btn btn-primary bg-transparent border-0"
              >
                Log out
              </Link>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: cn(
            classes.drawerPaper,
            !openSidebar && classes.drawerPaperClose
          ),
          root: classes.drawerRoot
        }}
        open={openSidebar}
      >
        <div className={classes.toolbarIcon}>
          <Typography component="h1" variant="h6" color="inherit">
            Manage System
          </Typography>
          <IconButton onClick={props.onToggleDrawer} color="inherit">
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider light />
        <List>
          <ListItem button classes={{root: classes.listItemBgr}}>
            <ListItemIcon>
              <PersonalIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText inset primary="CONTACT" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button selected classes={{root: classes.listItemBgr, selected: classes.listItemSlected}}
            onClick={() => setToggle(!toggle)} className={classes.nested}
            // classes={{ selected: classes.listItemSlected }}
          >
            <ListItemIcon>
              <PersonalIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText 
              primary="MARKETING"
              classes={{ primary: classes.listItemText }}
            />
            {toggle ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Campaigns" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Marketing list" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Email templates" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Follow-up plan" classes={{ primary: classes.listItemText }} />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button classes={{root: classes.listItemBgr}}
            onClick={() => setToggle(!toggle)} className={classes.nested}
            classes={{ selected: classes.listItemSlected }}
          >
            <ListItemIcon>
              <PersonalIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText
              primary="INVENTORY"
              classes={{ primary: classes.listItemText }}
            />
            {toggle ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Campaigns" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Marketing list" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Email templates" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText inset primary="Follow-up plan" classes={{ primary: classes.listItemText }} />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider classes={{ root: classes.divider }} />
      </Drawer>
    </>
  )
}
export default withStyles(styles)(withRouter(SidebarComponent))
