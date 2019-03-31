import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable from 'material-table'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as cn from 'classnames'

import styles from './CreateCampaignStyle'

function CreateCampaign(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/campaigns/add'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Paper className={classes.paper}>
          <form onSubmit={(e) => {
            onCreateProduct(e)
          }
          }>
            <div style={{ textAlign: 'left', padding: '40px' }}>
              <Grid container spacing={40}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Campaign Info
                      </Typography>
                </Grid>
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
                        Campaign Name
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Campaign Type
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Start Date
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Assigned To
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Close Date
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        Status
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
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
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Products
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateProduct}
                        // value={createProduct.name}
                        name="name"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={40}>
                    <Grid className={classes.inputCustom} item xs={2}>
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
                    <Grid item xs={10}>
                    <TextField
                    classes={{root: classes.fixTextArea}}
                    fullWidth
                    multiline={true}
                    rows={5}
                    rowsMax={5}
                    underline={false}
                  />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CreateCampaign);