import * as React from 'react'
import { withStyles, Icon } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Grid, TextField, Button, Input, InputLabel, IconButton } from '@material-ui/core'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataIcon from '@material-ui/icons/Description';

import AsyncSelect from '../../components/AsyncSelectCustom'
import SelectCustom from '../../components/SelectCustom'
import { apiGet, apiPost } from '../../common/Request';
import { GROUP_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import { BAD_REQUEST } from '../../common/Code';

import styles from './Styles'


function ImportDialog(props) {
  const upLoadRef = React.useRef(null);
  const { classes, toggleImportDialog } = props;
  const [fileName, setFileName] = React.useState()

  let name
  const uploadFile = e => {
    console.log(e)
    upLoadRef.current.click();
  }

  const onChangeUploadFile = e => {
    setFileName(e.target.files[0].name)
  }

  const handleUploadFile = e => {
    const data = new FormData()

    let files = upLoadRef.current.files
    data.append('files', files[0], files[0].name)
    apiPost(GROUP_URL, data, true, true).then(res => {
    })
  }



  return (
    <Dialog
      open={true}
      onClose={toggleImportDialog}
      maxWidth='sm'
      fullWidth
    // classes={{ paper: classes.dialogRoot }}
    >
      <DialogTitle>Import Contact Data</DialogTitle>
      <DialogContent style={{ overflowY: 'unset' }}>
        <div className={classes.border} onClick={uploadFile}>
          <div className={classes.main}>
            <input type="file" name="upload" onChange={onChangeUploadFile} ref={upLoadRef} style={{ display: 'none' }}></input>
            <IconButton>
              <DataIcon fontSize="large" classes={{ root: classes.iconCus }} />
            </IconButton>
            <p>{fileName}</p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button type="Cancel" variant="contained" onClick={() => toggleImportDialog()} color="default">Cancel</Button>
        <Button type="subbmit" variant="contained" onClick={() => handleUploadFile()} color="primary">Import</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(ImportDialog);


