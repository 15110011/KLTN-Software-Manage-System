const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  deleteStep: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
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
  stepper: {
    border: '3px solid white',
    boxShadow: '0 1px 20px 0 rgba(0,0,0,0.16)'
  },
  fab: {
    position: 'absolute',
    top: '74%',
    left: '54%'
  },
  danger: {
    color: '#f00',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  addStep: {
    '& div + span': {
      '&> span:nth-child(1)': {
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.38)',
        color: '#fff',
        borderRadius: '50%',
      }
    }
  },
  fixButton: {
    '& span:nth-child(1)': {
      color: '#fff',
      height: 25,
      cursor: 'pointer',
      padding: 1,
      borderRadius: '50%',
      backgroundColor: '#a6a6a6'
    }
  },
  cssLabel: {
    position: 'absolute',
    top: 24,
    marginBottom: '0'
  },
  cssLabel40px: {
    position: 'absolute',
    top: 40,
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
  },
  linkStyleCustom: {
    color: '#007bff',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 20,
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline'
    }
  },
  activityTagline: {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: '#707070',
    display: 'inline',
    alignSelf: 'center',
  },
})

export default styles