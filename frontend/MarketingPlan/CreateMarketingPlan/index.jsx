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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import cn from 'classnames'
import StepButton from '@material-ui/core/StepButton';

import styles from './CreateMarketingPlanStyle'

const stepName = ['Basic Infomation', 'Choose Search Conditions', 'Choose Actions'];

function getStepContent(step, props, error) {
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
          <Grid item xs={6}>
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
                  Campaign Name
                  </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <Input
                  fullWidth
                  required
                  // onChange={onChangeCreateCampaign}
                  // value={createCampaign.name}
                  // name="name"
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
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

function CreateMarketingPlan(props) {

  const [activeStep, setActiveStep] = React.useState(0)
  const [error, setError] = React.useState([{name:'asdsa'}, {}, {}])
  const { classes } = props;



  const handleNext = () => {
    setActiveStep(activeStep + 1)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  };

  const handleReset = () => {
    setActiveStep(0)
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {stepName.map((label, index) => (
          <Step key={label} >
            <StepLabel onClick={() => { setActiveStep(index) }}
              style={{ cursor: 'pointer' }}
              error={Object.keys(error[index]).length}>{label}</StepLabel>
            <StepContent>
              <Grid container spacing={24} className="mt-5">
                <Grid item xs={12}>
                  {getStepContent(index, props, error)}
                </Grid>
              </Grid>
              <div className={cn(classes.actionsContainer, 'mt-5')}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                    </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === stepName.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepName.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
            </Button>
        </Paper>
      )}
    </div>
  )
}

export default withStyles(styles)(CreateMarketingPlan);