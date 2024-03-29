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
    top: 14,
    marginBottom: '0',
    textAlign: 'left'
  },
  cssLabelBot20: {
    position: 'absolute',
    bottom: 20,
    marginBottom: '0',
    textAlign: 'left'
  },
  selectEmpty: {
    textAlign: 'left'
  },

  linkStyleCustom: {
    color: '#007bff',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 2,
    left: '30%',
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline'
    }
  },
  iconSuperSmall: {
    fontWeight: '16px'
  }
})

export default styles;
