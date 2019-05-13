const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fixTable: {
    maxWidth: '90%',
  },
  cssLabel: {
    position: 'absolute',
    bottom: 20,
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
  },
  textField: {
    width: 250,
    marginTop: '16px',
    marginBottom: '16px'
  },
  // container: {
  //   width: 100
  // },
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
  addIcon: {
    marginLeft: theme.spacing.unit
  },
  addFeatureButton: {
    padding: 10
  },
  groupPublic: {
    color: '#3f51b5'
  },
  groupPrivate: {
    color: '#8BC34A'
  },
});

export default styles;