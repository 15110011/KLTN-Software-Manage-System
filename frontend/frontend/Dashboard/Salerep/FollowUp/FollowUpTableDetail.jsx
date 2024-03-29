import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SortIcon from '@material-ui/icons/ArrowUpward';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SortAscIcon from '@material-ui/icons/ArrowUpward';
import SortDescIcon from '@material-ui/icons/ArrowDownward';
import RefreshIcon from '@material-ui/icons/Refresh';
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
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Icon } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import * as cn from 'classnames'

import styles from './FollowUpStyle.js'
import useFetchData from '../../../CustomHook/useFetchData'
import { apiPatch } from '../../../common/Request'
import { ORDER_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../../common/urls';
import FollowUpDetail from './FollowUpDetail'


function FollowUpTableDetail(props) {

  const { classes, history, user } = props;
  const [moreRow, setMoreRow] = React.useState(null)
  const [deletingRow, setDeletingRow] = React.useState({})
  const [movingRow, setMovingRow] = React.useState({})
  const [indexActive, setIndexActive] = React.useState(0)
  const [update, setUpdate] = React.useState(0)
  const [sortOption, setSortOption] = React.useState('asc')
  const [isSort, setIsSort] = React.useState(false)
  const [searchOptions, setSearchOptions] = React.useState({
    type: 'name'
  })

  const [searchInput, setSearchInput] = React.useState('')

  const [first, setFirst] = React.useState(true)

  const [followUps, setFollowUps, setUrl, forceUpdate] =
    useFetchData(ORDER_URL, history, {
      data: []
    }, (data) => {
      if (!first) {
        if (data.data.length > 0) {
          let d = data.data[0]
          const noSteps = d.campaign.follow_up_plan.steps.length
          const progress = (d.step_details.reduce((acc, s) => {
            if (s.status == 'COMPLETED')
              acc += 1
            return acc
          }, 0) / noSteps * 100)
          setMoreRow({
            fname: d.contacts.first_name + ' ' + d.contacts.last_name,
            phone: d.contacts.phone,
            mail: d.contacts.mail,
            campaignName: d.campaign.name,
            noSteps,
            progress,
            id: d.id,
            followup: d,
            histories: d.history,
            allHistories: d.all_histories,
            packages: d.campaign.packages,
            contact: d.contacts
          })
        }
      }
    })

    console.log(moreRow)

  React.useEffect(() => {
    if (!first) {
      handleViewDetail(indexActive)
    }
  }, [update])

  const handleRefreshFollowUp = e => {
    e.preventDefault()
    setUrl(ORDER_URL)
    setSearchInput('')
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
    let searchString = `${searchOptions.type == 'name' ? '&contact_name=' + searchInput : ''}`
    searchString += `${searchOptions.type == 'campaign' ? '&campaign_name=' + searchInput : ''}`
    searchString += `${searchOptions.type == 'name' ? '&contact_order=' + sortOption : ''}`
    searchString += `${searchOptions.type == 'campaign' ? '&campaign_order=' + sortOption : ''}`
    setUrl(ORDER_URL + `?type=both` + searchString)
  }

  React.useEffect(() => {
    searchStringFunc()
  }, [sortOption])

  React.useEffect(() => {
    if (first && followUps.data.length > 0) {
      let d = followUps.data[0]
      const noSteps = d.campaign.follow_up_plan.steps.length
      const progress = (d.step_details.reduce((acc, s) => {
        if (s.status == 'COMPLETED')
          acc += 1
        return acc
      }, 0) / noSteps * 100)
      setFirst(false)
      setUpdate(update + 1)
      setMoreRow({
        fname: d.contacts.first_name + ' ' + d.contacts.last_name,
        phone: d.contacts.phone,
        mail: d.contacts.mail,
        campaignName: d.campaign.name,
        noSteps,
        progress,
        id: d.id,
        followup: d,
        histories: d.history,
        allHistories: d.all_histories,
        packages: d.campaign.packages,
        contact: d.contacts
      })
    }
  }, [followUps.data.length])

  const handleViewDetail = (index) => {
    let d = followUps.data[0]
    const noSteps = d.campaign.follow_up_plan.steps.length
    const progress = (d.step_details.reduce((acc, s) => {
      if (s.status == 'COMPLETED')
        acc += 1
      return acc
    }, 0) / noSteps * 100)
    setMoreRow({
      fname: d.contacts.first_name + ' ' + d.contacts.last_name,
      phone: d.contacts.phone,
      mail: d.contacts.mail,
      campaignName: d.campaign.name,
      noSteps,
      progress,
      id: d.id,
      followup: d,
      histories: d.history,
      allHistories: d.all_histories,
      packages: d.campaign.packages,
      contact: d.contacts
    })
    setIndexActive(index)
  }

  const onRemoveContact = () => {
    apiPatch(ORDER_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      forceUpdate()
      setDeletingRow({})
      if (followUps.data.length == 1) {
        setMoreRow(null)
      }
      else {
        handleViewDetail(0)
      }
    })
  }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Follow-up Contacts</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Dialog open={Object.keys(deletingRow).length != 0}
          onClose={() => { setDeletingRow({}) }
          }
        >
          <DialogTitle>
            FAIL CONTACT {deletingRow.fname} OUT OF CAMPAIGN {deletingRow.campaignName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                This action cannot be undone
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setDeletingRow({}) }}>Cancel</Button>
            <Button color='primary' onClick={() => { onRemoveContact() }}>Remove</Button>
          </DialogActions>
        </Dialog>
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
                          <MenuItem value="campaign">
                            Campaign
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
                        onChange={handleChangeSearchInput}
                        value={searchInput}
                        fullWidth
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
                    followUps.data && followUps.data.map((f, index) => {
                      return (
                        <li className={cn({ activeElement: index == indexActive })} key={index} onClick={() => {
                          handleViewDetail(index)
                        }}>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {f.contacts.first_name + ' ' + f.contacts.last_name}
                          </Typography>
                          <Typography>
                            {f.contacts.phone}
                          </Typography>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <Grid className="pt-1" item xs={6}>
                <IconButton type="button" onClick={(e) => handleRefreshFollowUp(e)}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid className="text-right" style={{ padding: '12px' }} item xs={6}>
                {followUps.data.length} contact(s)
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid style={{ padding: '45px 40px' }} container spacing={24}>
            {
              moreRow ?
                <FollowUpDetail
                  // histories={moreRow.histories}
                  // allHistories={moreRow.histories}
                  id={moreRow.id}
                  moreRow={moreRow}
                  followup={moreRow.followup}
                  contact={moreRow}
                  updateTable={() => { forceUpdate() }}
                  user={user}
                /> : 'No record to display'
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(FollowUpTableDetail);