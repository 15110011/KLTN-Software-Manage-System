const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    width: 250,
    marginTop: '16px',
    marginBottom: '16px'
  },
  container: {
    width: 100
  },
  formFeature: {
    width: 150
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
  cssLabel: {
    position: 'absolute',
    bottom: 8,
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
  },
});

export default styles;