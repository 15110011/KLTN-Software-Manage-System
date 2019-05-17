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
import AllContactDetail from './AllContactDetail'
import NoteDetail from '../NoteDetail'
import { apiPost, apiPatch } from '../../../common/Request'
import { ORDER_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL, STEP_DETAIL_URL, ORDER_HISTORY_URL } from '../../../common/urls';
import styles from './FollowUpStyle.js'
import StepFollowUpDetail from './StepFollowUpDetail'
import CreateEventDialog from '../../../Events/CreateEventDialog'
import MailDetail from '../../../Mailbox/MailBoxList/MailDetail';

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
    user,
    updateActivities,
    onRemoveContact,
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
  const [backToInbox, setBackToInbox] = React.useState(false)

  React.useEffect(() => {
    if (followup) {
      setStepDetail(followup.campaign.follow_up_plan.steps.map((s, i) => {
        let information = s.conditions.reduce((acc, c) => {
          let result = ''
          if (c.type == 'check_box') { result = [] }
          if (c.type == 'final') {
            result = {}
            console.log(moreRow)
            moreRow.packages.forEach(p => {
              result[p.id] = { type: '', price: '' }
            })
          }
          acc[c.name] = {
            type: c.type,
            result
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
  const onChangePackages = (e, iKey, packageIndex, pid) => {

    const cloneStepDetail = [...stepDetail]
    cloneStepDetail[activeStep].information[iKey].result[pid].type = parseInt(e.target.value)
    cloneStepDetail[activeStep].information[iKey].result[pid].price = moreRow.packages[packageIndex].prices[e.target.value]

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
      apiPost(STEP_DETAIL_URL, { ...stepDetail[activeStep] }, false, true).then(res => {
        apiPost(ORDER_URL + '/' + id + '/history', { action: 'Call Client' }, false, true).then(res => {
          updateTable()
          setSuccessNoti('Successfully Called')
          setTimeout(() => {
            setSuccessNoti(false)
          }, 2000);
        })
      })
    } else {
      apiPost(ORDER_URL + '/' + id + '/history', { action: 'Call Client' }, false, true).then(res => {
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

  // let checkBoxOrRadio = []
  // if (moreRow.followup.campaign.follow_up_plan.steps) {
  //   moreRow.followup.campaign.follow_up_plan.steps.forEach((s, index) => {
  //     checkBoxOrRadio[index] = s.conditions.some(c => c.type == 'check_box' || c.type == 'radio')
  //   })
  // }

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

  const notification = () => {
    setSuccessNoti('Successfully Added')
    setTimeout(() => {
      setSuccessNoti(false)
    }, 2000);
    updateActivities()
  }

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
  console.log(stepDetail, moreRow.packages)

  return (
    <>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      {mailDialog &&
        <SendMailDialog user={user} contact={followup.contacts} toggleDialog={() => { setMailDialog(!mailDialog) }}
          updateMailMetric={() => {

            apiPost(ORDER_URL + '/' + id + '/history', { action: 'Send Email Manually' }, false, true).then(res => {
              updateTable()
              setSuccessNoti('Successfully Sent')
              setTimeout(() => {
                setSuccessNoti(false)
              }, 2000);
            })
          }}
        />
      }
      {laterDialog && <CreateEventDialog user={user} toggleDialog={() => { setLaterDialog(!laterDialog) }}
        order={moreRow.id}
        setLaterDialog={setLaterDialog}
        type_='campaign'
        notification={notification}
        updateActivities={updateActivities}
        contactOptions={[{ ...moreRow.followup.contacts, value: moreRow.followup.contacts.id, label: moreRow.followup.contacts.first_name + ' ' + moreRow.followup.contacts.last_name }]}
      />}
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
                <Tooltip title="Progress">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnStatusActive
                    }}
                  >
                    {moreRow.progress.toFixed(2)}%
                </Button>
                </Tooltip>
              }
              {
                moreRow.progress < 50 &&
                <Tooltip title="Progress">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnStatusFinished
                    }}
                  >
                    {moreRow.progress.toFixed(2)}%
                </Button>
                </Tooltip>
              }
            </Grid>
          </Grid>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>

            <Tooltip title='Call customer'>
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
            </Tooltip>
            <Tooltip title='Send Email Manually'>
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
            </Tooltip>

            <Tooltip title="Schedule">
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
            </Tooltip>
            <Tooltip title="Confirm deal">
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnPurple
                }}
                onClick={() => {
                  setMovingRow({ ...moreRow })
                }}
                disabled={moreRow.progress != 100}
              >
                <DoneIcon fontSize="small" />
              </Button>
            </Tooltip>
            {
              moreRow.progress >= 0 &&
              <Tooltip title="Mark this contact as failed">
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnRed
                  }}
                  onClick={() => {
                    setDeletingRow({ id: moreRow.id, full_name: moreRow.followup.contacts.first_name + ' ' + moreRow.followup.contacts.last_name, campaignName: moreRow.followup.campaign.name })
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              </Tooltip>
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
                  {moreRow.packages && moreRow.packages.map(p =>
                    <li key={`package${p}`}>{p.name}</li>)
                  }
                </ul>
              }>
              <Typography classes={{ root: classes.linkStyleCustom }}
                onClick={() => handleOpenDialog(index)}
              >
                {moreRow.packages && moreRow.packages.length}&nbsp;package(s)
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
                    {index != moreRow.followup.campaign.follow_up_plan.steps.length - 1 ?
                      `Step ${index + 1}` : 'Choose Packages'
                    }
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
              {activeStep == moreRow.followup.campaign.follow_up_plan.steps.length - 1 ?
                ''
                : `Step ${activeStep + 1}`}
              <i>
                {/* {dateFns.format(dateFns.addDays(dateFns.parseISO(moreRow.followup.created), parseInt(step.duration)), 'MM-dd-yyyy')} */}
              </i>
            </Grid>
            <form onSubmit={handleUpdateStepDetail}>
              {
                stepDetail[activeStep] && Object.keys(stepDetail[activeStep].information).length == 0 &&
                <Grid className="pt-3">
                  <MailDetail backToInbox={backToInbox} />
                </Grid>
              }
              {
                stepDetail[activeStep] && Object.keys(stepDetail[activeStep].information).map((iKey, index) => {
                  return (
                    <Grid item xs={12} key={`st${index}`}>
                      <Grid container spacing={24} style={{ marginTop: '16px' }}>

                        <Grid item xs={8}>
                          {
                            stepDetail[activeStep].information[iKey].type == 'final' &&
                            moreRow.packages.map((p, packageIndex) => {
                              return (
                                <FormControl component="fieldset" className={classes.formControl} required>
                                  <FormLabel component="legend">{p.name}</FormLabel>
                                  <RadioGroup
                                    aria-label="Gender"
                                    name="result"
                                    className={classes.group}
                                    value={stepDetail[activeStep].information[iKey].result[`${p.id}`].type}
                                    onChange={(value) => onChangePackages(value, iKey, packageIndex, p.id)}
                                    row
                                  >
                                    {Object.keys(p.prices).map((k, index) => {
                                      return <FormControlLabel value={parseInt(k)} control={<Radio color='primary' disabled={stepDetail[stepDetail.length - 1].status == 'COMPLETED'} />} label={k != 999999 ? k + ` month(s) ($${p.prices[k]})` : `Lifetime ($${p.prices[k]})`} key={k + index}
                                        style={{ marginBottom: 0 }}
                                      />
                                    })}
                                  </RadioGroup>
                                </FormControl>
                              )
                            })
                          }
                        </Grid>
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
                {/* <Button
                  type="button"
                  variant='contained'
                  color='primary'
                  style={{ backgroundColor: '#2196F3', color: '#fff' }}
                  disabled={(activeStep == 0 || (stepDetail[activeStep - 1].status == 'COMPLETED')) && stepDetail[activeStep] && stepDetail[activeStep].status == 'RUNNING' ? undefined : true}
                  onClick={() => handleApplyStepDetail()}
                >Apply</Button> */}
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
                    <AllContactDetail
                      contact={moreRow.contact}
                      contactHistories={moreRow.allHistories}
                    />
                  </TabContainer>
                }
                {value === 1 &&
                  <TabContainer>
                    <ContactDetail
                      contact={moreRow.contact}
                      contactHistories={moreRow.histories}
                    />
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