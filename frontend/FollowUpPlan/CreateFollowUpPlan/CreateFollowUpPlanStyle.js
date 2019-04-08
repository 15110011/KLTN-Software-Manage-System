const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
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
    right: theme.spacing.unit * 3,
    top: '20%'
  },
  danger: {
    color: '#f00',
    marginTop: '1rem',
    marginBottom: '1rem',

  },
})

export default styles