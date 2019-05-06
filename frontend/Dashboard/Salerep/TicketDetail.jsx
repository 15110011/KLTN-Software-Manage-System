import * as React from 'react'

import { Link, withRouter } from 'react-router-dom'

import { withStyles, Typography, Paper } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import SwapIcon from '@material-ui/icons/SwapHoriz'
import RemoveIcon from '@material-ui/icons/Remove'
import EmailIcon from '@material-ui/icons/Email'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/icons/AccessAlarm'
import * as dateFns from 'date-fns'
import { Input, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { apiPost } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import CreateEventDialog from '../../Events/CreateEventDialog'
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



import styles from './SalerepStyles.js'
import NoteDetail from './NoteDetail'
import ContactDetail from './ContactDetail'
import SendMailDialog from '../../Mailbox/SendMailDialog'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

function TicketDetail(props) {

  const {
    classes,
    campaign,
    contact,
    histories,
    allHistories,
    id,
    updateTable,
    marketing,
    user,
    setDeletingRow,
    setMovingRow,
    updateActivities,
    getMoreRow,
  } = props

  const [contactHistories, setContactHistories] = React.useState({
    'Send Email ': 0,
    'Send Email Manually': 0,
    'Call Client': 0
  })
  const [selectTabActivity, setSelectTabActivity] = React.useState({
    type: 'notes'
  })

  const [noteDialog, setNoteDialog] = React.useState(false)
  const [laterDialog, setLaterDialog] = React.useState(false)
  const [mailDialog, setMailDialog] = React.useState(false)



  const [contactDetail, setContactDetail] = React.useState(false)
  const [successNoti, setSuccessNoti] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [value, setValue] = React.useState(1)

  const handleChangeSelectTabActivity = e => {
    setSelectTabActivity({ [e.target.name]: e.target.value });
  }

  const handleChange = (event, value) => {
    setValue(value)
  };

  const handleChangeIndex = index => {
    setValue(index)
  };

  React.useEffect(() => {
    // Effect
    const cloneHistoriesInfo = {
      'Send Email': 0,
      'Call Client': 0,
      'Send Email Manually': 0
    }
    histories.forEach(h => {
      cloneHistoriesInfo[h.action] += 1
    })

    setContactHistories(
      cloneHistoriesInfo
    )

  }, [histories.length])

  const onCall = () => {
    apiPost(CONTACT_MARKETING_URL + '/' + id + '/history', { action: 'Call Client' }, false, true).then(res => {
      updateTable()
      setContactHistories({ ...contactHistories, 'Call Client': contactHistories['Call Client'] + 1 })
      setSuccessNoti('Successfully Called')
      setTimeout(() => {
        setSuccessNoti(false)
      }, 2000);
      getMoreRow(id)
    })
  }

  const onSendEmail = () => {
    setMailDialog(true)
  }

  const updateMailMetric = () => {
    apiPost(CONTACT_MARKETING_URL + '/' + id + '/history', { action: 'Send Email Manually' }, false, true).then(res => {
      updateTable()
      setContactHistories({ ...contactHistories, 'Send Email Manually': contactHistories['Send Email Manually'] + 1 })
      setSuccessNoti('Successfully Sent Email')
      setTimeout(() => {
        setSuccessNoti(false)
      }, 2000);
    })
  }


  return (
    <>
      {mailDialog &&
        <SendMailDialog user={user} contact={contact} toggleDialog={() => { setMailDialog(!mailDialog) }}
          updateMailMetric={updateMailMetric}
        />
      }
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      {/* {contactDetail && <ContactDetail toggleDialog={() => {
        setContactDetail(false)
      }}
        contact={contact}
        contactHistories={histories}
      ></ContactDetail>} */}

      {laterDialog && <CreateEventDialog user={user} toggleDialog={() => { setLaterDialog(!laterDialog) }}
        type_ = 'campaign'
        targets={[contact]} marketing={marketing}
        updateActivities={updateActivities}
        contactOptions={[contact]}
      />}
      {/* {noteDialog && <NoteDialog toggleDialog={() => {
        setNoteDialog(false)
      }}
        campaign={campaign}
        contact={contact}
      ></NoteDialog>} */}
      <Grid style={{ padding: '10px 40px' }} container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="title">
            {contact.first_name}
          </Typography>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>
            {marketing.marketing_plan.actions.findIndex(a => a == 'Call Client') != -1 &&
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

            {marketing.marketing_plan.actions.findIndex(a => a == 'Send Email') != -1 &&
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
            <Button
              variant='contained'
              classes={{
                contained: classes.btnPurple
              }}
              onClick={() => {
                setMovingRow({ id: id, full_name: marketing.contact.full_name })
              }}
            >
              <SwapIcon fontSize="small" />
            </Button>
            <Button
              variant='contained'
              classes={{
                contained: classes.btnRed
              }}
              onClick={() => {
                setDeletingRow({ id: id, full_name: marketing.contact.full_name, campaignName: marketing.campaign.name })
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
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
            {contact.first_name + ' ' + contact.last_name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Email
            </Grid>
        <Grid item xs={4} >
          <DialogContentText className={classes.inputCustom}>
            {contact.mail}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Phone
          </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {contact.phone}
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
            {campaign.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Packages
            </Grid>
        <Grid item xs={4}>
          <Grid container spacing={8}>
            {
              campaign.packages.map(p => {
                return (
                  <Grid item xs={12} key={p.id}>
                    <DialogContentText>
                      <Link to={'packages/' + p.id}>
                        {p.name}
                      </Link>
                    </DialogContentText>
                  </Grid>
                )
              })
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
                label="Personal"
              />
            </Tabs>
            {
              selectTabActivity.type == "history" &&
              <>
                {value === 0 &&
                  <TabContainer>
                    <ContactDetail
                      contact={contact}
                      contactHistories={allHistories}
                    />
                  </TabContainer>
                }
                {value === 1 &&
                  <TabContainer>
                    <ContactDetail
                      contact={contact}
                      contactHistories={histories}
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
                    <NoteDetail
                      type="all"
                      campaign={campaign}
                      contact={contact}
                    />
                  </TabContainer>
                }
                {value === 1 &&
                  <TabContainer>
                    <NoteDetail
                      campaign={campaign}
                      contact={contact}
                    />
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
export default withStyles(styles)(withRouter(TicketDetail))