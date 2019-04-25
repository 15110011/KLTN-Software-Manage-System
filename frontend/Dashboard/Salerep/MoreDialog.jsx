import * as React from 'react'

import { Link, withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/core/AccessTime'

import * as dateFns from 'date-fns'

import { Input, InputLabel } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import styles from './SalerepStyles.js'
import ContactDetail from './ContactDetail'
import NoteDialog from './NoteDialog'
import { apiPost } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import CreateEventDialog from '../../Events/CreateEventDialog'
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';

import SendMailDialog from '../../Mailbox/SendMailDialog'


function MoreDialog(props) {

  const { classes, setDialog, campaign, contact, histories, id, updateTable, marketing, user,
    updateActivities
  } = props

  const [contactHistories, setContactHistories] = React.useState({
    'Send Email ': 0,
    'Send Email Manually': 0,
    'Call Client': 0
  })

  const [noteDialog, setNoteDialog] = React.useState(false)
  const [laterDialog, setLaterDialog] = React.useState(false)
  const [mailDialog, setMailDialog] = React.useState(false)



  const [contactDetail, setContactDetail] = React.useState(false)
  const [successNoti, setSuccessNoti] = React.useState(false)
  const [error, setError] = React.useState(false)


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
      {contactDetail && <ContactDetail toggleDialog={() => {
        setContactDetail(false)
      }}
        contact={contact}
        contactHistories={histories}
      ></ContactDetail>}

      {laterDialog && <CreateEventDialog user={user} toggleDialog={() => { setLaterDialog(!laterDialog) }}
        targets={[contact]} marketing={marketing}
        updateActivities={updateActivities}
      />}
      {noteDialog && <NoteDialog toggleDialog={() => {
        setNoteDialog(false)
      }}
        campaign={campaign}
        contact={contact}
      ></NoteDialog>}
      <Dialog open={true} onClose={() => { setDialog(false) }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Contact Actions - Campaign {campaign.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid className={classes.inputCustom} item xs={2}>
              Contact:
          </Grid>
            <Grid item xs={4}>
              <DialogContentText>
                {contact.first_name + ' ' + contact.last_name}
              </DialogContentText>
            </Grid>

            <Grid className={classes.inputCustom} item xs={2}>
              Email:
          </Grid>
            <Grid item xs={4}>
              <DialogContentText>
                {contact.mail}
              </DialogContentText>
            </Grid>

            <Grid className={classes.inputCustom} item xs={2}>
              Phone:
          </Grid>
            <Grid item xs={4}>
              <DialogContentText>
                {contact.phone}
              </DialogContentText>
            </Grid>
            <Grid item xs={6}></Grid>

            <Grid className={classes.inputCustom} item xs={2}>
              Contact times:
          </Grid>
            <Grid item xs={4}>
              {histories.length > 0 ? <DialogContentText onClick={() => { setContactDetail(true) }} className={classes.linkStyle}
                style={{ cursor: 'pointer' }}>
                {
                  Object.keys(contactHistories).reduce((acc, k) => {
                    if (contactHistories[k] != 0) {
                      acc += `${contactHistories[k]} (${k}), `
                    }
                    return acc
                  }, '').slice(0, -2)
                }
              </DialogContentText>
                :
                <DialogContentText>
                  0
                 </DialogContentText>
              }
            </Grid>

            {histories.length > 0 ?
              <>
                <Grid className={classes.inputCustom} item xs={2}>
                  Last contact:
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText>
                    {dateFns.format(dateFns.parseISO(histories[0].created), 'dd-MM-yyyy')}
                  </DialogContentText>
                </Grid>
              </>
              : <Grid item xs={6}></Grid>
            }
            <Grid className={classes.inputCustom} item xs={2}>
              Packages:
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
          </Grid>

        </DialogContent>
        <DialogActions>

          {marketing.marketing_plan.actions.findIndex(a => a == 'Call Client') != -1 && < Button
            variant='contained'
            classes={{
              contained: classes.btnGreen
            }}
            onClick={() => {
              onCall()
            }}
          >
            Call{' '}
            <PhoneIcon></PhoneIcon>
          </Button>
          }

          {marketing.marketing_plan.actions.findIndex(a => a == 'Send Email') != -1 && <Button
            variant='contained'
            classes={{
              contained: classes.btnPink
            }}
            onClick={() => {
              onSendEmail()
            }}
          >
            Mail{' '}
            <EmailIcon></EmailIcon>
          </Button>
          }

          <Button
            variant='contained'
            classes={{
              contained: classes.btnBlue
            }}
            onClick={() => { setNoteDialog(true) }}
          >
            Note{' '}
            <NoteIcon></NoteIcon>
          </Button>

          <Button
            variant='contained'
            classes={{
              contained: classes.btnYellow
            }}
            onClick={() => {
              setLaterDialog(!laterDialog)
            }}
          >
            Later{' '}
            {/* <TimerIcon></TimerIcon> */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}
export default withStyles(styles)(withRouter(MoreDialog))