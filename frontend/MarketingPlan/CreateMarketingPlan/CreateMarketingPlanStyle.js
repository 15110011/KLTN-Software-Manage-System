const styles = theme => ({
  root: {
    padding: 35
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
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
})

export default styles;