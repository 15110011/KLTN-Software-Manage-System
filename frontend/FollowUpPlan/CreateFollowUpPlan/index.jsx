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
import { Divider } from '@material-ui/core';


function CreateFollowUpPlan(props) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [actions, setActions] = useFetchData(GET_ACTIONS_URL, props.history, {})
  const [followUpPlan, setCreatePlan] = React.useState({
    name: '',
    steps: [
    ],
  })
  const [createFieldDialog, setCreateFieldDialog] = React.useState(false)
  const [newFields, setNewFields] = React.useState([])

  const [disableApply, setDisableApply] = React.useState(false)




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
      nth: steps.length - 1,
      action: '',
      duration: 0,
      conditions: [
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

  const handleChangeStepCondition = (e, stepIndex, conditionIndex) => {
    const steps = [...followUpPlan.steps]
    steps[stepIndex].conditions[conditionIndex][e.target.name] = e.target.value
    setCreatePlan({ ...followUpPlan, steps })
  }

  const handleAddConditions = (e, index) => {
    const steps = [...followUpPlan.steps]
    steps[index].conditions.push(
      {
        name: '',
        type: '',
        choices: []
      }
    )
    setCreatePlan({ ...followUpPlan, steps })
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
          onCreateSuccess()
        }
      })
  }

  const { classes, onCreateSuccess, createFollowUpPlanDialog, handleCloseCreateFollowUpPlan } = props

  const handleOpenDialog = (stepIndex, conditionIndex) => {
    setCreateFieldDialog(!createFieldDialog)
    if (stepIndex !== undefined) {
      setNewFields(followUpPlan.steps[stepIndex].conditions[conditionIndex].choices)
    }
    setDisableApply(true)
  }

  const onChangeField = (e, choiceIndex) => {
    const cloneFields = newFields.concat([])
    cloneFields[choiceIndex] = e.target.value
    setNewFields(cloneFields)
  }

  const onAddOrRemoveField = (choiceIndex) => {


    let cloneFields = newFields.concat([])
    //Delete
    if (choiceIndex !== undefined) {
      cloneFields = cloneFields.slice(0, choiceIndex).concat(cloneFields.slice(choiceIndex + 1))
    }
    else {
      cloneFields.push([''])
    }

    setDisableApply(false)

    setNewFields(cloneFields)
  }

  const onSubmitNewFields = (e, stepIndex, conditionIndex) => {
    e.preventDefault()
    const steps = followUpPlan.steps.concat([])
    steps[stepIndex].conditions[conditionIndex].choices = newFields
    setCreatePlan({ ...followUpPlan, steps })
    setDisableApply(true)
  }

  const onCloseField = () => {

    handleOpenDialog()
    setNewFields([])
  }

  const onRemoveCondition = (stepIndex, conditionIndex) => {
    const steps = followUpPlan.steps.concat([])

    steps[stepIndex].conditions = steps[stepIndex].conditions.slice(0, conditionIndex).concat(steps[stepIndex].conditions.slice(conditionIndex + 1))
    setCreatePlan({ ...followUpPlan, steps })
  }

  const onDeleteCurrentStep = () => {
    let cloneStep = [].concat(followUpPlan.steps)
    cloneStep = cloneStep.slice(0, activeStep).concat(cloneStep.slice(activeStep + 1))

    setCreatePlan({ ...followUpPlan, steps: cloneStep })
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    } else {
      setActiveStep(0)
    }

  }

  return (
    <div>
      <Dialog
        open={true}
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

          <Grid container spacing={24} className='my-3'>
            <Grid className={classes.inputCustom} item xs={2}>
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
          <Divider />
          <div >
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
                    <StepDetail
                      key={'step' + index}
                      activeStep={activeStep}
                      onChangeCreateSteps={e => onChangeCreateSteps(e, index)}
                      handleChangeSelect={(values, e) => handleChangeSelect(values, e, index)}
                      handleChangeStepCondition={(e, conditionIndex) => handleChangeStepCondition(e, index, conditionIndex)}
                      handleAddConditions={e => handleAddConditions(e, index)}
                      createStep={curStep}
                      error={error}
                      actions={actions}
                      handleOpenDialog={conditionIndex => handleOpenDialog(index, conditionIndex)}
                      onChangeField={onChangeField}
                      onAddOrRemoveField={onAddOrRemoveField}
                      onSubmitNewFields={(e, conditionIndex) => onSubmitNewFields(e, index, conditionIndex)}
                      newFields={newFields}
                      createFieldDialog={createFieldDialog}
                      onCloseField={onCloseField}
                      onRemoveCondition={conditionIndex => onRemoveCondition(index, conditionIndex)}
                      disableApply={disableApply}
                    />
                  )
                }
                else return <></>
              })

            }
            <DialogActions>
              <div className="d-flex justify-content-center">
                {followUpPlan.steps.length > 0 && <Button color="primary" onClick={() => onDeleteCurrentStep()}>
                  Delete current step
                </Button>}
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
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default withStyles(styles, { withTheme: true })(CreateFollowUpPlan)
