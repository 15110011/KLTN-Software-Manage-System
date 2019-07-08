import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import SortAscIcon from '@material-ui/icons/ArrowUpward';
import SortDescIcon from '@material-ui/icons/ArrowDownward';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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
import CustomSnackbar from '../../components/CustomSnackbar'
import ContactDetail from './ContactDetail'
import { apiPatch, apiPost, apiDelete, apiGet } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import { CAMPAIGNS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



function CampaignTableDetail(props) {
  const { classes,
    history,
  } = props;
  const [sortOption, setSortOption] = React.useState('asc')
  const [isSort, setIsSort] = React.useState(false)
  const [moreRow, setMoreRow] = React.useState(null)
  const [campaignRow, setMovingRow] = React.useState(false)
  const [deletingRow, setDeletingRow] = React.useState(false)


  const [indexActive, setIndexActive] = React.useState(0)
  const [update, setUpdate] = React.useState(0)
  const [notiSuccess, setNotiSuccess] = React.useState(false)
  const [searchOptions, setSearchOptions] = React.useState({
    type: 'name'
  })

  const [searchInput, setSearchInput] = React.useState('')

  // const [contactHistories, setContactHistories] = React.useState({
  //   'Send Email ': 0,
  //   'Send Email Manually': 0,
  //   'Call Client': 0
  // })

  const [first, setFirst] = React.useState(true)
  let order = []

  const handleRefreshCampaign = e => {
    e.preventDefault()
    setUrl(CAMPAIGNS_URL)
    setSearchInput('')
  }

  const [campaigns, setCampaigns, setUrl, forceUpdate] =
    useFetchData(CAMPAIGNS_URL, history, {
      data: []
    }, (data) => {
      if (!first && data.data.length > 0) {
        let c = data.data[indexActive]
        let status = 'Idle'
        if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
          && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
          status = 'Active'
        }
        else if (dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
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
          status,
          allContacts: c.contacts
        })
      }
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
      else if (dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
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
        status,
        allContacts: c.contacts
      })
    }
  }, [campaigns.data.length])


  const onNotiSuccess = (msg) => {
    setNotiSuccess(msg)
    setTimeout(() => {
      setNotiSuccess(false)
    }, 2000);
  }
  const handleChangeSelectSearchOption = e => {
    setSearchOptions({ [e.target.name]: e.target.value });
  }

  const handleChangeSearchInput = e => {
    setSearchInput([e.target.name] = e.target.value)
  }
  const handleSearch = e => {
    e.preventDefault()
    searchStringFunc()
  }

  const handleSort = e => {
    e.preventDefault()
    if (sortOption == 'asc') {
      setSortOption('desc')
      setIsSort(!isSort)
    } else {
      setSortOption('asc')
      setIsSort(!isSort)
    }
  }
  
  const searchStringFunc = () => {
    let searchString = `${searchOptions.type == 'name' ? '&campaign_name=' + searchInput : ''}`
    searchString += `${searchOptions.type == 'product' ? '&product_name=' + searchInput : ''}`
    searchString += `${searchOptions.type == 'status' ? '&status=' + searchInput : ''}`
    // searchString += `${searchOptions.type == 'product' ? '&product_order=' + sortOption : ''}`
    searchString += `${searchOptions.type == 'name' ? '&name_order=' + sortOption : ''}`
    searchString += `${searchOptions.type == 'product' ? '&product_order=' + sortOption : ''}`
    setUrl(CAMPAIGNS_URL + `?type=both` + searchString)
  }

  React.useEffect(() => {
    searchStringFunc()
  }, [sortOption])

  const handleViewDetail = (index) => {
    let c = campaigns.data[index]
    let status = 'Idle'
    if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
      && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
      status = 'Active'
    }
    else if (dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
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
      status,
      allContacts: c.contacts

    })
    setIndexActive(index)
  }

  const onRemoveCampaign = () => {
    apiDelete(CAMPAIGNS_URL + '/' + deletingRow.id, { status: 'FAILED' }, true).then(res => {
      setDeletingRow({})
      onNotiSuccess('Successfully Removed')
      forceUpdate()
    })
  }

  const onForceStart = () => {
    apiPatch(CAMPAIGNS_URL + '/' + campaignRow.id,
      { start_date: dateFns.format(new Date(), 'yyyy-MM-dd') }, false, true).then(res => {
        onNotiSuccess('Successfully Updated')
        setMovingRow(false)
        forceUpdate()
      })
  }


  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Campaigns</BreadcrumbsItem>
      {
        notiSuccess &&
        <CustomSnackbar success msg={notiSuccess} />
      }
      {Object.keys(campaignRow).length != 0
        && <Dialog open={true}
          onClose={() => { setMovingRow({}) }
          }
        >
          <DialogTitle>
            Confirm Action
              </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                This campaign <b>({campaignRow.name})</b> will be started on <br />
                <div>
                  New start date: <b><i>{dateFns.format(dateFns.parseISO(new Date().toISOString()), 'dd-MM-yyyy')}</i></b>
                </div>
                Original start date: <b><i>{dateFns.format(dateFns.parseISO(campaignRow.start), 'dd-MM-yyyy')}</i></b>.
                  </div>
              <div>This action cannot be undone. Are you sure?</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setMovingRow({}) }}>Cancel</Button>
            <Button color='primary' onClick={() => { onForceStart() }}>Start now</Button>
          </DialogActions>
        </Dialog>
      }
      <Dialog open={Object.keys(deletingRow).length != 0}
        onClose={() => { setDeletingRow({}) }
        }
      >
        <DialogTitle>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              This campaign<b> ({deletingRow.name})</b> will be removed.
              This action cannot be undone. Are you sure?
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDeletingRow({}) }}>Cancel</Button>
          <Button color='primary' onClick={() => { onRemoveCampaign() }}>Remove</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Grid container style={{ height: '100%' }} spacing={8}>
              <Grid item xs={12}>
                <form style={{ width: '100%' }} onSubmit={handleSearch}>
                  <Grid container spacing={8}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={searchOptions.type}
                          onChange={handleChangeSelectSearchOption}
                          inputProps={{
                            name: 'type',
                          }}
                        >
                          <MenuItem value="name">
                            Name
                  </MenuItem>
                          <MenuItem value="product">
                            Product
                  </MenuItem>
                          <MenuItem value="status">
                            Status
                  </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid className="text-right" item xs={6}>
                      <IconButton
                        className={cn(classes.sort,
                          {
                            [classes.sortDesc]: isSort,
                          }
                        )}
                        onClick={(e) => handleSort(e)}
                      >
                        <SortAscIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        onChange={handleChangeSearchInput}
                        value={searchInput}
                        id="simple-start-adornment"
                        className={cn(classes.margin, classes.textField)}
                        InputProps={{
                          startAdornment:
                            <InputAdornment position="start">
                              <IconButton onClick={handleSearch}>
                                <SearchIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>,
                          endAdornment:
                            <InputAdornment position="end">
                              <IconButton onClick={e => {
                                setSearchInput('')
                              }}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                        }}
                      />
                    </Grid>
                  </Grid>
                </form>
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
                      else if (dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
                        status = 'Finished'
                      }
                      return (
                        <li className={cn({ activeElement: index == indexActive })} key={index} onClick={() => {
                          handleViewDetail(index)
                        }}>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {c.name}
                          </Typography>
                          {
                            status == 'Active' &&
                            <Tooltip title="Status">
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusActive
                                }}
                              >
                                {status}
                              </Button>
                            </Tooltip>
                          }
                          {
                            status == 'Idle' &&
                            <Tooltip title="Status">
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusIdle
                                }}
                              >
                                {status}
                              </Button>
                            </Tooltip>
                          }
                          {
                            status == 'Finished' &&
                            <Tooltip title="Status">
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusFinished
                                }}
                              >
                                {status}
                              </Button>
                            </Tooltip>
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <Grid className="pt-1" item xs={6}>
                <IconButton onClick={e => handleRefreshCampaign(e)}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid className="text-right" style={{ padding: '12px' }}  item xs={6}>
                {campaigns.data.length} campaign(s)
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