import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@material-ui/icons/RemoveRedEye';
import MaterialTable from 'material-table'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'
import * as cn from 'classnames'


function FollowUpPlanDetails(props) {
  const {
    activeStep,
    classes,
    onChangeCreateCampaign,
    createCampaign,
    handleChangePackageSelect,
    fetchPackageSuggestion,
    handleChangeAssigneeSelect,
    user,
    handleChangeMarketingPlanSelect,
    fetchMarketingPlanSuggestion
  } = props
  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        <div className={cn(classes.stepper)}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {/* {followUpPlan.steps.map((label, index) => (
                <Step key={'steplabel' + index}>
                  <StepLabel onClick={() => setActiveStep(index)}
                    style={{ cursor: 'pointer' }}
                  >Step {index + 1}</StepLabel>
                </Step>
              ))} */}
            <Step>
              <StepLabel>
                aa
                </StepLabel>
            </Step>
          </Stepper>
        </div>
      </Grid>
      <Grid item xs={10}>
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
              Plan name
            </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <Input
              fullWidth
              required
              // onChange={onChangeCreatePlan}
              // value={followUpPlan.name}
              name="name"
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={10}>
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
              <SelectCustom
                // options={actions.actions.map((g, i) => ({
                //   label: `${g}`,
                //   value: `${g}`,
                // }))}
                // handleChange={(values, element) => handleChangeSelect(values, element)}
                // data={
                //   createStep.actions
                //     .reduce((acc, g) => {
                //       acc.push({ label: `${g.label}`, value: g.value })
                //       return acc
                //     }, [])
                // }
                multi
                placeholder=""
                label=""
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={40}>
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
              // onChange={onChangeCreateSteps}
              // value={createStep.duration}
              type="number"
              name="duration"
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
              Required Fields
            </InputLabel>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={40}>
              <Grid item xs={5}>
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
                    <MenuItem value="radio">
                      Check Box (Multiple choices)
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
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
        </Grid>
      </Grid>
    </Grid>
  )
}
export default FollowUpPlanDetails