import { relative } from "path";

const styles = theme => ({
  borderForm: {
    backgroundColor: '#e0e0e04f',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    position: 'relative'
  },
  removeBtn: {
    position: 'absolute',
    height: 25,
    width: 25,
    backgroundColor: '#a6a6a6',
    borderRadius: '50%',
    padding: '1px',
    top: '-5px',
    right: '-5px', 
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5d6067'
    }
  },
})

export default styles;