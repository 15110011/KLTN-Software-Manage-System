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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as cn from 'classnames'
import styles from './CreateFollowUpPlanStyle'


function StepDetail(props) {
  const { classes } = props
  return (
    <div style={{ textAlign: 'left', padding: '40px' }}>
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
              Action
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
        <Grid container spacing={40} >
          <Grid className={classes.inputCustom} item xs={4}>
            <InputLabel
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
              // value={createProduct.desc}
              type="date"
              name="desc"
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40} >
          <Grid className={classes.inputCustom} item xs={4}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              End Date
            </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <Input
              fullWidth
              required
              // onChange={onChangeCreateProduct}
              // value={createProduct.desc}
              type="date"
              name="desc"
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
              required
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Conditions (start)
            </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                // value={createProduct.status}
                // onChange={onChangeCreateProduct}
                displayEmpty
                name="status"
                className={classes.selectEmpty}
              >
                <MenuItem value="ACTIVE">
                  ACTIVE
                            </MenuItem>
                <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                // value={createProduct.status}
                // onChange={onChangeCreateProduct}
                displayEmpty
                name="status"
                className={classes.selectEmpty}
              >
                <MenuItem value="ACTIVE">
                  ACTIVE
                            </MenuItem>
                <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Input
              fullWidth
              required
              // onChange={onChangeCreateProduct}
              // value={createProduct.desc}
              name="desc"
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={40}>
          <Grid className={classes.inputCustom} item xs={2}>
            <InputLabel
              required
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Conditions (end)
            </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                // value={createProduct.status}
                // onChange={onChangeCreateProduct}
                displayEmpty
                name="status"
                className={classes.selectEmpty}
              >
                <MenuItem value="ACTIVE">
                  ACTIVE
                            </MenuItem>
                <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                // value={createProduct.status}
                // onChange={onChangeCreateProduct}
                displayEmpty
                name="status"
                className={classes.selectEmpty}
              >
                <MenuItem value="ACTIVE">
                  ACTIVE
                            </MenuItem>
                <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Input
              fullWidth
              required
              // onChange={onChangeCreateProduct}
              // value={createProduct.desc}
              name="desc"
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default withStyles(styles)(StepDetail)