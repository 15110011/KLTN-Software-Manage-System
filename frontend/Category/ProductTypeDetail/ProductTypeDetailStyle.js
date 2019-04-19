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
  inputCustom: {
    position: 'relative',
    '& label': {
      position: 'absolute',
      top: 40
    }
  },
  inputCustomName: {
    position: 'relative',
    '& label': {
      position: 'absolute',
      bottom: 0
    }
  },
});

export default styles;