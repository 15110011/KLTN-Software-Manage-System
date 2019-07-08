import * as React from 'react'

import { Link, withRouter } from 'react-router-dom'

import { withStyles, Typography, Paper, IconButton, Button } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import AddIcon from '@material-ui/icons/Add'
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
import { apiPost } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';
import * as dateFns from 'date-fns'
import CampaignContactDetail from './CampaignContactDetail'



import styles from './CampaignDetailStyle.js'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

function CampaignDetail(props) {

  const {
    classes,
    setMovingRow,
    setDeletingRow,
    moreRow,
    userId,

  } = props

  // const [contactHistories, setContactHistories] = React.useState({
  //   'Send Email ': 0,
  //   'Send Email Manually': 0,
  //   'Call Client': 0
  // })
  const [selectTabActivity, setSelectTabActivity] = React.useState({
    type: 'contact'
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

  // React.useEffect(() => {
  //   // Effect
  //   const cloneHistoriesInfo = {
  //     'Send Email': 0,
  //     'Call Client': 0,
  //     'Send Email Manually': 0
  //   }
  //   histories.forEach(h => {
  //     cloneHistoriesInfo[h.action] += 1
  //   })

  //   setContactHistories(
  //     cloneHistoriesInfo
  //   )

  // }, [histories.length])
  return (
    <>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      <Grid style={{ padding: '10px 40px' }} container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={8}>
            <Grid item xs={12} className="d-flex">
              <Typography variant="title" style={{ marginTop: '5px' }}>
                {moreRow.name}
              </Typography>
              &nbsp;
              &nbsp;
              &nbsp;
              {
                moreRow.status == 'Active' &&
                <Tooltip title="Status">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnStatusActive
                    }}
                  >
                    {moreRow.status}
                  </Button>
                </Tooltip>
              }
              {
                moreRow.status == 'Idle' &&
                <Tooltip title="Status">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnStatusIdle
                    }}
                  >
                    {moreRow.status}
                  </Button>
                </Tooltip>
              }
              {
                moreRow.status == 'Finished' &&
                <Tooltip title="Status">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnStatusFinished
                    }}
                  >
                    {moreRow.status}
                  </Button>
                </Tooltip>
              }
            </Grid>
          </Grid>
          <DialogActions style={{ float: 'left', marginLeft: '-4px' }}>
            {
              moreRow.manager == userId && moreRow.status == 'Idle' &&
              <Tooltip title="Start campaign">
                <Button
                  variant='contained'
                  classes={{
                    contained: classes.btnPurple
                  }}
                  onClick={() => {
                    setMovingRow({ id: moreRow.id, name: moreRow.name, start: moreRow.start })
                  }}
                >
                  <PlayIcon fontSize="small" />
                </Button>
              </Tooltip>
            }
            {

              moreRow.manager == userId && moreRow.status == 'Idle' &&
              <>
                <Tooltip title="Delete campaign">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnRed
                    }}
                    onClick={() => {
                      setDeletingRow({ id: moreRow.id, name: moreRow.name })
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Tooltip>
                &nbsp;
                <Tooltip title="Add contact to this campaign">
                  <Button
                    variant='contained'
                    classes={{
                      contained: classes.btnGreen
                    }}
                    onClick={() => {
                      setDeletingRow({ id: moreRow.id, name: moreRow.name })
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </>
            }
          </DialogActions>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Campaign info
            </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Name
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.name}
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
              >{moreRow.packages.length}&nbsp;package(s)</Typography>
            </Tooltip>
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Product
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.product}
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
            {moreRow.marketing_plan.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Follow-up Plan
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {moreRow.follow_up_plan.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Start
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {dateFns.format(dateFns.parseISO(moreRow.start), 'dd-MM-yyyy')}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          End
            </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {dateFns.format(dateFns.parseISO(moreRow.end), 'dd-MM-yyyy')}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={9}>
          More Info
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
              <MenuItem value="contact">
                Contacts
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
            </Tabs>
            {
              selectTabActivity.type == "contact" &&
              <>
                {value === 0 &&
                  <TabContainer>
                    <CampaignContactDetail
                      allContacts={moreRow.allContacts}
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
export default withStyles(styles)(withRouter(CampaignDetail))