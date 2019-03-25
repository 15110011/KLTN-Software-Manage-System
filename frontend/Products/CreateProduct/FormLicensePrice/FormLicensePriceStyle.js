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
    top: 0,
    right: 0
  }
})

export default styles;