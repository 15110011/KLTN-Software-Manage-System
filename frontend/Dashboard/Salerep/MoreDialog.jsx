import * as React from 'react'

import { Link } from 'react-router-dom'

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
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL } from '../../common/urls';


function MoreDialog(props) {

  const { classes, setDialog, campaign, contact, histories } = props


  const [contactHistories, setContactHistories] = React.useState({
    'Send Email': 0,
    'Call Client': 0
  })

  const [contactDetail, setContactDetail] = React.useState(false)


  React.useEffect(() => {
    // Effect
    const clonetHistoriesInfo = {
      'Send Email': 0,
      'Call Client': 0
    }
    histories.forEach(h => {
      clonetHistoriesInfo[h.action] += 1
    })

    setContactHistories(
      clonetHistoriesInfo
    )

  }, [histories.length])

  return (
    <>
      {contactDetail && <ContactDetail toggleDialog={() => {
        setContactDetail(false)
      }}
        contact={contact}
        contactHistories={histories}
      ></ContactDetail>}
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
                      acc += `${contactHistories[k]} (${k}),`
                    }
                    return acc
                  }, '').slice(0, -1)
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
                  Latest contact:
                </Grid>
                <Grid item xs={4}>
                  <DialogContentText>
                    {dateFns.format(histories[histories.length - 1].created, 'DD-MM-YYYY')}
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

          <Button
            variant='contained'
            classes={{
              contained: classes.btnGreen
            }}
          >
            Call

            <PhoneIcon></PhoneIcon>
          </Button>

          <Button
            variant='contained'
            classes={{
              contained: classes.btnPink
            }}
          >
            Mail
          <EmailIcon></EmailIcon>
          </Button>

          <Button
            variant='contained'
            classes={{
              contained: classes.btnBlue
            }}
          >
            Note
          <NoteIcon></NoteIcon>
          </Button>

          <Button
            variant='contained'
            classes={{
              contained: classes.btnYellow
            }}
          >
            Later
          {/* <TimerIcon></TimerIcon> */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}
export default withStyles(styles)(MoreDialog)