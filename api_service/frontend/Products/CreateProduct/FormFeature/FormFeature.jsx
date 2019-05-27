import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable from 'material-table'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectCustom from '../../components/SelectCustom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './FormFeatureStyle'

function FormFeature(props) {

  const { classes,
    onChangeCreateFeature,
    error,
    createFeature,
    featureDialog,
    handleCloseFeatureDialog,
    handleOpenFeatureDialog,
    handleCreateFeature,
    onClickUpdateFeature,
    updateFeatureBtn
  } = props;

  return (
    <div className={classes.root}>
      <Dialog
        open={featureDialog}
        onClose={handleCloseFeatureDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Feature Info</DialogTitle>
        <DialogContent>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              <Grid container spacing={40}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    required
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Feature Name
                            </InputLabel>
                </Grid>
                <Grid item xs={8}>

                  <Input
                    fullWidth
                    required
                    error={error.fname}
                    onChange={onChangeCreateFeature}
                    value={createFeature.name}
                    name="name"
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={40}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    required
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Price
                              </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <Input
                    fullWidth
                    required
                    error={error.fprice}
                    type="number"
                    onChange={onChangeCreateFeature}
                    value={createFeature.price}
                    name="price"
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={40}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
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
                    onChange={onChangeCreateFeature}
                    value={createFeature.desc}
                    name="desc"
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '0 10px' }}>
          <Button onClick={handleCloseFeatureDialog} color="default">
            Cancel
          </Button>
          {
            updateFeatureBtn == false &&
            <Button onClick={handleCreateFeature} color="primary" autoFocus>
              Create
            </Button>
          }
          {updateFeatureBtn == true &&
            <Button onClick={onClickUpdateFeature} color="primary" autoFocus>
              Update
            </Button>
          }
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default withStyles(styles)(FormFeature);