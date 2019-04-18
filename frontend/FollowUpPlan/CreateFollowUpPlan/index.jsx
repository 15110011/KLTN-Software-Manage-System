import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { apiPost } from '../../common/Request';
import CustomSnackbar from '../../components/CustomSnackbar'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as cn from 'classnames'
import styles from './CreateFollowUpPlanStyle'
import StepDetail from './StepDetail'
import { FOLLOW_UP_PLANS_URL, GET_ACTIONS_URL, REFRESH_TOKEN_URL } from '../../common/urls';
import useFetchData from '../../CustomHook/useFetchData'
import { BAD_REQUEST } from "../../common/Code";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';


function CreateFollowUpPlan(props) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [actions, setActions] = useFetchData(GET_ACTIONS_URL, props.history, {})
  const [followUpPlan, setCreatePlan] = React.useState({
    name: '',
    steps: [
      {
        nth: '',
        actions: [],
        duration: 0,
        conditions: [
          {
            'field_name': '',
            'field_type': ''
          }
        ],
      }
    ],
  })

  const handleNext = () => {
    if (activeStep === followUpPlan.steps.length - 1) return apiCreateFollowUpPlan()
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const notification = () => {
    setCompleteNotice('Successfully Added')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
  }

  const addMoreSteps = () => {
    const steps = [...followUpPlan.steps]
    steps.push({
      nth: '',
      action: '',
      duration: 0,
      conditions: [
        {
          'field_name': '',
          'field_type': ''
        }
      ],
    })
    setCreatePlan({ ...followUpPlan, steps })
  }

  const onChangeCreatePlan = e => {
    setCreatePlan({ ...followUpPlan, [e.target.name]: e.target.value })
  }

  const handleChangeSelect = (values, element, index) => {
    let stepsClone = [...followUpPlan.steps]
    stepsClone[index].actions = values
    setCreatePlan({ ...followUpPlan, steps: stepsClone })
  }

  const handleChangeStepCondition = (e, index) => {
    const steps = [...followUpPlan.steps]
    steps[index].conditions[e.target.name] = e.target.value
    setCreatePlan({ ...followUpPlan, steps })
  }

  const handleAddConditions = (e, index) => {
    const steps = [...followUpPlan.steps]
    steps[index].conditions.push({
      'field_name': '',
      'field_type': ''
    })
    setCreatePlan({ ...followUpPlan }, steps)
  }

  const onChangeCreateSteps = (e, index) => {
    const steps = [...followUpPlan.steps]
    steps[index][e.target.name] = e.target.value
    steps[index]['nth'] = index
    setCreatePlan({ ...followUpPlan, steps })
  }

  const apiCreateFollowUpPlan = () => {
    apiPost(FOLLOW_UP_PLANS_URL, { ...followUpPlan }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              this.props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          let errors = {}
          if (res.data.name) errors.name = 'Name cannot be blank'
          if (res.data.steps.action) errors.steps = 'Actions cannot be blank'
          setError({ ...errors })
        }
        else {
          notification()
        }
      })
  }

  const { classes, createFollowUpPlanDialog, handleCloseCreateFollowUpPlan } = props

  return (
    <div>
      <Dialog
        open={createFollowUpPlanDialog}
        onClose={handleCloseCreateFollowUpPlan}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateFollowUpPlan}>
          Create Follow-up Plan
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <IconButton aria-label="Close" onClick={handleCloseCreateFollowUpPlan}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
          {error && (
            Object.keys(error).forEach((key) => <CustomSnackbar isErr msg={error[key]} />)
          )}
          <BreadcrumbsItem to='/follow-up-plans/add'>Follow Up Plan Informations</BreadcrumbsItem>
          <div style={{ textAlign: 'left', padding: '40px' }}>
            <Grid container spacing={24}>
              <Grid item xs={8}>
                <Grid container spacing={24}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                      className={error.name ? classes.danger : null}
                    >
                      Plan name
            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      fullWidth
                      required
                      onChange={onChangeCreatePlan}
                      value={followUpPlan.name}
                      name="name"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={cn(classes.stepper)}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {followUpPlan.steps.map((label, index) => (
                <Step key={'steplabel' + index}>
                  <StepLabel onClick={() => setActiveStep(index)}
                    style={{ cursor: 'pointer' }}
                  >Step {index + 1}</StepLabel>
                </Step>
              ))}
              <Step classes={{ root: classes.addStep }} onClick={addMoreSteps}>
                <StepLabel StepIconProps={{ icon: <AddIcon /> }}>Add Step</StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className={cn(classes.actionsContainer, 'mt-5')}>
            {
              followUpPlan.steps.map((step, index) => {
                let curStep = step
                if (activeStep == index) {
                  return (
                    <Grid item xs={8}>
                      <StepDetail
                        key={'step' + index}
                        activeStep={activeStep}
                        onChangeCreateSteps={e => onChangeCreateSteps(e, index)}
                        handleChangeSelect={(values, e) => handleChangeSelect(values, e, index)}
                        handleChangeStepCondition={e => handleChangeStepCondition(e, index)}
                        handleAddConditions={e => handleAddConditions(e, index)}
                        createStep={curStep}
                        error={error}
                        actions={actions}
                      />
                    </Grid>
                  )
                }
                else return <></>
              })

            }
            <div className="d-flex justify-content-center">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
                </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === followUpPlan.steps.length - 1 ? 'Save' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default withStyles(styles, { withTheme: true })(CreateFollowUpPlan)
