import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import cn from 'classnames'
// @material-ui
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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
import CampaignIcon from '@material-ui/icons/GolfCourse';
import TheaterIcon from '@material-ui/icons/Theaters';
import MarketingListIcon from '@material-ui/icons/ListAlt';
import EmailTemplateIcon from '@material-ui/icons/MailOutline';
import FollowUpPlanIcon from '@material-ui/icons/FindInPage';
import InventoryIcon from '@material-ui/icons/Store';
import ProductIcon from '@material-ui/icons/Archive';
import InvoiceIcon from '@material-ui/icons/Receipt';
import SaleOrderIcon from '@material-ui/icons/Description';
import DealIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';
import ProductivityIcon from '@material-ui/icons/Timeline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReportIcon from '@material-ui/icons/Report';
import ConversationIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import NoteIcon from '@material-ui/icons/Note';
import ToolIcon from '@material-ui/icons/Build'
import CalendarIcon from '@material-ui/icons/CalendarToday';
import AccountCircle from '@material-ui/icons/PersonPin';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { initWebsocket } from '../common/Utils'


import styles from './styles.js'
import Notification from '../Notifications/index'

const SidebarComponent = props => {
  const { openSidebar, classes, selecting, user } = props
  const [toggle, setToggle] = React.useState(true)
  const [toggle1, setToggle1] = React.useState(true)
  const [toggle2, setToggle2] = React.useState(true)
  const [toggle3, setToggle3] = React.useState(true)
  const [toggle4, setToggle4] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [noti, setNoti] = React.useState(false)
  const [notificationData, setNotificationData] = React.useState([])
  const [socket, setSocket] = React.useState(null)

  let anchorel1 = null;
  // let socket = null
  React.useEffect(() => {
    if (user.id) {
      const ws = initWebsocket(user.id)
      setSocket(ws)
      ws.onmessage = event => {
        const notifications = JSON.parse(event.data)
        if (notifications.type) {
          if (notifications.type === 'create') {
            let curNotification = [...notificationData]
            curNotification.push(notifications.notifications)
            setNotificationData([...curNotification])
            return
          }
        }
        if (notifications.type === 'update') {
          setNotificationData([...notifications.notifications])
          return
        }
        setNotificationData(notifications.notifications)
      }

    }
  }, [user.id])

  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseNoti = e => {
    if (anchorel1.contains(e.target)) {
      return;
    }
    setNoti(false)
    if (notificationData.filter(value => value.is_seen === false).length > 0) {
      socket.send(JSON.stringify({
        'type': 'update',
        'data': notificationData
      }))
    }
  }

  const handleClickNotification = () => {
    setNoti(!noti)
    if (noti) {
      if (notificationData.filter(value => value.is_seen === false).length > 0) {
        socket.send(JSON.stringify({
          'type': 'update',
          'data': notificationData
        }))
      }
    }
  }

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
            classes={{ root: classes.bgrmenuBar }}
          >
            <MenuIcon className={cn(classes.menuBarButton)} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton
              style={{ position: 'relative' }}
              color="inherit"
              buttonRef={node => {
                anchorel1 = node;
              }}
              aria-owns={noti ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleClickNotification}
            >
              <Badge badgeContent={
                notificationData &&
                notificationData.filter(value => value.is_seen === false).length
              } color="secondary">
                <NotificationsIcon
                  className={classes.rightIcon}
                />
              </Badge>
            </IconButton>
            <Popper style={{ position: 'absolute', right: '45px', width: '330px' }} open={noti} anchorEl={anchorel1} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper
                    style={{ maxHeight: '350px', overflow: 'scroll' }}
                  >
                    <ClickAwayListener onClickAway={handleCloseNoti}>
                      <Notification notifications={notificationData} />
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <IconButton
              aria-owns={Boolean(anchorEl) ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.rightIcon} />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >

          <MenuItem>{user.username == 'admin' ? 'Admin' : user.username}</MenuItem>
          <MenuItem onClick={() => props.history.push('/logout')}>Log out</MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: cn(
            classes.drawerPaper,
            !openSidebar && classes.drawerPaperClose
          ),
          root: classes.drawerRoot,
        }}
        open={openSidebar}
      >
        <div className={classes.toolbarIcon}>
          <Typography style={{ cursor: 'pointer' }} onClick={() => { props.history.push('/dashboard') }} component="h1" variant="h6" color="inherit">
            Manage System
          </Typography>
          <IconButton onClick={props.onToggleDrawer} color="inherit">
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider light />
        <List>
          {
            !user.is_superuser &&
            <>
              <ListItem style={{ cursor: 'pointer' }} onClick={() => props.history.push('/contacts')} classes={{ selected: classes.listItemSlected }} selected={selecting == 'contacts'}>
                <ListItemIcon>
                  <PersonalIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="CONTACT" classes={{ primary: classes.listItemTextHeader }} />
              </ListItem>
              <Divider classes={{ root: classes.divider }} />
            </>
          }
          {
            !user.is_superuser &&
            <>
              <ListItem button classes={{ root: classes.listItemBgr, selected: classes.listItemSlected }}
                onClick={() => setToggle(!toggle)}
              // classes={{ selected: classes.listItemSlected }}
              >
                <ListItemIcon>
                  <TheaterIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText
                  primary="MARKETING"
                  classes={{ primary: classes.listItemTextHeader }}
                />
                {toggle ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={toggle} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    classes={{ selected: classes.listItemSlected }}
                    selected={selecting == 'marketing-plans'}
                    button
                    className={classes.nested}
                    onClick={() => props.history.push('/marketing-plans')}>
                    <ListItemIcon>
                      <MarketingListIcon classes={{ root: classes.listItemIcon }} />
                    </ListItemIcon>
                    <ListItemText inset primary="Marketing Plans" classes={{ primary: classes.listItemText }} />
                  </ListItem>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => props.history.push('/email-templates')}
                    classes={{ selected: classes.listItemSlected }}
                    selected={selecting == 'email-templates'}
                  >
                    <ListItemIcon>
                      <EmailTemplateIcon classes={{ root: classes.listItemIcon }} />
                    </ListItemIcon>
                    <ListItemText inset primary="Email Templates" classes={{ primary: classes.listItemText }} />
                  </ListItem>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => props.history.push('/follow-up-plans')}
                    classes={{ selected: classes.listItemSlected }}
                    selected={selecting == 'follow-up-plans'}
                  >
                    <ListItemIcon>
                      <FollowUpPlanIcon classes={{ root: classes.listItemIcon }} />
                    </ListItemIcon>
                    <ListItemText inset primary="Follow-up Plans" classes={{ primary: classes.listItemText }} />
                  </ListItem>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => props.history.push('/campaigns')}
                    classes={{ selected: classes.listItemSlected }}
                    selected={selecting == 'campaigns'}
                  >
                    <ListItemIcon>
                      <CampaignIcon classes={{ root: classes.listItemIcon }} />
                    </ListItemIcon>
                    <ListItemText inset primary="Campaigns" classes={{ primary: classes.listItemText }} />
                  </ListItem>
                </List>
              </Collapse>
            </>
          }
          <Divider classes={{ root: classes.divider }} />
          <ListItem button classes={{ root: classes.listItemBgr, selected: classes.listItemSlected }}
            onClick={() => setToggle1(!toggle1)}
          >
            <ListItemIcon>
              <InventoryIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText
              primary="INVENTORY"
              classes={{ primary: classes.listItemTextHeader }}
            />
            {toggle1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/stocks')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'stocks'}
              >
                <ListItemIcon>
                  <CategoryIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Category & Type" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/products')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'products'}
              >
                <ListItemIcon>
                  <ProductIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Products" classes={{ primary: classes.listItemText }} />
              </ListItem>
              {/* <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/invoices')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'invoices'}
              >
                <ListItemIcon>
                  <InvoiceIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Invoices" classes={{ primary: classes.listItemText }} />
              </ListItem> */}
              {/* <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/orders')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'orders'}
              >
                <ListItemIcon>
                  <SaleOrderIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Sale Orders" classes={{ primary: classes.listItemText }} />
              </ListItem> */}
              {/* <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/deals')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'deals'}
              >
                <ListItemIcon>
                  <DealIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Deals" classes={{ primary: classes.listItemText }} />
              </ListItem> */}
            </List>
          </Collapse>
          <Divider classes={{ root: classes.divider }} />
          <ListItem button classes={{ root: classes.listItemBgr, selected: classes.listItemSlected }}
            onClick={() => setToggle2(!toggle2)}
          >
            <ListItemIcon>
              <ProductivityIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText
              primary="PRODUCTIVITY"
              classes={{ primary: classes.listItemTextHeader }}
            />
            {toggle2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/dashboard')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'dashboard'}
              >
                <ListItemIcon>
                  <DashboardIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Dashboard" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/report')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'report'}
              >
                <ListItemIcon>
                  <ReportIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Reports" classes={{ primary: classes.listItemText }} />
              </ListItem>
            </List>
          </Collapse>
          <Divider classes={{ root: classes.divider }} />
          {/* <ListItem button classes={{ root: classes.listItemBgr, selected: classes.listItemSlected }}
            onClick={() => setToggle3(!toggle3)}
          >
            <ListItemIcon>
              <ConversationIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText
              primary="CONVERSATION"
              classes={{ primary: classes.listItemTextHeader }}
            />
            {toggle3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/inbox')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'inbox'}
              >
                <ListItemIcon>
                  <InboxIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" classes={{ primary: classes.listItemText }} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/notes')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'notes'}
              >
                <ListItemIcon>
                  <NoteIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Notes" classes={{ primary: classes.listItemText }} />
              </ListItem>
            </List>
          </Collapse> */}
          <Divider classes={{ root: classes.divider }} />
          <ListItem button classes={{ root: classes.listItemBgr, selected: classes.listItemSlected }}
            onClick={() => setToggle4(!toggle4)}
          >
            <ListItemIcon>
              <ToolIcon classes={{ root: classes.listItemIcon }} />
            </ListItemIcon>
            <ListItemText
              primary="TOOLS"
              classes={{ primary: classes.listItemTextHeader }}
            />
            {toggle4 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={toggle4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => props.history.push('/calendar')}
                classes={{ selected: classes.listItemSlected }}
                selected={selecting == 'calendar'}
              >
                <ListItemIcon>
                  <CalendarIcon classes={{ root: classes.listItemIcon }} />
                </ListItemIcon>
                <ListItemText inset primary="Calendar" classes={{ primary: classes.listItemText }} />
              </ListItem>
              {
                user.is_superuser &&
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => props.history.push('/settings')}
                  classes={{ selected: classes.listItemSlected }}
                  selected={selecting == 'settings'}
                >
                  <ListItemIcon>
                    <SettingsIcon classes={{ root: classes.listItemIcon }} />
                  </ListItemIcon>
                  <ListItemText inset primary="Settings" classes={{ primary: classes.listItemText }} />
                </ListItem>}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  )
}
export default withStyles(styles)(withRouter(SidebarComponent))
