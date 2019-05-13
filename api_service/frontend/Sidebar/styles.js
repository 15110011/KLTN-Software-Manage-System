const drawerWidth = 240

const styles = theme => ({
  rightIcon: {
    color: '#fff',
    '& span': {
      color: '#fff'
    }
  },
  menuBarButton: {
    color: '#FFF',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#fff',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,

  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: 'linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://demos.creative-tim.com/material-dashboard-pro-react/static/media/sidebar-2.d30c9e30.jpg)',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    backgroundSize: 'cover',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.down('xs')]: {
      width: 0
    }
  },
  drawerRoot: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      position: 'absolute',
      height: '100%'
    }
  }
  ,
  nested: {
    // paddingLeft: theme.spacing.unit * 4,
    '&:hover': {
      backgroundColor: '#163a65db'
    }
  },
  listItemSlected: {
    borderRadius: '5px',
    background: '#00acc1 !important',
    boxShadow: '0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)'
  },
  // listItemBgr: {
  //   fontWeight: '500'
  // },
  listItemText: {
    color: '#fff',
    fontWeight: '400'
  },
  listItemTextHeader: {
    color: '#fff',
    fontWeight: '500'
  },
  listItemIcon: {
    color: '#fff'
  },
  divider: {
    backgroundColor: 'rgba(196, 185, 185, 0.25)'
  },
  nested: {
  },
  toolbar: {
    background: 'linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://demos.creative-tim.com/material-dashboard-pro-react/static/media/sidebar-2.d30c9e30.jpg)',
    backgroundSize: 'cover',
  },
  notiSection: {
    '&button': {
      position: 'relative'
    }
  }
})

export default styles
