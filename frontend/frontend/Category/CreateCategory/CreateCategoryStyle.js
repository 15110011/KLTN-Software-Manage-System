const styles = theme => ({
  root: {
    padding: 35
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