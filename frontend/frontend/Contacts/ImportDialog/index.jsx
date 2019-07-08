import * as React from 'react';
import {
  withStyles,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Input,
  InputLabel,
  IconButton,
} from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataIcon from '@material-ui/icons/Description';

import AsyncSelect from '../../components/AsyncSelectCustom';
import SelectCustom from '../../components/SelectCustom';
import { apiGet, apiPost, apiFile } from '../../common/Request';
import { IMPORT_CONTACT_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import { BAD_REQUEST } from '../../common/Code';

import styles from './Styles';

function ImportDialog(props) {
  const upLoadRef = React.useRef(null);
  const {
    classes,
    toggleImportDialog,
    selectingGroup,
    groups,
    onImportComplete,
  } = props;
  const [fileName, setFileName] = React.useState();
  const [error, setError] = React.useState({});
  const [selectingGroups, setSelectingGroups] = React.useState([
    { label: groups[0].name, value: groups[0].id },
  ]);

  let name;
  const uploadFile = (e) => {
    upLoadRef.current.click();
  };

  const onChangeUploadFile = (e) => {
    setFileName(e.target.files[0].name);
    const cloneErr = { ...error };
    delete cloneErr.file;
    setError(cloneErr);
  };

  const handleUploadFile = (e) => {
    const data = new FormData();

    const { files } = upLoadRef.current;
    if (files.length) {
      setError({});
    } else {
      setError({ file: 'Please select file' });
      return;
    }
    data.append('file', files[0], files[0].name);
    data.append('id', selectingGroups.map(g => g.value));
    apiFile(IMPORT_CONTACT_URL, 'POST', data, true).then((res) => {
      if (res.data.code === BAD_REQUEST) {
        setError(res.data);
      } else {
        onImportComplete();
      }
    });
  };

  return (
    <Dialog
      open
      onClose={toggleImportDialog}
      maxWidth="sm"
      fullWidth
      classes={{ paper: classes.dialogRoot }}
    >
      <DialogTitle>Import Contact Data</DialogTitle>
      <DialogContent style={{ overflowY: 'unset' }}>
        <div className="text-danger my-3">
          {Object.keys(error).length > 0
            && !error.file
            && `Contact ${error.first_name} ${
              error.last_name
            } has a validation error`}
          <ul>
            {!error.file
              && Object.keys(error).reduce((acc, k) => {
                if (k !== 'code' && k !== 'first_name' && k !== 'last_name') {
                  acc.push(<li>{error[k]}</li>);
                }
                return acc;
              }, [])}
          </ul>
        </div>
        <div className={classes.border} onClick={uploadFile}>
          <div className={classes.main}>
            <input
              type="file"
              name="upload"
              onChange={onChangeUploadFile}
              ref={upLoadRef}
              style={{ display: 'none' }}
            />
            <IconButton>
              <DataIcon fontSize="large" />
            </IconButton>
            <p>{fileName}</p>
            <p className="text-danger">{error.file && error.file}</p>
          </div>
        </div>
        <div className="pt-3">
          <SelectCustom
            multi
            label="Target Groups"
            options={groups.map(g => ({ label: g.name, value: g.id }))}
            data={selectingGroups}
            handleChange={(values, e) => {
              if (
                e.action == 'remove-value'
                && e.removedValue.label === 'All Contacts'
              ) {
                return;
              }
              if (e.action === 'clear') {
                values = [{ label: groups[0].name, value: groups[0].id }];
              }

              setSelectingGroups(values);
            }}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          type="Cancel"
          variant="contained"
          onClick={() => toggleImportDialog()}
          color="default"
        >
          Cancel
        </Button>
        <Button
          type="subbmit"
          variant="contained"
          onClick={() => handleUploadFile()}
          color="primary"
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(ImportDialog);
