import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider'
import cn from 'classnames'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove'
import StepButton from '@material-ui/core/StepButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useFetchData from '../../CustomHook/useFetchData'
import styles from './CreateMarketingPlanStyle'
import stateHashes from '../../common/StateHash'
import AsyncSelect from '../../components/AsyncSelectCustom'

// Components 

import SelectCustom from '../../components/SelectCustom'

// API
import {
  MARKETING_PLANS_URL,
  REFRESH_TOKEN_URL,
  MARKETING_PLANS_CONDITIONS_URL,
  MAIL_TEMPLATES_URL
} from "../../common/urls";
import { apiPost, apiPatch, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

const stepName = ['Basic Infomation', 'Choose Search Conditions', 'Choose Auto Actions'];

function getStepContent(
  step,
  props,
  error,
  handleAddMustConditions,
  handleAddAtLeastConditions,
  onChangeCreateMarketingPlan,
  createMarketingPlan,
  setCreateMarketingPlan,
  handleRemoveMustConditions,
  handleRemoveAtLeastConditions,
  handleOpenConditionTable,
  marketingPlanConditions,
  handleChangeActionTypeSelect,
  handleChangeSelectAddress,
  isCreateMarketingPlanDialog,
  // fetchEmailSuggestion,
  handleChangeMailTemplate

  // applyConditionTable
) {

  const { classes } = props;

  const fetchEmailSuggestion = s => {
    return apiGet(MAIL_TEMPLATES_URL + `?name=${s}`, true).then(res => {
      return res.data.data.map(tp => ({ label: tp.name, value: tp.id, ...tp }))
    })
  }

  switch (step) {
    case 0:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              Object.keys(error[0]).map((k, i) => (
                <p key={i} className='text-danger'>
                  {error[0][k]}
                </p>
              ))
            }
          </Grid>
          <Grid item xs={10}>
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
                  Plan Name
                  </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <Input
                  fullWidth
                  required
                  onChange={onChangeCreateMarketingPlan}
                  value={createMarketingPlan.name}
                  name="name"
                  error={error[0].name}
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      )
    case 1:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              error[1].must && Object.keys(error[1].must).map((k, i) => (
                <p key={i} className='text-danger'>
                  {error[1].must[k]}
                </p>
              ))
            }
          </Grid>
          <Grid item xs={8}>
            {
              createMarketingPlan.condition.must.map((m, i) => {
                return (
                  <Grid key={i} container spacing={24}>
                    <Grid item xs={4}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Operands</InputLabel>
                        <Select
                          value={m.operand}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          displayEmpty
                          name="operand"
                          className={classes.selectEmpty}
                        >
                          {
                            Object.values(marketingPlanConditions).map((c, i) => {
                              return (
                                <MenuItem key={i} value={c.id}>
                                  {c.name}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Operators</InputLabel>
                        <Select
                          value={m.operator}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          displayEmpty
                          name="operator"
                          className={classes.selectEmpty}
                        >
                          {
                            marketingPlanConditions[m.operand] && marketingPlanConditions[m.operand].operators.map((o, i) => {
                              return (
                                <MenuItem key={i} value={o}>
                                  {o}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{ position: 'relative' }}>
                      {
                        m.operand != '1' ?
                          <FormControl fullWidth className={classes.formControl}>
                            <TextField
                              id="standard-name"
                              label="Data"
                              className={classes.textField}
                              value={m.data}
                              onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                              name="data"
                              type="number"
                            />
                          </FormControl>
                          :
                          <FormControl fullWidth style={{ position: 'absolute', bottom: '13px' }} className={classes.formControl}>
                            <SelectCustom
                              className={classes.stateCustomInput}
                              options={
                                Object.keys(stateHashes).map(k => {
                                  return {
                                    label: stateHashes[k],
                                    value: k
                                  }
                                })
                              }
                              handleChange={(v, a) => handleChangeSelectAddress(v, a, i)}
                              value={m.data}
                              name="data"
                              fullWidth
                              label="Data"
                              single
                              data={{
                                label: stateHashes[m.data],
                                value: m.data
                              }}
                            />
                          </FormControl>
                      }
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={(e) => handleRemoveMustConditions(e, i)} aria-label="Remove" classes={{ root: classes.fixButton }}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            <Button
              onClick={() => { handleAddMustConditions() }}
              variant="outlined"
              color="default"
              className={(classes.addFeatureButton)}>
              Add Conditions
              </Button>
          </Grid>
        </Grid>
      )
    case 2:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              error[2].must && Object.keys(error[2].must).map((k, i) => (
                <p key={i} className='text-danger'>
                  {error[2].must[k]}
                </p>
              ))
            }
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={24}>
              <Grid item xs={4} style={{ position: 'relative' }}>
                <InputLabel
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Automatical actions
            </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl component="fieldset" className={classes.formControl} >
                  <FormGroup>
                    {
                      ['Send Email'].reduce((acc, g) => {
                        acc.push(
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={createMarketingPlan.actions.find(a => a == g)}
                                onChange={(value, status) => {
                                  handleChangeActionTypeSelect(g, status)
                                }}
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

              {createMarketingPlan.actions.find(a => a == 'Send Email') &&
                <>
                  <Grid item xs={4} style={{ position: 'relative' }}>
                    <InputLabel
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Mail template
                    </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <AsyncSelect
                      handleChange={(values, element) => handleChangeMailTemplate(values, element)}
                      onChangeSelect={(values, element) => handleChangeMailTemplate(values, element)}
                      data={{ label: createMarketingPlan.mail_template.name, value: createMarketingPlan.mail_template.id }}
                      // multi
                      single
                      placeholder=""
                      label=""
                      loadOptions={fetchEmailSuggestion}
                    />
                  </Grid>
                </>
              }
            </Grid>
          </Grid>
        </Grid>
      )
    default:
      return 'Unknown step';
  }
}

function CreateMarketingPlan(props) {
  const {
    classes,
    createMarketingPlanDialog,
    handleCloseCreateMarketingPlanDialog,
    setCreateMarketingPlanDialog,
    isCreateMarketingPlanDialog,
    setIsCreateMarketingPlanDialog,
    notification,
    isEditMarketingPlan,
    marketingData,
    addMarketingPlanToEdit
  } = props;


  const [activeStep, setActiveStep] = React.useState(0)
  const [error, setError] = React.useState([{}, {}, {}])
  const [createMarketingPlan, setCreateMarketingPlan] = React.useState({
    name: '',
    condition: {
      must: [],
    },
    actions: [],
    manager: '',
    mail_template: {}
  })

  const [marketingPlanConditions, setMarketingPlanConditions] = useFetchData(MARKETING_PLANS_CONDITIONS_URL, props.history, {})
  const [applyConditionTable, setApplyConditionTable] = React.useState(false)


  React.useEffect(() => {
    if (marketingData) {
      setCreateMarketingPlan(marketingData)
    }
  }, [])

  const handleOpenConditionTable = e => {
    e.preventDefault()
    setApplyConditionTable(true)
  }

  const handleReset = () => {
    setActiveStep(0)
  };

  const handleChangeMailTemplate = (value, action) => {
    let cloneCreateMarketingPlan = { ...createMarketingPlan }
    if (action.action == 'select-option') {
      cloneCreateMarketingPlan.mail_template = value
      setCreateMarketingPlan(cloneCreateMarketingPlan)
    }
    else if (action.action == 'clear') {
      cloneCreateMarketingPlan.mail_template = {}
      console.log(cloneCreateMarketingPlan)
      setCreateMarketingPlan(cloneCreateMarketingPlan)
    }
  }

  const handleChangeSelectAddress = (value, element, index) => {
    const cloneCreateMarketingPlan = { ...createMarketingPlan }
    if (value) {
      cloneCreateMarketingPlan.condition.must[index][element.name] = value.value
    }
    else {
      cloneCreateMarketingPlan.condition.must[index][element.name] = ''
    }
    setCreateMarketingPlan({ ...cloneCreateMarketingPlan })
  }

  const handleChangeActionTypeSelect = (action, status) => {

    let actions = [...createMarketingPlan.actions]
    if (status) {
      actions.push(action)
    }
    else {
      let curActionIndex = actions.indexOf(action)
      if (curActionIndex != -1) {
        actions = actions.slice(0, curActionIndex).concat(actions.slice(curActionIndex + 1))
      }
    }

    setCreateMarketingPlan({ ...createMarketingPlan, actions })
  }

  const handleAddMustConditions = e => {
    const condition =
      Object.assign({}, createMarketingPlan.condition)
    condition.must.push({
      operand: '',
      operator: '',
      data: ''
    })
    setCreateMarketingPlan({ ...createMarketingPlan, condition })
  }

  const handleAddAtLeastConditions = e => {
    const condition =
      Object.assign({}, createMarketingPlan.condition)
    condition.at_least.push({
      operand: '',
      operator: '',
      data: ''
    })
    setCreateMarketingPlan({ ...createMarketingPlan, condition })
  }

  const handleRemoveMustConditions = (e, index) => {
    let must = createMarketingPlan.condition.must.concat([])
    must = must.slice(0, index).concat(must.slice(index + 1))
    setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, must } })
  }

  const handleRemoveAtLeastConditions = (e, index) => {
    let at_least = createMarketingPlan.condition.at_least.concat([])
    at_least = at_least.slice(0, index).concat(at_least.slice(index + 1))
    setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, at_least } })
  }


  const onChangeCreateMarketingPlan = (e, index, conditionType) => {
    if (e.target.name == 'name') {
      setCreateMarketingPlan({ ...createMarketingPlan, [e.target.name]: e.target.value })
    } else {
      if (conditionType == 'must') {
        const must = createMarketingPlan.condition.must.concat([])
        must[index][e.target.name] = e.target.value
        setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, must } })
      } else {
        const at_least = createMarketingPlan.condition.at_least.concat([])
        at_least[index][e.target.name] = e.target.value
        setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, at_least } })
      }
    }
  }



  const handleCreateMarketingPlan = e => {
    e.preventDefault()
    const err = [{}, {}, {}]

    if (isEditMarketingPlan == false) {
      if (createMarketingPlan.name == '') {
        err[0].name = "FILL YOUR PLAN NAME"
      }
      // for (let i = 0; i < createMarketingPlan.condition.must.length; i++) {
      //   if (!err[1].must) {
      //     err[1].must = {}
      //   }
      //   if (createMarketingPlan.condition.must[i].operand == '') {
      //     err[1].must.operand = 'FILL YOUR OPERAND'
      //     break
      //   }
      //   if (createMarketingPlan.condition.must[i].operator == '') {
      //     err[1].must.operator = 'FILL YOUR OPERATOR'
      //     break
      //   }
      //   if (createMarketingPlan.condition.must[i].condition == '') {
      //     err[1].must.condition = 'FILL YOUR CONDITION'
      //     break
      //   }
      // }
      if (Object.keys(err[0]).length === 0 && Object.keys(err[1]).length === 0 && Object.keys(err[2]).length === 0) {
        apiPostMarketingPlan()
      }
      else {
        setError(err)
      }
      setCreateMarketingPlanDialog(false)
    } else {
      const marketingId = marketingData.id
      apiPatch(MARKETING_PLANS_URL + '/' + marketingId, { ...createMarketingPlan }, false, true)
        .then(res => {
          if (res.data) {
            notification('Successfully Updated')
            if (addMarketingPlanToEdit) {
              addMarketingPlanToEdit(res.data)
            }
          }
        })
      setCreateMarketingPlanDialog(false)
    }
  }

  const apiPostMarketingPlan = e => {
    apiPost(MARKETING_PLANS_URL, { ...createMarketingPlan, mail_template: createMarketingPlan.mail_template.id }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              this.props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostMarketingPlan()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          notification('Successfully Created')
          if (addMarketingPlanToEdit) {
            addMarketingPlanToEdit(res.data)
          }
        }
      })
  }

  const fetchEmailSuggestion = s => {
    return apiGet(MAIL_TEMPLATES_URL + `?name=${s}`, true).then(res => {
      return res.data.data.map(tp => ({ label: tp.name, value: tp.id, ...tp }))
    })
  }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleCloseCreateMarketingPlanDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateMarketingPlanDialog}>
          Create Marketing Plan
          <div className="d-flex justify-content-between">
            <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }}
              aria-label="Close" onClick={() => {
                handleCloseCreateMarketingPlanDialog()
                setIsCreateMarketingPlanDialog(false)
              }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <form onSubmit={handleCreateMarketingPlan}>
          <DialogContent>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
              {stepName.map((label, index) => (
                <Step key={label} >
                  <StepLabel
                    onClick={() => { setActiveStep(index) }}
                    style={{ cursor: 'pointer' }}
                    error={Object.keys(error[index]).length}>{label}
                  </StepLabel>
                  <StepContent>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        {getStepContent(
                          index,
                          props,
                          error,
                          handleAddMustConditions,
                          handleAddAtLeastConditions,
                          onChangeCreateMarketingPlan,
                          createMarketingPlan,
                          setCreateMarketingPlan,
                          handleRemoveMustConditions,
                          handleRemoveAtLeastConditions,
                          handleOpenConditionTable,
                          marketingPlanConditions,
                          handleChangeActionTypeSelect,
                          handleChangeSelectAddress,
                          isCreateMarketingPlanDialog,
                          handleChangeMailTemplate,
                          fetchEmailSuggestion
                          {/* applyConditionTable */ }
                        )}
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Paper square elevation={0} className={classes.resetContainer}>
              {/* <Typography variant="title2">All steps completed - you now can create plan or reset</Typography> */}
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="default" onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            {/* {
                isCreateMarketingPlanDialog == true &&
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Create
                </Button>
              } */}
            {
              isEditMarketingPlan ?
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Update
                  </Button>
                :
                <>
                  {
                    isCreateMarketingPlanDialog == true &&
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                      Create
                    </Button>
                  }
                </>
            }

          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(CreateMarketingPlan);