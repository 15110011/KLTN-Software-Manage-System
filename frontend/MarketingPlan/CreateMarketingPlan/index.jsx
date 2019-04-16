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
import styles from './CreateMarketingPlanStyle'

// Components 

import SelectCustom from '../../components/SelectCustom'

// API
import { MARKETING_PLANS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

const stepName = ['Basic Infomation', 'Choose Search Conditions', 'Choose Actions'];

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
  handleRemoveAtLeastConditions
) {

  const { classes } = props;

  switch (step) {
    case 0:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              Object.keys(error[0]).map(k => (
                <p className='text-danger'>
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
              error[1].must && Object.keys(error[1].must).map(k => (
                <p className='text-danger'>
                  {error[1].must[k]}
                </p>
              ))
            }
          </Grid>
          <Grid className={classes.inputCustom} item xs={4}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              All Conditions(All conditions must be met)
                    </InputLabel>
          </Grid>
          <Grid item xs={8}>
            {
              createMarketingPlan.condition.must.map((m, i) => {
                return (
                  <Grid key={i} container spacing={24}>
                    <Grid item xs={4}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Condition Type</InputLabel>
                        <Select
                          value={m.operand}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          displayEmpty
                          name="condition"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            State
                          </MenuItem>
                          <MenuItem value="ACTIVE">
                            So lan mua san pham cung loai
                          </MenuItem>
                          <MenuItem value="ACTIVE">
                            So lan mua san pham cung category
                          </MenuItem>
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
                          name="operators"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="==">
                            Equal to
                          </MenuItem>
                          <MenuItem value="!=">
                            Not equal to
                          </MenuItem>
                          <MenuItem value=">">
                            Greater than
                          </MenuItem>
                          <MenuItem value="<">
                            Less than
                          </MenuItem>
                          <MenuItem value=">=">
                            Greater than or
                            equal to
                          </MenuItem>
                          <MenuItem value="<=">
                            Less than or
                            equal to
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="standard-name"
                          label="Operands"
                          className={classes.textField}
                          value={m.condition}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          name="operands"
                          type="number"
                        />
                      </FormControl>
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


          <Grid className={cn(classes.inputCustom)} item xs={4}>
            <InputLabel
              htmlFor="custom-css-standard-input"
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Any Conditions(At least one condition must be met)
                    </InputLabel>
          </Grid>
          <Grid item xs={8}>
            {
              createMarketingPlan.condition.at_least.map((l, i) => {
                return (
                  <Grid key={i} container spacing={24}>
                    <Grid item xs={4}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">First name</InputLabel>
                        <Select
                          value={l.operand}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          displayEmpty
                          name="operand"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            as
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Equal to</InputLabel>
                        <Select
                          value={l.operator}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          displayEmpty
                          name="operator"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            asd
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="standard-name"
                          label="Condition"
                          className={classes.textField}
                          value={l.condition}
                          onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          name="condition"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={(e) => handleRemoveAtLeastConditions(e, i)} aria-label="Remove" classes={{ root: classes.fixButton }}>
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
              onClick={() => { handleAddAtLeastConditions() }}
              variant="outlined"
              color="default"
              className={(classes.addFeatureButton)}>
              Add Conditions
              </Button>
          </Grid>
          <Grid container style={{ marginTop: '20px' }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={4}></Grid>
            <Grid item xs={8} style={{ marginTop: '20px' }}>
              <Button variant="contained" color="primary">Apply</Button>
            </Grid>
          </Grid>
        </Grid>
      )
    case 2:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {
              error[2].must && Object.keys(error[2].must).map(k => (
                <p className='text-danger'>
                  {error[2].must[k]}
                </p>
              ))
            }
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={24}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Types
                    </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <SelectCustom
                  data={

                  }
                  multi
                  placeholder=""
                  label=""
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    default:
      return 'Unknown step';
  }
}

function CreateMarketingPlan(props) {

  const [activeStep, setActiveStep] = React.useState(0)
  const [error, setError] = React.useState([{}, {}, {}])
  const [createMarketingPlan, setCreateMarketingPlan] = React.useState({
    name: '',
    condition: {
      must: [],
      at_least: []
    },
    actions: {},
    manager: ''
  })

  const handleReset = () => {
    setActiveStep(0)
  };


  const handleAddMustConditions = e => {
    const condition =
      Object.assign({}, createMarketingPlan.condition)
    condition.must.push({
      operand: '',
      operator: '',
      condition: ''
    })
    setCreateMarketingPlan({ ...createMarketingPlan, condition })
  }

  const handleAddAtLeastConditions = e => {
    const condition =
      Object.assign({}, createMarketingPlan.condition)
    condition.at_least.push({
      operand: '',
      operator: '',
      condition: ''
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

    if (createMarketingPlan.name == '') {
      err[0].name = "FILL YOUR PLAN NAME"
    }
    for (let i = 0; i < createMarketingPlan.condition.must.length; i++) {
      if (!err[1].must) {
        err[1].must = {}
      }
      if (createMarketingPlan.condition.must[i].operand == '') {
        err[1].must.operand = 'FILL YOUR OPERAND'
        break
      }
      if (createMarketingPlan.condition.must[i].operator == '') {
        err[1].must.operator = 'FILL YOUR OPERATOR'
        break
      }
      if (createMarketingPlan.condition.must[i].condition == '') {
        err[1].must.condition = 'FILL YOUR CONDITION'
        break
      }
    }
    if (Object.keys(err[0]).length === 0 && Object.keys(err[1]).length === 0 && Object.keys(err[2]).length === 0) {
      apiPostMarketingPlan()
    }
    else {
      setError(err)
    }
  }

  const apiPostMarketingPlan = e => {
    apiPost(MARKETING_PLANS_URL, { ...createMarketingPlan, manager: props.user.id }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              this.props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostMarketingPlan()
              // notification()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          // notification()
        }
      })
  }

  const { classes, createMarketingPlanDialog, handleCloseCreateMarketingPlanDialog } = props;

  return (
    <div>
      <Dialog
        open={createMarketingPlanDialog}
        onClose={handleCloseCreateMarketingPlanDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCreateMarketingPlanDialog}>
          <div className="d-flex justify-content-between">
            Create Product
            <IconButton aria-label="Close" onClick={handleCloseCreateMarketingPlanDialog}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreateMarketingPlan}>
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
                          handleRemoveAtLeastConditions
                        )}
                      </Grid>
                    </Grid>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography variant="title2">All steps completed - you now can create plan or reset</Typography>
              <Button variant="outlined" color="default" onClick={handleReset} className={classes.button}>
                Reset
            </Button>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Create
            </Button>
            </Paper>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(CreateMarketingPlan);