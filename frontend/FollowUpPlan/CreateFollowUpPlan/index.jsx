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
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as cn from 'classnames'
import styles from './CreateFollowUpPlanStyle'
import StepDetail from './StepDetail'

function CreateFollowUpPlan(props) {
  const { classes } = props
  const [activeStep, setActiveStep] = React.useState(0)
  const getSteps = () => {
    return ['Step 1', 'Step 2', 'Step 3'];
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/follow-up-plans/add'>Follow Up Plan Informations</BreadcrumbsItem>
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
                Plan name
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
        </Grid>
      </div>
      <Tooltip title="Add more steps">
      <Fab onClick={() => console.log('hi')} size={'small'} color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
      </Tooltip>
      <div className={cn(classes.stepper)}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => setActiveStep(index)}
                style={{ cursor: 'pointer' }}
              >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        <div className={cn(classes.actionsContainer, 'mt-5')}>

          {
            activeStep === 0 && <StepDetail {...props} />
          }
          {
            activeStep === 1 && <StepDetail {...props} />
          }
          {
            activeStep === 2 && <StepDetail {...props} />
          }
          {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
          <div className="d-flex justify-content-center">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
                </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withStyles(styles, { withTheme: true })(CreateFollowUpPlan)
