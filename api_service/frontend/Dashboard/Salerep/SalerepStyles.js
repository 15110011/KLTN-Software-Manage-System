const styles = (theme) => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },

  fixTable: {
    maxWidth: '90%',
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  btnGreen: {
    color: '#FFF',
    backgroundColor: '#4CAF50',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#347f37'
    }
  },
  btnPink: {
    color: '#FFF',
    backgroundColor: '#E10050',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#b20442'
    }
  },
  btnBlue: {
    color: '#FFF',
    backgroundColor: '#17A2B8',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#106c7b'
    }
  },
  btnYellow: {
    color: '#FFF',
    backgroundColor: '#FFC107',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#b28808'
    }
  },
  btnPurple: {
    color: '#FFF',
    backgroundColor: '#3F51B5',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#222D6E'
    }
  },
  btnRed: {
    color: '#FFF',
    backgroundColor: '#E30000',
    minWidth: 'unset',
    padding: '6px 6px !important',
    "&:hover": {
      backgroundColor: '#840909'
    }
  },
  rootTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'unset'
  },
  linkStyle: {
    color: '#007bff',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline'
    }
  },
  smallIconBtn: {
    fontSize: '16px'
  },
  noteContentRoot: {
    cursor: 'pointer',
    padding: '24px 24px 24px',
    maxHeight: '600px',
    '&:hover': {
      borderRadius: '4px',
      backgroundColor: '#f4f5f7',
      borderBottomColor: 'rgba(9,30,66,.25)'
    }
  },
  activityTagline: {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: '#707070',
    display: 'inline',
    alignSelf: 'center'
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  inputHeaderCustom: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333'
  },
  inputCustom: {
    fontSize: '15px',   
     color: '#333333'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    position: 'absolute',
    zIndex: '1000',
    right: '25px',
    top: '16px',
    color: '#fff',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:focus': {
      outline: 'none !important'
    }
  },
  expand_map: {
    position: 'absolute',
    zIndex: '1000',
    right: '14px',
    top: '7px',
    color: '#fff',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:focus': {
      outline: 'none !important'
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  tableCus: {
    '& div:nth-child(1)': {
      '& table:nth-child(1)': {
        tableLayout: 'fixed'
      }
    }
  }
})


export default styles