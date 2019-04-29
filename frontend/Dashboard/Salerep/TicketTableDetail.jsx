import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import SortIcon from '@material-ui/icons/ArrowUpward';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneIcon from '@material-ui/icons/Phone'
import SwapIcon from '@material-ui/icons/SwapHoriz'
import RemoveIcon from '@material-ui/icons/Remove'
import EmailIcon from '@material-ui/icons/Email'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/icons/AccessAlarm'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import * as cn from 'classnames'

import styles from './TicketTableDetailStyle.js'
import NoteDetail from './NoteDetail'
import TicketDetail from './TicketDetail'
import ContactDetail from './ContactDetail'
import { apiPost } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



function TicketTableDetail(props) {
  const { classes, history } = props;
  const [sortOption, setSortOption] = React.useState({
    type: 'name'
  })
  const [moreRow, setMoreRow] = React.useState(null)
  const [indexActive, setIndexActive] = React.useState(0)

  const [contactHistories, setContactHistories] = React.useState({
    'Send Email ': 0,
    'Send Email Manually': 0,
    'Call Client': 0
  })

  const [first, setFirst] = React.useState(true)

  const [tickets, setTickets, setUrl, forceUpdate] =
    useFetchData(CONTACT_MARKETING_URL, history, {
      data: []
    })

  React.useEffect(() => {
    if (!first) {
      handleViewDetail(indexActive)
    }
  })

  React.useEffect(() => {
    if (first && tickets.data.length > 0) {
      let t = tickets.data[0]
      setFirst(false)
      setMoreRow({
        full_name: t.contact.full_name,
        mail: t.contact.mail,
        phone: t.contact.phone,
        campaignName: t.campaign.name,
        id: t.id,
        contact: t.contact,
        campaign: t.campaign,
        histories: t.histories,
        marketing: t
      })
    }
  }, [tickets.data.length])

  const handleChangeSelectSortOption = e => {
    setSortOption({ [e.target.name]: e.target.value });
  }

  const handleViewDetail = (index) => {
    let t = tickets.data[index]
    setMoreRow({
      full_name: t.contact.full_name,
      mail: t.contact.mail,
      phone: t.contact.phone,
      campaignName: t.campaign.name,
      id: t.id,
      contact: t.contact,
      campaign: t.campaign,
      histories: t.histories,
      marketing: t
    })
    setIndexActive(index)
  }


  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Tickets</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Grid container style={{ height: '100%' }} spacing={8}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={sortOption.type}
                    onChange={handleChangeSelectSortOption}
                    inputProps={{
                      name: 'type',
                    }}
                  >
                    <MenuItem value="name">
                      Name
                  </MenuItem>
                    <MenuItem value="campaign">
                      Campaign
                  </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="text-right" item xs={6}>
                <SortIcon fontSize="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="simple-start-adornment"
                  className={cn(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><CloseIcon fontSize="small" /></InputAdornment>
                  }}
                />
              </Grid>
              <div className={classes.formContact}>
                <ul>
                  {
                    tickets.data && tickets.data.map((t, index) => {
                      return (
                        <li className={cn({ active: index == indexActive })} key={index} onClick={() => {
                          handleViewDetail(index)
                        }}>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {t.contact.full_name}
                          </Typography>
                          <Typography>
                            {t.contact.phone}
                          </Typography>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <Grid className="pt-1" item xs={6}>
                <SortIcon fontSize="small" />
              </Grid>
              <Grid className="text-right" item xs={6}>
                contact 1 of 5
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid style={{ padding: '45px 40px' }} container spacing={24}>
            {
              moreRow &&
              <TicketDetail
                histories={moreRow.histories}
                allHistories={moreRow.histories}
                campaign={moreRow.campaign}
                id={moreRow.id}
                contact={moreRow.contact}
                marketing={moreRow.marketing}
                updateTable={() => { forceUpdate() }}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(TicketTableDetail);