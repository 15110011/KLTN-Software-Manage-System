import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: '11px',
    marginBottom: '30px'
  }
})

const Breadcrumb = (props) => {
  return (
    <Paper classes={{
      root: props.classes.root
    }}>
      {props.children}
    </Paper >
  )
}
export default withStyles(styles)(Breadcrumb)


