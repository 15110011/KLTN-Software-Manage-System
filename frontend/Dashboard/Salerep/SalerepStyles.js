const styles = (theme) => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },

  fixTable: {
    maxWidth: '90%',
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  btnGreen: {
    color: '#FFF',
    backgroundColor: '#4CAF50',
    "&:hover": {
      backgroundColor: '#347f37'
    }
  },
  btnPink: {
    color: '#FFF',
    backgroundColor: '#E10050',
    "&:hover": {
      backgroundColor: '#b20442'
    }
  },
  btnBlue: {
    color: '#FFF',
    backgroundColor: '#17A2B8',
    "&:hover": {
      backgroundColor: '#106c7b'
    }
  },
  btnYellow: {
    color: '#FFF',
    backgroundColor: '#FFC107',
    "&:hover": {
      backgroundColor: '#b28808'
    }
  },
  rootTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'unset'
  },
  linkStyle: {
    color: '#007bff',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#0056b3',
      textDecoration: 'underline'
    }
  }
})


export default styles