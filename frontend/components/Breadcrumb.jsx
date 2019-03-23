import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: '11px',
    marginBottom: '10px'
  }
})

const Breadcrumb = (props) => {
  return (
    <div classes={{
      root: props.classes.root
    }}>
      {props.children}
    </div>
  )
}
export default withStyles(styles)(Breadcrumb)