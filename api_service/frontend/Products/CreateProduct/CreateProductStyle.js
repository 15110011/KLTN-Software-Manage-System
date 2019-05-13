import { relative } from "path";

import { relative } from "path";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cssLabel: {
    position: 'absolute',
    bottom: 20,
    marginBottom: '0'
  },
  inputCustom: {
    position: 'relative'
  },
  textField: {
    width: 250,
    marginTop: '16px',
    marginBottom: '16px'
  },
  // container: {
  //   width: 100
  // },
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
  addIcon: {
    marginLeft: theme.spacing.unit
  },
  addFeatureButton: {
    padding: 10
  },
  'sum-row: parent': {
    color: 'red !important'
  },
  textFieldCustom: {
    width: 70
  },
});

export default styles;