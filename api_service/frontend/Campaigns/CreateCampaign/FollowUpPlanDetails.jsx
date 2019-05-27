import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import * as cn from 'classnames'
import { withRouter } from 'react-router-dom'


import styles from './CreateCampaignStyle'

import useFetchData from '../../CustomHook/useFetchData'
import { GET_ACTIONS_URL } from '../../common/urls'

// Components 
import CreateFollowUpPlan from '../../FollowUpPlan/CreateFollowUpPlan';
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'


function FollowUpPlanDetails(props) {
  const {
    activeStep,
    classes,
    onChangeCreateCampaign,
    createCampaign,
    handleChangeFollowUpPlanSelect,
    fetchFollowUpPlanSuggestion,
    user,
    viewingOrder,
    onChangeViewingOrder,
    addFollowUpPlanToEdit,
    isEditFollowUpPlan,
    setIsEditFollowUpPlan,
    notification
  } = props

  const [createFollowUpPlanDialog, setCreateFollowUpPlanDialog] = React.useState(false)
  const [actions, setActions] = useFetchData(GET_ACTIONS_URL, props.history, {})

  const handleCloseCreateFollowUpPlan = e => {
    setCreateFollowUpPlanDialog(false)
  }

  let checkBoxOrRadio = []
  if (createCampaign.follow_up_plan.steps) {
    createCampaign.follow_up_plan.steps.forEach((s, index) => {
      checkBoxOrRadio[index] = s.conditions.some(c => c.type == 'check_box' || c.type == 'radio')
    })
  }

  return (
    <Grid container spacing={24}>
      {
        createFollowUpPlanDialog &&
        <>
          {
            isEditFollowUpPlan ?
              <CreateFollowUpPlan
                followUpData={createCampaign.follow_up_plan}
                createFollowUpPlanDialog={createFollowUpPlanDialog}
                setCreateFollowUpPlanDialog={setCreateFollowUpPlanDialog}
                handleCloseCreateFollowUpPlan={handleCloseCreateFollowUpPlan}
                onCreateSuccess={addFollowUpPlanToEdit}
                isEditFollowUpPlan={isEditFollowUpPlan}
                notification={notification}
              />
              :
              <CreateFollowUpPlan
                createFollowUpPlanDialog={createFollowUpPlanDialog}
                setCreateFollowUpPlanDialog={setCreateFollowUpPlanDialog}
                handleCloseCreateFollowUpPlan={handleCloseCreateFollowUpPlan}
                onCreateSuccess={addFollowUpPlanToEdit}
                notification={notification}
                isEditFollowUpPlan={isEditFollowUpPlan}
              />
          }
        </>
      }
      <Grid className={classes.inputCustom} item xs={4}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          required
        >
          Plan
            </InputLabel>
      </Grid>
      <Grid item xs={6}>
        <AsyncSelect
          handleChange={(values, element) => handleChangeFollowUpPlanSelect(values, element)}
          onChangeSelect={(values, element) => handleChangeFollowUpPlanSelect(values, element)}
          data={
            Object.keys(createCampaign.follow_up_plan).length === 0 ? '' :
              {
                label: `${createCampaign.follow_up_plan.name}`, value: createCampaign.follow_up_plan.id, ...createCampaign.follow_up_plan
              }
          }
          single
          placeholder=""
          label=""
          loadOptions={fetchFollowUpPlanSuggestion}
        />
      </Grid>

      <Grid item xs={1}>
        {
          createCampaign.follow_up_plan.name &&
          <IconButton
            onClick={() => {
              setCreateFollowUpPlanDialog(true)
              setIsEditFollowUpPlan(true)
            }}
            aria-label="Edit"
            classes={{ root: classes.fixButton }}>
            <EditIcon style={{ fontSize: '16px' }} />
          </IconButton>
        }
        <IconButton
          onClick={() => {
            setIsEditFollowUpPlan(false)
            setCreateFollowUpPlanDialog(true)
          }}
          aria-label="Add"
          classes={{ root: classes.fixButton }}>
          <AddIcon style={{ fontSize: '16px' }} />
        </IconButton>
      </Grid>
      {
        createCampaign.follow_up_plan.steps &&
        <>
          <Grid className={classes.inputCustom} item xs={4}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Steps
        </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              name='stepOrder'
              value={viewingOrder}
              onChange={onChangeViewingOrder}
              style={{ float: 'right' }}
            >
              {createCampaign.follow_up_plan.steps && createCampaign.follow_up_plan.steps.map((s, index) => {
                if (index != createCampaign.follow_up_plan.steps.length - 1) {
                  return (
                    <MenuItem key={'ViewOrder' + index} value={index}>
                      Step {index + 1} ({s.duration > 1 ? s.duration + ' days' : s.duration + ' day'})
                    </MenuItem>)
                }

                return (
                <MenuItem key={'ViewOrder' + index} value={index}>
                    Choose Packages ({s.duration > 1 ? s.duration + ' days' : s.duration + ' day'})
                </MenuItem>)
              })}
            </Select>
          </Grid>
        </>
      }
      <Grid item xs={2}></Grid>
      <Grid item xs={2}>
      </Grid>
      {createCampaign.follow_up_plan.steps &&
        <Grid item xs={8}>
          <Paper className='p-4'>
            <Grid container spacing={8} className='text-left'>
              <Grid item xs={6}>
                <FormControl >
                  <FormLabel disabled component="legend">Automatical actions</FormLabel>
                  <FormGroup>
                    {
                      actions.actions &&
                      actions.actions
                        .reduce((acc, g) => {
                          acc.push(
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={createCampaign.follow_up_plan.steps[viewingOrder].actions.find(a => a == g)}
                                  disabled
                                />
                              }
                              value={g}
                              label={g}
                            />
                          )
                          return acc
                        }, [])
                    }
                  </FormGroup>
                </FormControl>
              </Grid>
              {
                createCampaign.follow_up_plan.steps[viewingOrder].email_template_ &&
                <Grid item xs={6}>

                  <FormControl >
                    <FormLabel disabled component="legend">Email Template</FormLabel>
                    <FormGroup>
                      <TextField
                        value={createCampaign.follow_up_plan.steps[viewingOrder].email_template_.name}
                        disabled
                      >

                      </TextField>


                    </FormGroup>
                  </FormControl>

                  <FormControl >
                    <FormLabel disabled component="legend">&nbsp;</FormLabel>
                    <FormGroup>
                      <Tooltip title='Preview'>
                        <IconButton
                          onClick={() => { props.history.push('/mail-templates' + createCampaign.follow_up_plan.steps[viewingOrder].email_template_.id) }}
                        >
                          <PreviewIcon></PreviewIcon>
                        </IconButton>
                      </Tooltip>


                    </FormGroup>
                  </FormControl>

                </Grid>
              }
            </Grid>
          </Paper>
        </Grid>}
    </Grid>
  )
}
export default withStyles(styles)(withRouter(FollowUpPlanDetails))