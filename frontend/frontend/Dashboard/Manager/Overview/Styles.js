import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
  primaryColor
} from "../../../components/material-dashboard-react";

const styles = (theme) => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },

  fixTable: {
    maxWidth: '90%',
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
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
  cardChartTitle: {
    color: '#3C4858',
    marginTop: '15px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    marginBottom: '0px',
    textDecoration: 'none',
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
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
  },
  activitytTagline: {
    color: '#999'
  }
})

export default styles