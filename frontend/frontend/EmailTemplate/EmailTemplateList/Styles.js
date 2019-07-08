const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
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

  editableContent: {
    cursor: 'pointer',
    '&:hover': {
      borderRadius: '4px',
      backgroundColor: '#f4f5f7',
      borderBottomColor: 'rgba(9,30,66,.25)'
    }
  },
})

export default styles;