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
import DeleteIcon from '@material-ui/icons/Delete'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomSnackbar from '../../components/CustomSnackbar'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import * as dateFns from 'date-fns'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import * as cn from 'classnames'

import ContactDetail from '../ContactDetail'
import NoteDetail from '../NoteDetail'
import { apiPost } from '../../../common/Request'
import { ORDER_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../../common/urls';
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
    userId,
    followup,
    id
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

  const handleChangeSelectTabActivity = e => {
    setSelectTabActivity({ [e.target.name]: e.target.value });
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
    apiPost(ORDER_URL + '/' + id + '/history', false, true).then(res => {
      updateTable()
      setSuccessNoti('Successfully Called')
      setTimeout(() => {
        setSuccessNoti(false)
      }, 2000);
    })
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

  console.log(moreRow)

  return (
    <>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
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
                  {moreRow.progress}
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
                  {moreRow.progress}
                </Button>
              }
            </Grid>
          </Grid>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>
            {followup &&
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
            {followup &&
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
            {
              moreRow.progress == 100 &&
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnPurple
                }}
                onClick={() => {
                  setMovingRow({ id: moreRow.id })
                }}
              >
                <DoneIcon fontSize="small" />
              </Button>
            }
            {
              moreRow.progress >= 0 &&
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnRed
                }}
                onClick={() => {
                  setDeletingRow({ id: moreRow.id })
                }}
              >
                <DeleteIcon fontSize="small" />
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
          Marketing Plan
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.followup.campaign.marketing_plan.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Follow-up Plan
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
            {moreRow.followup.campaign.follow_up_plan.steps.map((label, index) => (
              <Step key={'steplabel' + index}>
                <StepLabel
                  // onClick={() => setActiveStep(index)}
                  style={{ cursor: 'pointer' }}
                >Step {index + 1}</StepLabel>
              </Step>
            ))}
            {/* <Step classes={{ root: classes.addStep }}>
              <StepLabel StepIconProps={{ icon: <AddIcon /> }}>Add Step</StepLabel>
            </Step> */}
          </Stepper>
          <Grid container spacing={8}>
            {
              moreRow.followup.campaign.follow_up_plan.steps &&
              <>
                <Grid className={classes.inputCustom} item xs={6}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Steps
                  </InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    name='stepOrder'
                    value={viewingOrder}
                    onChange={onChangeViewingOrder}
                    style={{ float: 'right' }}
                  >
                    {moreRow.followup.campaign.follow_up_plan.steps && moreRow.followup.campaign.follow_up_plan.steps.map((s, index) => {
                      return <MenuItem key={'ViewOrder' + index} value={index}>
                        Step {index + 1} ({s.duration > 1 ? s.duration + ' days' : s.duration + ' day'})
                  </MenuItem>
                    })}
                  </Select>
                </Grid>
              </>
            }
            {moreRow.followup.campaign.follow_up_plan.steps &&
              <Grid className='p-4' item xs={12}>
                <Paper className='p-4'>
                  <Grid container spacing={8}>
                    {
                      moreRow.followup.campaign.follow_up_plan.steps[viewingOrder] && moreRow.followup.campaign.follow_up_plan.steps[viewingOrder].conditions.map((c, index) => {
                        return (
                          <>
                            {
                              checkBoxOrRadio[viewingOrder] ?
                                <>
                                  <Grid item xs={5}>
                                    <TextField
                                      fullWidth
                                      required
                                      value={
                                        c['name']
                                      }
                                      name="name"
                                      classes={{
                                        underline: classes.cssUnderline,
                                      }}
                                      label="Name"
                                      disabled
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <FormControl fullWidth className={classes.formControl}>
                                      <InputLabel>
                                        Type
                       </InputLabel>
                                      <Select
                                        value={
                                          c['type']
                                        }
                                        disabled
                                        displayEmpty
                                        name="type"
                                        className={classes.selectEmpty}
                                        label="Type"
                                      >
                                        <MenuItem value="text">
                                          Text Field
                          </MenuItem>
                                        <MenuItem value="number">Number</MenuItem>
                                        <MenuItem value="check_box">
                                          Check Box
                          </MenuItem>
                                        <MenuItem value="radio">
                                          Check Box (Multiple choices)
                          </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </>
                                :
                                <>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      required
                                      value={moreRow.followup.campaign.follow_up_plan.steps[viewingOrder].actions.reduce((acc, a) => {
                                        acc += a + ', '
                                        return acc
                                      }, '').slice(0, -2)}
                                      classes={{
                                        underline: classes.cssUnderline,
                                      }}
                                      label="Actions"
                                      disabled
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <TextField
                                      fullWidth
                                      required
                                      value={
                                        c['name']
                                      }
                                      name="name"
                                      classes={{
                                        underline: classes.cssUnderline,
                                      }}
                                      label="Name"
                                      disabled
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <FormControl fullWidth className={classes.formControl}>
                                      <InputLabel>
                                        Type
                                </InputLabel>
                                      <Select
                                        value={
                                          c['type']
                                        }
                                        disabled
                                        displayEmpty
                                        name="type"
                                        className={classes.selectEmpty}
                                        label="Type"
                                      >
                                        <MenuItem value="text">
                                          Text Field
                                  </MenuItem>
                                        <MenuItem value="number">Number</MenuItem>
                                        <MenuItem value="check_box">
                                          Check Box
                                  </MenuItem>
                                        <MenuItem value="radio">
                                          Check Box (Multiple choices)
                                  </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </>
                            }
                            {(c.type == 'check_box' || c.type == 'radio') &&
                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <Tooltip
                                  title={<ul style={{ paddingInlineStart: '16px', fontSize: '12px', maxWidth: '150px', wordBreak: 'break-word' }}>
                                    {c.choices.map(c => <li key={`selection${c}`}>{c}</li>)}</ul>}>
                                  <Typography classes={{ root: classes.linkStyleCustom }}
                                    onClick={() => handleOpenDialog(index)}
                                  >{c.choices.length} selection(s)
                            </Typography>
                                </Tooltip>
                              </Grid>
                            }
                          </>
                        )
                      })
                    }
                  </Grid>
                </Paper>
              </Grid>
            }
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