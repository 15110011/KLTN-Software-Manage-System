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
    bottom: 20,
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
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
  backButton: {
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
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
});

export default styles;