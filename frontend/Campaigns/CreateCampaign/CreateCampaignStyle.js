const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  },
  inputCustom: {
    position: 'relative'
  },
  cssLabel: {
    position: 'absolute',
    top: 35,
    marginBottom: '0',
    textAlign: 'left'
  },
  selectEmpty: {
    textAlign: 'left'
  }
})

export default styles;
