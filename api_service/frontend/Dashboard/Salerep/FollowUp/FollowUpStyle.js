const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '15px 35px'
  },
  stepPaper: {
    padding: '25px'
  },
  cssLabel: {
    position: 'absolute',
    bottom: 0,
  },
  paper: {
    width: '100%',
    padding: '0 16px',
    height: '100vh'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  formContact: {
    borderRadius: '4px',
    width: '100%',
    height: '80%',
    overflow: 'scroll',
    '& ul': {
      marginBottom: 'unset',
      listStyleType: 'none',
      padding: '0px 10px',
      '& li': {
        border: '0.5px solid #E0E0E0',
        borderRadius: '4px',
        padding: '10px',
        fontSize: '15px',
        lineHeight: '30px',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#f4f5f7',
          borderBottomColor: 'rgba(9,30,66,.25)'
        },
        
      }
    },
  },
  inputHeaderCustom: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333'
  },
  inputCustom: {
    fontSize: '15px',
    position: 'relative'
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
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  btnStatusActive: {
    color: '#FFF',
    backgroundColor: '#03A00F',
    width: '50px',
    minWidth: 'unset',
    height: '25px',
    fontSize: '10px',
    padding: 3,
    "&:hover": {
      backgroundColor: '#347f37'
    }
  },
  btnStatusIdle: {
    color: '#FFF',
    backgroundColor: '#FFC107',
    width: '50px',
    minWidth: 'unset',
    height: '25px',
    fontSize: '10px',
    padding: 3,
    "&:hover": {
      backgroundColor: '#b28808'
    }
  },
  btnStatusFinished: {
    color: '#FFF',
    backgroundColor: '#E30000',
    width: 'auto',
    minWidth: 'unset',
    height: '25px',
    fontSize: '10px',
    padding: 3,
    minWidth: '25px',
    "&:hover": {
      backgroundColor: '#840909'
    }
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
  sort: {
    color: '#333333',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:focus': {
      outline: 'none !important'
    }
  },
  sortDesc: {
    transform: 'rotate(180deg)',
  }
})


export default styles