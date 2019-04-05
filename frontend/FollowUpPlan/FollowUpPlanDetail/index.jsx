import * as React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FollowUpPlanIcon from '@material-ui/icons/FindInPage';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'
import * as cn from 'classnames'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CustomSnackbar from '../../components/CustomSnackbar'
// Hooks
import useFetchData from '../../CustomHook/useFetchData'

// API
import { FOLLOW_UP_PLANS_URL, GET_ACTIONS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 
import StepPlanDetail from './StepPlanDetal'

import styles from './FollowUpPlanStyles'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function FollowUpPlanDetail(props) {
  const { classes } = props

  const followUpPlanId = props.match.params.id

  const [value, setValue] = React.useState(0)

  const [activeStep, setActiveStep] = React.useState(0)

  const [completeNotice, setCompleteNotice] = React.useState(false)

  const [actions, setActions] = useFetchData(GET_ACTIONS_URL, props.history, {})

  const [followUpPlanDetail, setFollowUpPlanDetail, setUrl, forceUpdate] =
    useFetchData(FOLLOW_UP_PLANS_URL + '/' + followUpPlanId, props.history, {
      name: '',
      steps: [
        {
          nth: '',
          action: '',
          duration: 0,
          conditions: {
            '': ''
          },
        }
      ],
    })

  // Event handler
  const notification = () => {
    setCompleteNotice('Successfully Updated')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
  }

  const handleNext = () => {
    if (activeStep === followUpPlanDetail.steps.length - 1) return handleSavePlanDetail()
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleChangeSelect = (values, element, index) => {
    let stepsClone = [...followUpPlanDetail.steps]
    stepsClone[index].actions = values
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps: stepsClone })
  }

  const handleSavePlanDetail = () => {
    apiPatch(FOLLOW_UP_PLANS_URL + '/' + followUpPlanId, { ...followUpPlanDetail }, false, true)
      .then(json => {
        if (json.data) return notification()
      })

  }

  const onChangeInput = (e) => {
    setFollowUpPlanDetail({ ...followUpPlanDetail, [e.target.name]: e.target.value })
  }

  const handleChangeStepCondition = (e, index) => {
    const steps = [...followUpPlanDetail.steps]
    steps[index].conditions[e.target.name] = e.target.value
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps })
  }

  const onChangeStepDetailInput = (e, index) => {
    const steps = [...followUpPlanDetail.steps]
    steps[index][e.target.name] = e.target.value
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps })
  }

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <BreadcrumbsItem to={`/follow-up-plans/ + ${followUpPlanId}`}>{followUpPlanDetail.name}</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={8} style={{ margin: 'unset' }}>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <FollowUpPlanIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Follow Up Plan</span></li>
                  <li><p style={{ fontSize: '16px' }}>{followUpPlanDetail.name}</p></li>
                </ul>
              </div>
            </Grid>
            <AppBar position="static" className={classes.bgrMenuTab}>
              <Tabs value={value}
                onChange={(e, value) => {
                  setValue(value)
                }}
                classes={{ indicator: classes.tabSelected }}
              >

                <Tab label={<span><FollowUpPlanIcon />&nbsp;Follow Up Plan Detail</span>} />
                <Tab label={<span><DetailIcon /> Steps </span>} />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left' }}>
              {value === 0 &&
                <TabContainer>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2} >
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Follow Up Plan Name
                      </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        onChange={onChangeInput}
                        name="name"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={followUpPlanDetail.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12} className="d-flex justify-content-center mt-3">
                        <Button onClick={forceUpdate} variant="contained" className={classes.button}>
                          RESET
                        </Button>&nbsp;&nbsp;
                        <Button onClick={handleSavePlanDetail} variant="contained" color="primary" className={classes.button}>
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {value === 1 &&
                <TabContainer>
                  <div className={cn(classes.stepper)}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {
                        followUpPlanDetail.steps.map((step, index) => (
                          <Step key={'steplabel' + index}>
                            <StepLabel onClick={() => setActiveStep(index)}
                              style={{ cursor: 'pointer' }}
                            >Step {index + 1}</StepLabel>
                          </Step>
                        ))
                      }

                    </Stepper>
                  </div>
                  <div className={cn(classes.actionsContainer, 'mt-5')}>
                    {
                      followUpPlanDetail.steps.map((step, index) => {
                        if (activeStep === index) {
                          return (
                            <>
                              <StepPlanDetail
                                onChangeStepDetailInput={e => onChangeStepDetailInput(e, index)}
                                handleChangeSelect={(values, e) => handleChangeSelect(values, e, index)}
                                handleChangeStepCondition={e => handleChangeStepCondition(e, index)}
                                actions={actions}
                                step={step}
                              />
                            </>
                          )
                        } else return <></>
                      })
                    }
                  </div>

                  <div className="d-flex justify-content-center">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === followUpPlanDetail.steps.length - 1 ? 'Save' : 'Next'}
                    </Button>
                  </div>
                </TabContainer>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(FollowUpPlanDetail);


