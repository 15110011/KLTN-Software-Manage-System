import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 12
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  inline: {
    fontSize: '0.75rem',
    color: '#707070'
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
  etcDot: {
    whiteSpace: 'nowrap';
    overflow: 'hidden';
    textOverflow: 'ellipsis';
  },
  titleContent: {
    display: 'inline-flex'
  },
  checkboxWidth: {
    width: 20
  },
  fromWidth: {
    width: 200
  },
  dateWidth: {
    width: 100,
    color: '#707070'
  },
  rowData: {
    '&:hover': {
      cursor: 'pointer',
      boxShadow: 'inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)';
      zIndex: 1;
      borderRadius: '3px'
    }
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export default styles;