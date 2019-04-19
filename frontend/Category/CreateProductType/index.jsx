import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './CreateProductTypeStyle'

function CreateProductType(props) {

  const { classes, handleCloseCreateProductTypeDialog, createProductTypeDialog } = props;

  const [createProductType, setCreateProductType] = React.useState({
    name: '',
    desc: '',
    status: ''
  })

  const onChangeCreateProductType = e => {
    setCreateProductType({ ...createProductType, [e.target.name]: e.target.value })
  }

  const handleCreateProductType = e => {
    console.log(123)
  }

  return (
    <div>
      <Dialog
        open={createProductTypeDialog}
        onClose={handleCloseCreateProductTypeDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateProductTypeDialog}>
          Create Product Type
          <div className="d-flex justify-content-between">
            <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }}
              aria-label="Close" onClick={handleCloseCreateProductTypeDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreateProductType}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <Grid container spacing={24}>
                  <Grid className={classes.inputCustomName} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Name
                  </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      fullWidth
                      required
                      onChange={onChangeCreateProductType}
                      value={createProductType.name}
                      name="name"
                      // error={error[0].name}
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={24}>
                  <Grid className={classes.inputCustomName} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Description
                  </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      fullWidth
                      required
                      onChange={onChangeCreateProductType}
                      value={createProductType.desc}
                      name="desc"
                      // error={error[0].name}
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={24}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Status
                          </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        value={createProductType.status}
                        onChange={onChangeCreateProductType}
                        name="status"
                        displayEmpty
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="ACTIVE">
                          ACTIVE
                            </MenuItem>
                        <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '12px 12px' }}>
          <Button type="submit" variant="contained" color="primary" autoFocus>
            Create
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(CreateProductType);