const drawerWidth = 240

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#1a355b',
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
    paddingRight: 24
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,

    backgroundColor: '#1a355b'
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
    backgroundColor: '#000',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
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
    backgroundColor: '#163a65db !important'
  },

  listItemText: {
    color: '#fff'
  },
  listItemIcon: {
    color: '#fff'
  },
  divider: {
    backgroundColor: 'rgba(196, 185, 185, 0.25)'
  }
})

export default styles
