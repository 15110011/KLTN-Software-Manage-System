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
import * as dateFns from 'date-fns'
import Tooltip from '@material-ui/core/Tooltip'
import PlayIcon from '@material-ui/icons/PlayArrow'
import { Input, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { apiPost } from '../../../common/Request'
import CustomSnackbar from '../../../components/CustomSnackbar'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../../common/urls';
import SendMailDialog from '../../../Mailbox/SendMailDialog'

import * as dateFns from 'date-fns'
import LicenseDetail from './LicenseDetail'



import styles from './OrderDetailStyle.js'
import LifetimeLicenseDetail from './LifetimeLicenseDetail';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

function OrderDetail(props) {

  const {
    classes,
    setMovingRow,
    setDeletingRow,
    moreRow,
    userId,
    user
  } = props
  console.log(moreRow)
  // const [contactHistories, setContactHistories] = React.useState({
  //   'Send Email ': 0,
  //   'Send Email Manually': 0,
  //   'Call Client': 0
  // })
  const [selectTabActivity, setSelectTabActivity] = React.useState({
    type: 'description'
  })

  const [noteDialog, setNoteDialog] = React.useState(false)
  const [laterDialog, setLaterDialog] = React.useState(false)
  const [mailDialog, setMailDialog] = React.useState(false)



  const [contactDetail, setContactDetail] = React.useState(false)
  const [successNoti, setSuccessNoti] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [value, setValue] = React.useState(0)

  const handleChangeSelectTabActivity = e => {
    setSelectTabActivity({ [e.target.name]: e.target.value });
  }

  const handleChange = (event, value) => {
    setValue(value)
  };

  const handleChangeIndex = index => {
    setValue(index)
  };

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
  const onSendEmail = () => {
    setMailDialog(true)
  }

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

  return (
    <>
      {
        mailDialog &&
        <SendMailDialog user={user.id} contact={moreRow.contacts} toggleDialog={() => { setMailDialog(!mailDialog) }}
          updateMailMetric={updateMailMetric}
        />
      }

      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      <Grid style={{ padding: '10px 40px' }} container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={12} className="d-flex">
              <Typography variant="title" style={{ marginTop: '5px' }}>
                #{moreRow.id}
              </Typography>
              &nbsp;
              &nbsp;
              &nbsp;
              {
                moreRow.status == 'RUNNING' &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusActive
                  }}
                >
                  {moreRow.status}
                </Button>
              }
              {
                moreRow.status == 'FAILED' &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusFinished
                  }}
                >
                  {moreRow.status}
                </Button>
              }
              {
                moreRow.status == 'OVERDUE' &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusFinished
                  }}
                >
                  {moreRow.status}
                </Button>
              }
              {
                moreRow.status == 'COMPLETED' &&
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnStatusIdle
                  }}
                >
                  {moreRow.status}
                </Button>
              }


            </Grid>
          </Grid>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>
            <Tooltip title="Send Email">
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
            <Tooltip title="Call">
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
          </DialogActions>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Order Info
            </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          ID
          </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.id}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Packages
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            <Tooltip
              placement='bottom-start'
              title={<ul style={{ paddingInlineStart: '16px', fontSize: '12px', wordBreak: 'break-word' }}>
                {moreRow.packages.map(p =>
                  <li key={`package${p}`}>{p.name}</li>)
                }
              </ul>
              }>
              <Typography classes={{ root: classes.linkStyleCustom }}
                onClick={() => handleOpenDialog(index)}
              >
                {moreRow.packages.length}&nbsp;package(s)
              </Typography>
            </Tooltip>
          </DialogContentText>
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>

          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Client Info
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Name
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.contacts.first_name}  {moreRow.contacts.last_name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Phone Number
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.contacts.phone}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Email
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.contacts.mail}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Address
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.contacts.address}, {moreRow.contacts.city}, {moreRow.contacts.country}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={9}>
          License Info
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
                label="Monthly"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Lifetime"
              />
            </Tabs>
            {value === 0 &&
              <TabContainer>
                <LicenseDetail
                  allLicenses={moreRow.allLicenses}
                />
              </TabContainer>
            }
            {value === 1 &&
              <TabContainer>
                <LifetimeLicenseDetail
                  allLicenses={moreRow.allLifetimeLicenses}
                />
              </TabContainer>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default withStyles(styles)(withRouter(OrderDetail))