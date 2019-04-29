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

import styles from './TicketDetailStyle.js'
import NoteDetail from './NoteDetail'
import ContactDetail from './ContactDetail'
import { apiPost } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



function TicketDetail(props) {
  const { classes } = props;
  const [sortOption, setSortOption] = React.useState({
    type: 'name'
  })
  const [dataViewDetail, setDataViewDetail] = React.useState({

  })

  const [contactHistories, setContactHistories] = React.useState({
    'Send Email ': 0,
    'Send Email Manually': 0,
    'Call Client': 0
  })

  const [tickets, setTickets, setUrl, forceUpdate] =
    useFetchData(CONTACT_MARKETING_URL, props.history, {

    })
  console.log(tickets.data)

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


  const handleChangeSelectSortOption = e => {
    setSortOption({ [e.target.name]: e.target.value });
  }

  // const handleViewDetail = (e, id) => {
  //   // props.history.push(`/ticket-detail/${id}`)
  //   console.log(id)
  //   const [dataViewDetail, setDataViewDetail, setUrl, forceUpdate] =
  //   useFetchData(CONTACT_MARKETING_URL + '/' + id, props.history, {

  //   })
  //   console.log(dataViewDetail)
  // }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>asd</BreadcrumbsItem>
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
              &nbsp;
              <div className={classes.formContact}>
                <ul>
                  {
                    tickets.data && tickets.data.map((t, i) => {
                      return (
                        <li key={i} onClick={(e) => {
                          handleViewDetail(e, t.id)
                        }}>
                          <Typography variant="p">
                            {t.contact.full_name}
                          </Typography>
                          <Typography variant="p">
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

          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(TicketDetail);