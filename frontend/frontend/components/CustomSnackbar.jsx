import * as React from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  completeNotice: {
    backgroundColor: '#68d668db'
  },
  errNotice: {
    backgroundColor: '#ff000078'
  }
})


function CustomSnackbar(props) {
  const [completeNotice, setCompleteNotice] = React.useState(true)
  const [errNotice, setErrNotice] = React.useState(true)

  const { classes, isSuccess, isErr, msg } = props

  return (
    <>
      {
        isErr ? <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={errNotice}
        autoHideDuration={2000}
        ContentProps={{
          classes: {
            root: classes.errNotice
          }
        }}
        onClose={() => { setErrNotice(false) }}
        message={
          <div >
            {msg}
          </div>
        }
      /> :
       <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={true}
        ContentProps={{
          classes: {
            root: classes.completeNotice
          }
        }}
        // onClose={() => { setCompleteNotice(false) }}
        message={
          <div >
            {msg}
          </div>
        }
      />
      }
    </>

  )

}


export default withStyles(styles)(CustomSnackbar)