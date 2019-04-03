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
import StepButton from '@material-ui/core/StepButton';

import styles from './CreateMarketingPlanStyle'

// Components 

import SelectCustom from '../../components/SelectCustom'

const stepName = ['Basic Infomation', 'Choose Search Conditions', 'Choose Actions'];

function getStepContent(step, props, error) {
  const { classes } = props;

  const handleAddConditions = e => {
    console.log(1123)
  }

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
      return (
        <Grid container spacing={24}>
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
                  Load contacts from
                    </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth className={classes.formControl}>
                  <Select
                    // value={productDetailData.status}
                    // onChange={onChangeCreateProduct}
                    displayEmpty
                    name="status"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="ACTIVE">
                      Contacts Adress
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
                  All Conditions
                    </InputLabel>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth className={classes.formControl}>
                  <Select
                    // value={productDetailData.status}
                    // onChange={onChangeCreateProduct}
                    displayEmpty
                    name="status"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="ACTIVE">
                      First name
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth className={classes.formControl}>
                  <Select
                    // value={productDetailData.status}
                    // onChange={onChangeCreateProduct}
                    displayEmpty
                    name="status"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="ACTIVE">
                      Equal to
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth className={classes.formControl}>
                  <Select
                    // value={productDetailData.status}
                    // onChange={onChangeCreateProduct}
                    displayEmpty
                    name="status"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="ACTIVE">
                      Contacts Address
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}>
                <Button
                  onClick={() => { handleAddConditions() }}
                  variant="outlined"
                  color="default"
                  className={(classes.addFeatureButton, "mt-3")}>
                  Add Conditions
              </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}>
                <Divider />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}>
                <Button variant="contained" color="primary">Apply</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid classes={{ container: classes.fixTable }} container spacing={8}>
            <Grid item xs={12}>
              <MaterialTable
                columns={[
                  { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
                  { title: 'Name', field: 'name' },
                  { title: 'Description', field: 'description' },
                  {
                    title: 'Status',
                    field: 'status',
                    lookup: { 'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE' }
                  },
                ]}
                // data={products.data.map(
                //   (product, index) => ({
                //     numeral: index + 1,
                //     name: product.name,
                //     description: product.desc,
                //     status: product.status
                //   })
                // )}
                title="Campaign List"
                actions={[
                  {
                    icon: 'done_all',
                    tooltip: 'Do',
                    onClick: (event, rows) => {
                      alert('You selected ' + rows.length + ' rows')
                    },
                  },
                ]}
                options={{
                  selection: true,
                  filtering: true,
                  paging: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      )
    case 2:
      return (
        <Grid container spacing={24}>
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
  const [error, setError] = React.useState([{ name: 'asdsa' }, {}, {}])
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
              {/* <div className={cn(classes.actionsContainer, 'mt-5')}>
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
              </div> */}
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