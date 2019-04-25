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
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import styles from './CreateCampaignStyle'

// Components 
import CreateFollowUpPlan from '../../FollowUpPlan/CreateFollowUpPlan';
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'
import * as cn from 'classnames'


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
    setIsEditFollowUpPlan
  } = props

  const [createFollowUpPlanDialog, setCreateFollowUpPlanDialog] = React.useState(false)

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
              />
              :
              <CreateFollowUpPlan
                createFollowUpPlanDialog={createFollowUpPlanDialog}
                setCreateFollowUpPlanDialog={setCreateFollowUpPlanDialog}
                handleCloseCreateFollowUpPlan={handleCloseCreateFollowUpPlan}
                onCreateSuccess={addFollowUpPlanToEdit}
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
                return <MenuItem key={'ViewOrder' + index} value={index}>
                  Step {index + 1} ({s.duration > 1 ? s.duration + ' days' : s.duration + ' day'})
              </MenuItem>
              })}
            </Select>
          </Grid>
        </>
      }
      <Grid item xs={2}></Grid>
      <Grid item xs={2}></Grid>
      {createCampaign.follow_up_plan.steps &&
        <Grid item xs={8}>
          <Paper className='p-4'>
            <Grid container spacing={8}>
              {
                createCampaign.follow_up_plan.steps[viewingOrder] && createCampaign.follow_up_plan.steps[viewingOrder].conditions.map((c, index) => {
                  return (
                    <>
                      {
                        checkBoxOrRadio[viewingOrder] ?
                          <>
                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                required
                                value={
                                  c['name']
                                }
                                name="name"
                                classes={{
                                  underline: classes.cssUnderline,
                                }}
                                label="Name"
                                disabled
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>
                                  Type
                       </InputLabel>
                                <Select
                                  value={
                                    c['type']
                                  }
                                  disabled
                                  displayEmpty
                                  name="type"
                                  className={classes.selectEmpty}
                                  label="Type"
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
                          </>
                          :
                          <>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                value={createCampaign.follow_up_plan.steps[viewingOrder].actions.reduce((acc, a) => {
                                  acc += a + ', '
                                  return acc
                                }, '').slice(0, -2)}
                                classes={{
                                  underline: classes.cssUnderline,
                                }}
                                label="Actions"
                                disabled
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                required
                                value={
                                  c['name']
                                }
                                name="name"
                                classes={{
                                  underline: classes.cssUnderline,
                                }}
                                label="Name"
                                disabled
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>
                                  Type
                                </InputLabel>
                                <Select
                                  value={
                                    c['type']
                                  }
                                  disabled
                                  displayEmpty
                                  name="type"
                                  className={classes.selectEmpty}
                                  label="Type"
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
                          </>
                      }
                      {(c.type == 'check_box' || c.type == 'radio') &&
                        <Grid item xs={3} style={{ position: 'relative' }}>
                          <Tooltip
                            title={<ul style={{ paddingInlineStart: '16px', fontSize: '12px', maxWidth: '150px', wordBreak: 'break-word' }}>
                              {c.choices.map(c => <li key={`selection${c}`}>{c}</li>)}</ul>}>
                            <Typography classes={{ root: classes.linkStyleCustom }}
                              onClick={() => handleOpenDialog(index)}
                            >{c.choices.length} selection(s)
                            </Typography>
                          </Tooltip>
                        </Grid>
                      }
                    </>
                  )
                })
              }
            </Grid>
          </Paper>
        </Grid>}
    </Grid>
  )
}
export default withStyles(styles)(FollowUpPlanDetails)