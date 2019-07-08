const styles = theme => ({
  border: {
    border: '1px dotted #999',
    height: 300,
    width: '100%',
    position: 'relative',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  iconCus: {
    color: '#707070',
  },
  dialogRoot: {
    overflowY: 'unset',
  },
});

export default styles;
