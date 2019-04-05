import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SelectCustom from '../../components/SelectCustom'
import styles from './CreateFollowUpPlanStyle'


function StepDetail(props) {
  const { classes, createStep, onChangeCreateSteps, actions, handleChangeSelect } = props
 
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
            {
              actions.actions &&  <SelectCustom
                options={actions.actions.map((g, i) => ({
                  label: `${g}`,
                  value: `${g}`,
                }))}
                handleChange={(values, element) => handleChangeSelect(values, element)}
                data={
                  createStep.actions
                    .reduce((acc, g) => {
                      acc.push({ label: `${g.label}`, value: g.value})
                      return acc
                    }, [])
                }
                multi
                placeholder=""
                label=""
              />
            }
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
              onChange={onChangeCreateSteps}
              value={createStep.duration}
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
              Required Fields
            </InputLabel>
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
          <Grid item xs={2}>
            <FormControl fullWidth className={classes.formControl}>
              <Select
                // value={createProduct.status}
                // onChange={onChangeCreateProduct}
                displayEmpty
                name="status"
                className={classes.selectEmpty}
              >
                <MenuItem value="text">
                  Text Field
                </MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="check_box">
                  Check Box
                </MenuItem>
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