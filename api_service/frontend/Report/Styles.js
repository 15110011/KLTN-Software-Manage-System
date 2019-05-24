const styles = theme => ({
  root: {
    width: '100%',
    padding: '20px'
  },
  paper: {
    padding: '20px'
  },
  borderBox: {
    '&> div:nth-child(1)': {
    padding: '10px !important',
    borderRadius: '2px'
  },
},
  removeBorder: {
    color: 'red',
    borderBottom: 'none !important'
    //   '&> span:nth-child(3)': {
    //     '&> input:nth-child(1)': {
    //       fontSize: '12px'
    //     }
    // }
    borderWidth: '0',
  },
  textField: {
    '&> div:nth-child(2)': {
      height: '48px',
      borderColor: '#dbdbdb',
      '&> fieldset:nth-child(1)': {
        borderRadius: '2px'
      }
    }
  }
});

export default styles