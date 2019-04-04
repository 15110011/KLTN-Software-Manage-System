import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './FollowUpPlanStyles'


function StepPlanDetail(props) {
  const { classes, step, onChangeStepDetailInput } = props
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
            <FormControl fullWidth className={classes.formControl}>
              <Select
                value={step.action}
                onChange={onChangeStepDetailInput}
                displayEmpty
                name="action"
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
        <Grid container spacing={40} >
          <Grid className={classes.inputCustom} item xs={4}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Duration (days)
            </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <Input
              fullWidth
              required
              onChange={onChangeStepDetailInput}
              value={step.duration}
              type="number"
              name="duration"
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
                value={step.conditions}
                onChange={onChangeStepDetailInput}
                displayEmpty
                name="conditions"
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
export default withStyles(styles)(StepPlanDetail)