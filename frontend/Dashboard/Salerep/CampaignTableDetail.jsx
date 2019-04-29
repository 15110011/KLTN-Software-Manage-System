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

import * as dateFns from 'date-fns'
import * as cn from 'classnames'

import styles from './CampaignTableDetailStyle'
import NoteDetail from './NoteDetail'
import CampaignDetail from './CampaignDetail'
import ContactDetail from './ContactDetail'
import { apiPost } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import { CAMPAIGNS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



function CampaignTableDetail(props) {
  const { classes,
    history,
    setMovingRow,
    setDeletingRow
  } = props;
  const [sortOption, setSortOption] = React.useState({
    type: 'name'
  })
  const [moreRow, setMoreRow] = React.useState(null)
  const [indexActive, setIndexActive] = React.useState(0)
  const [update, setUpdate] = React.useState(0)
  // const [contactHistories, setContactHistories] = React.useState({
  //   'Send Email ': 0,
  //   'Send Email Manually': 0,
  //   'Call Client': 0
  // })

  const [first, setFirst] = React.useState(true)

  const [campaigns, setCampaigns, setUrl, forceUpdate] =
    useFetchData(CAMPAIGNS_URL, history, {
      data: []
    })


  React.useEffect(() => {
    if (!first) {
      handleViewDetail(indexActive)
    }
  }, [update])



  React.useEffect(() => {
    if (first && campaigns.data.length > 0) {
      let c = campaigns.data[0]
      let status = 'Idle'
      if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
        && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
        status = 'Active'
      }
      else if (dateFns.isAfter(c.end_date, dateFns.parseISO(new Date().toISOString()))) {
        status = 'Finished'
      }
      setFirst(false)
      setUpdate(update + 1)
      setMoreRow({
        name: c.name,
        product: c.product ? c.product.name : <i>Undefined</i>,
        start: c.start_date,
        end: c.end_date,
        id: c.id,
        packages: c.packages,
        follow_up_plan: c.follow_up_plan,
        marketing_plan: c.marketing_plan,
        status
      })
    }
  }, [campaigns.data.length])


  const handleChangeSelectSortOption = e => {
    setSortOption({ [e.target.name]: e.target.value });
  }

  const handleViewDetail = (index) => {
    let c = campaigns.data[index]
    let status = 'Idle'
    if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
      && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
      status = 'Active'
    }
    else if (dateFns.isAfter(c.end_date, dateFns.parseISO(new Date().toISOString()))) {
      status = 'Finished'
    }
    setMoreRow({
      name: c.name,
      product: c.product ? c.product.name : <i>Undefined</i>,
      start: c.start_date,
      end: c.end_date,
      id: c.id,
      packages: c.packages,
      follow_up_plan: c.follow_up_plan,
      marketing_plan: c.marketing_plan,
      status
    })
    setIndexActive(index)
  }


  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Campaigns</BreadcrumbsItem>
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
                    campaigns.data && campaigns.data.map((c, index) => {
                      let status = 'Idle'
                      if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
                        && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
                        status = 'Active'
                      }
                      else if (dateFns.isAfter(c.end_date, dateFns.parseISO(new Date().toISOString()))) {
                        status = 'Finished'
                      }
                      return (
                        <li className={cn({ active: index == indexActive })} key={index} onClick={() => {
                          handleViewDetail(index)
                        }}>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {c.name}
                          </Typography>
                          {
                            status == 'Active' &&
                            <Button
                              variant='contained'
                              classes={{
                                contained: classes.btnStatusActive
                              }}
                            >
                              {status}
                            </Button>
                          }
                          {
                            status == 'Idle' &&
                            <Button
                              variant='contained'
                              classes={{
                                contained: classes.btnStatusIdle
                              }}
                            >
                              {status}
                            </Button>
                          }
                          {
                            status == 'Finished' &&
                            <Button
                              variant='contained'
                              classes={{
                                contained: classes.btnStatusFinished
                              }}
                            >
                              {status}
                            </Button>
                          }
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
              <CampaignDetail
                moreRow={moreRow}
                setDeletingRow={setDeletingRow}
                setMovingRow={setMovingRow}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CampaignTableDetail);