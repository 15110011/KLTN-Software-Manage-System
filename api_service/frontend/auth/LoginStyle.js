const styles = theme => ({
  loginBorder: {
    padding: '100px',
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: '48px',
    height: '88vh'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'

  },
  danger: {
    color: '#f00',
    marginTop: '1rem',
    marginBottom: '1rem',

  },
  rightBorder: {
    backgroundColor: '#F5F5F5',
    borderLeft: '1px solid #707070',
    padding: '100px',
    height: '100%',
  }
})

export default styles;