const styles = theme => ({
  border: {
    border: '1px dotted #999',
    height: 300,
    width: '100%',
    position: 'relative',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  main: {
    position: 'absolute',
    top: '35%',
    left: '45%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  iconCus: {
    color: '#707070'
  }
})


export default styles