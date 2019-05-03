import * as React from 'react'

import { Link, withRouter } from 'react-router-dom'

import { withStyles, Typography, Paper, IconButton, Button } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import SwapIcon from '@material-ui/icons/SwapHoriz'
import RemoveIcon from '@material-ui/icons/Remove'
import EmailIcon from '@material-ui/icons/Email'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/icons/AccessAlarm'
import TextField from '@material-ui/core/TextField';
import * as dateFns from 'date-fns'
import Tooltip from '@material-ui/core/Tooltip'
import DoneIcon from '@material-ui/icons/Done'
import { Input, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomSnackbar from '../../../components/CustomSnackbar'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import * as dateFns from 'date-fns'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as cn from 'classnames'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import SendMailDialog from '../../../Mailbox/SendMailDialog'

import ContactDetail from '../ContactDetail'
import NoteDetail from '../NoteDetail'
import { apiPost, apiPatch } from '../../../common/Request'
import { ORDER_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL, STEP_DETAIL_URL } from '../../../common/urls';
import styles from './FollowUpStyle.js'
import StepFollowUpDetail from './StepFollowUpDetail'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

function FollowUpDetail(props) {

  const {
    classes,
    setMovingRow,
    setDeletingRow,
    moreRow,
    handleResetStepDetail,
    userId,
    followup,
    id,
    updateTable,
    user
  } = props
  const [selectTabActivity, setSelectTabActivity] = React.useState({
    type: 'history'
  })
  const [activeStep, setActiveStep] = React.useState(0)
  const [noteDialog, setNoteDialog] = React.useState(false)
  const [laterDialog, setLaterDialog] = React.useState(false)
  const [mailDialog, setMailDialog] = React.useState(false)
  const [contactDetail, setContactDetail] = React.useState(false)
  const [successNoti, setSuccessNoti] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [value, setValue] = React.useState(0)
  const [viewingOrder, setViewingOrder] = React.useState(0)
  const [stepDetail, setStepDetail] = React.useState([])
  const [update, setUpdate] = React.useState(0)

  React.useEffect(() => {
    if (followup) {

      setStepDetail(followup.campaign.follow_up_plan.steps.map((s, i) => {
        let information = s.conditions.reduce((acc, c) => {
          acc[c.name] = {
            type: c.type,
            result: c.type == 'check_box' ? [] : ''
          }
          return acc
        }, {})
        let status = 'RUNNING'
        if (followup.step_details.length > i) {
          information = followup.step_details[i].information
          status = followup.step_details[i].status
        }

        return {
          step: s.id,
          order: followup.id,
          information,
          status,
          id: followup.step_details[i] ? followup.step_details[i].id : null
        }
      }))
    }
  }, [followup, update])



  const handleChangeSelectTabActivity = e => {
    setSelectTabActivity({ [e.target.name]: e.target.value });
  }

  const onChangeUpdateStepDetail = (e, iKey, checked) => {
    const cloneStepDetail = [...stepDetail]
    if (cloneStepDetail[activeStep].information[iKey].type != 'check_box') {
      cloneStepDetail[activeStep].information[iKey].result = e.target.value
    }
    else {
      const foundIndex = cloneStepDetail[activeStep].information[iKey].result.findIndex(r => r == e.target.value)
      if (foundIndex != -1) {
        cloneStepDetail[activeStep].information[iKey].result = cloneStepDetail[activeStep].information[iKey].result.slice(0, foundIndex).concat(cloneStepDetail[activeStep].information[iKey].result.slice(foundIndex + 1))
      }
      else {
        cloneStepDetail[activeStep].information[iKey].result.push(e.target.value)
      }
    }
    setStepDetail(cloneStepDetail)
  }

  const onChangeViewingOrder = (e) => {
    setViewingOrder(e.target.value)
  }

  const handleChange = (event, value) => {
    setValue(value)
  };

  const handleChangeIndex = index => {
    setValue(index)
  };

  const onCall = () => {
    if (!stepDetail[activeStep].id) {
      apiPost(STEP_DETAIL_URL ,{ ...stepDetail[activeStep] }, false, true).then(res => {
        apiPost(ORDER_URL + '/' + id + '/history', { action: 'Call Client', step_detail: res.data.id }, false, true).then(res => {
          updateTable()
          setSuccessNoti('Successfully Called')
          setTimeout(() => {
            setSuccessNoti(false)
          }, 2000);
        })
      })
    } else {
      apiPost(ORDER_URL + '/' + id + '/history', { action: 'Call Client', step_detail: stepDetail[activeStep].id }, false, true).then(res => {
        updateTable()
        setSuccessNoti('Successfully Called')
        setTimeout(() => {
          setSuccessNoti(false)
        }, 2000);
      })
    }
    
  }

  const onSendEmail = () => {
    setMailDialog(true)
  }

  let checkBoxOrRadio = []
  if (moreRow.followup.campaign.follow_up_plan.steps) {
    moreRow.followup.campaign.follow_up_plan.steps.forEach((s, index) => {
      checkBoxOrRadio[index] = s.conditions.some(c => c.type == 'check_box' || c.type == 'radio')
    })
  }

  // const updateMailMetric = () => {
  //   apiPost(ORDER_URL + '/' + id + '/history', { action: 'Send Email Manually' }, false, true).then(res => {
  //     updateTable()
  //     setContactHistories({ ...contactHistories, 'Send Email Manually': contactHistories['Send Email Manually'] + 1 })
  //     setSuccessNoti('Successfully Sent Email')
  //     setTimeout(() => {
  //       setSuccessNoti(false)
  //     }, 2000);
  //   })
  // }

  const handleUpdateStepDetail = (e) => {
    e.preventDefault()
    if (stepDetail[activeStep].id) {
      apiPatch(STEP_DETAIL_URL + '/' + stepDetail[activeStep].id, { ...stepDetail[activeStep], status: 'COMPLETED' }, false, true).then(res => {
        updateTable()
        setSuccessNoti(`Step ${activeStep + 1} is completed`)
        setTimeout(() => {
          setSuccessNoti(false)
        }, 2000);
      })
    } else {
      apiPost(STEP_DETAIL_URL, { ...stepDetail[activeStep], status: 'COMPLETED' }, false, true).then(res => {
        updateTable()
        setSuccessNoti(`Step ${activeStep + 1} is completed`)
        setTimeout(() => {
          setSuccessNoti(false)
        }, 2000);
      })
    }
  }

  const handleApplyStepDetail = () => {
    if (stepDetail[activeStep].id) {
      apiPatch(STEP_DETAIL_URL + '/' + stepDetail[activeStep].id, stepDetail[activeStep], false, true).then(res => {
        setSuccessNoti(`Step ${activeStep + 1} is applied`)
        updateTable()
        setTimeout(() => {
          setSuccessNoti(false)
        }, 2000);
      })
    } else {
      apiPost(STEP_DETAIL_URL, stepDetail[activeStep], false, true).then(res => {
        setSuccessNoti(`Step ${activeStep + 1} is applied`)
        updateTable()
        setTimeout(() => {
          setSuccessNoti(false)
        }, 2000);
      })
    }
  }

  return (
    <>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      {mailDialog &&
        <SendMailDialog user={user} contact={followup.contacts} toggleDialog={() => { setMailDialog(!mailDialog) }}
        />
      }
      <Grid style={{ padding: '10px 40px' }} container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={12} className="d-flex">
              <Typography variant="title" style={{ marginTop: '5px' }}>
                {moreRow.fname}
              </Typography>
              &nbsp;
              &nbsp;
              &nbsp;
              {
                moreRow.progress >= 50 &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusActive
                  }}
                >
                  {moreRow.progress}%
                </Button>
              }
              {
                moreRow.progress < 50 &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusFinished
                  }}
                >
                  {moreRow.progress}%
                </Button>
              }
            </Grid>
          </Grid>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>

            <Button
              variant='contained'
              classes={{
                contained: classes.btnYellow
              }}
              onClick={() => {
                setLaterDialog(!laterDialog)
              }}
            >
              <TimerIcon fontSize="small" />
            </Button>
              
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnPurple
                }}
                onClick={() => {
                  setMovingRow({ id: moreRow.id })
                }}
                disabled={moreRow.progress != 100}
              >
                <DoneIcon fontSize="small" />
              </Button>
            {
              moreRow.progress >= 0 &&
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnRed
                }}
                onClick={() => {
                  setDeletingRow(moreRow)
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
            }
          </DialogActions>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Contact info
            </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Full name
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.fname}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Email
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.email}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Phone
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.phone}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Campaign info
            </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Name
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.campaignName}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Packages
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            <Tooltip
              placement='bottom-start'
              title={
                <ul style={{ paddingInlineStart: '16px', fontSize: '12px', wordBreak: 'break-word' }}>
                  {moreRow.followup.packages.map(p =>
                    <li key={`package${p}`}>{p.name}</li>)
                  }
                </ul>
              }>
              <Typography classes={{ root: classes.linkStyleCustom }}
                onClick={() => handleOpenDialog(index)}
              >
                {moreRow.followup.packages.length}&nbsp;package(s)
              </Typography>
            </Tooltip>
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Product
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.followup.campaign.product.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Marketing plan
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.followup.campaign.marketing_plan.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Follow-up plan
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.followup.campaign.follow_up_plan.name}
          </DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {moreRow.followup.campaign.follow_up_plan.steps.map((step, index) => {
              return (
                <Step key={'steplabel' + index}
                  completed={activeStep !== index && stepDetail[index] && stepDetail[index].status == 'COMPLETED'}
                >
                  <StepLabel
                    onClick={() => {
                      setActiveStep(index)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Step {index + 1}
                  </StepLabel>
                </Step>
              )
            })}
            {/* <Step classes={{ root: classes.addStep }}>
              <StepLabel StepIconProps={{ icon: <AddIcon /> }}>Add Step</StepLabel>
            </Step> */}
          </Stepper>
          <Paper className={classes.stepPaper}>
            <Grid className={classes.inputHeaderCustom} item xs={12}>
              Step {activeStep +1}
            </Grid>
            <Grid item xs={12} className='my-2'>
              {followup.campaign.follow_up_plan.steps[activeStep].actions.includes('Call Client') &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnGreen
                  }}
                  onClick={() => {
                    onCall()
                  }}
                >
                  <PhoneIcon fontSize="small" />
                </Button>
              }
              &nbsp;
              {followup.campaign.follow_up_plan.steps[activeStep].actions.includes('Send Email Manually') &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnPink
                  }}
                  onClick={() => {
                    onSendEmail()
                  }}
                >
                  <EmailIcon fontSize="small" />
                </Button>
              }
            </Grid>
            <form onSubmit={handleUpdateStepDetail}>
              {
                stepDetail[activeStep] && Object.keys(stepDetail[activeStep].information).map((iKey, index) => {
                  return (
                    <Grid item xs={12} key={`st${index}`}>
                      <Grid container spacing={8}>

                        <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} item xs={4}>
                          <InputLabel
                            required
                            htmlFor="custom-css-standard-input"
                            classes={{
                              focused: classes.cssFocused,
                            }}
                            style={{ marginBottom: 0 }}
                          >
                            {iKey}
                          </InputLabel>
                        </Grid>
                        {
                          stepDetail[activeStep].information[iKey].type == 'text' &&
                          <Grid item xs={8}>
                            <Input
                              fullWidth
                              required
                              onChange={(e) => onChangeUpdateStepDetail(e, iKey)}
                              value={stepDetail[activeStep].information[iKey].result}
                              name="result"
                              classes={{
                                underline: classes.cssUnderline,
                              }}
                            />
                          </Grid>
                        }
                        {
                          stepDetail[activeStep].information[iKey].type == 'number' &&
                          <Grid item xs={8}>
                            <Input
                              fullWidth
                              required
                              onChange={(e) => onChangeUpdateStepDetail(e, iKey)}
                              value={stepDetail[activeStep].information[iKey].result}
                              type='number'
                              name="result"
                              classes={{
                                underline: classes.cssUnderline,
                              }}
                            />
                          </Grid>
                        }
                        {
                          stepDetail[activeStep].information[iKey].type == 'check_box' &&
                          <Grid item xs={8}>
                            <FormControl component="fieldset" className={classes.formControl}>
                              <FormGroup row>
                                {followup.campaign.follow_up_plan.steps[activeStep].conditions[index].choices.map((c, index) => {
                                  return (
                                    <FormControlLabel
                                      control={
                                        <Checkbox checked={stepDetail[activeStep].information[iKey].result.includes(c)}
                                          onChange={(e) => onChangeUpdateStepDetail(e, iKey)}
                                          value={c}
                                          color='primary'
                                          style={{ marginBottom: 0 }}

                                        />
                                      }
                                      key={c + index}
                                      label={c}
                                    />
                                  )
                                })}
                              </FormGroup>
                            </FormControl>
                          </Grid>
                        }
                        {
                          stepDetail[activeStep].information[iKey].type == 'radio' &&
                          <Grid item xs={8}>
                            <FormControl component="fieldset" className={classes.formControl} >
                              <RadioGroup
                                aria-label="Gender"
                                name="result"
                                className={classes.group}
                                value={stepDetail[activeStep].information[iKey].result}
                                onChange={(value) => onChangeUpdateStepDetail(value, iKey)}
                                row

                              >
                                {followup.campaign.follow_up_plan.steps[activeStep].conditions[index].choices.map((c, index) => {
                                  return <FormControlLabel value={c} control={<Radio color='primary' required />} label={c} key={c + index}
                                    style={{ marginBottom: 0 }}
                                  />
                                })}
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        }

                      </Grid>
                    </Grid>
                  )
                })

              }
              {' '}
              <Grid item xs={12} style={{ margin: '20px 0', textAlign: 'right' }}>
                <Button variant='contained'
                  onClick={() => setUpdate(update + 1)}
                  disabled={(activeStep == 0 || (stepDetail[activeStep - 1].status == 'COMPLETED')) && stepDetail[activeStep] && stepDetail[activeStep].status == 'RUNNING' ? undefined : true}
                >Reset</Button>
                {' '}
                <Button
                  type="button"
                  variant='contained'
                  color='primary'
                  style={{ backgroundColor: '#2196F3', color: '#fff' }}
                  disabled={(activeStep == 0 || (stepDetail[activeStep - 1].status == 'COMPLETED')) && stepDetail[activeStep] && stepDetail[activeStep].status == 'RUNNING' ? undefined : true}
                  onClick={() => handleApplyStepDetail()}
                >Apply</Button>
                {' '}
                <Button type="submit" variant='contained' color='primary'
                  disabled={(activeStep == 0 || (stepDetail[activeStep - 1].status == 'COMPLETED')) && stepDetail[activeStep] && stepDetail[activeStep].status == 'RUNNING' ? undefined : true}

                >Complete</Button>
              </Grid>
            </form>
          </Paper>
          <Grid container spacing={8}>

          </Grid>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={9}>
          Activity
        </Grid>
        <Grid className="d-flex justify-content-end" item xs={3}>
          <FormControl className={classes.formControl}>
            <Select
              value={selectTabActivity.type}
              onChange={handleChangeSelectTabActivity}
              inputProps={{
                name: 'type',
              }}
            >
              <MenuItem value="history">
                History
                  </MenuItem>
              <MenuItem value="notes">
                Notes
                  </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="All"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Campaign"
              />
            </Tabs>
            {
              selectTabActivity.type == "history" &&
              <>
                {value === 0 &&
                  <TabContainer>
                    {/* <ContactDetail
                      contact={contact}
                      contactHistories={allHistories}
                    /> */}
                  </TabContainer>
                }
                {value === 1 &&
                  <TabContainer>
                    {/* <ContactDetail
                      contact={contact}
                      contactHistories={histories}
                    /> */}
                  </TabContainer>
                }
              </>
            }
            {
              selectTabActivity.type == "notes" &&
              <>
                {
                  value === 0 &&
                  <TabContainer>
                    {/* <NoteDetail
                      type="all"
                      campaign={campaign}
                      contact={contact}
                    /> */}
                  </TabContainer>
                }
                {value === 1 &&
                  <TabContainer>
                    {/* <NoteDetail
                      campaign={campaign}
                      contact={contact}
                    /> */}
                  </TabContainer>
                }
              </>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default withStyles(styles)(withRouter(FollowUpDetail))