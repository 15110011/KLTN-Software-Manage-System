const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  wrapAvatar: {
    display: 'inline-flex'
  },
  productAvatar: {
    backgroundColor: '#F1C40F',
    height: '50px',
    width: '50px',
    padding: '12px',
  },
  bgrMenuTab: {
    color: 'black',
    backgroundColor: '#fff',
    borderBottom: '1px solid #dddddd',
    boxShadow: 'none'
  },
  tabSelected: {
    borderBottom: '2px solid black !important'
  },
  cssLabel: {
    position: 'absolute',
    bottom: '0',
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
  },
  button: {
    margin: theme.spacing.unit,
  },
})

export default styles;