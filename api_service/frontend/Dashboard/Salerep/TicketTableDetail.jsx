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
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import IconButton from '@material-ui/core/IconButton';
import SortAscIcon from '@material-ui/icons/ArrowUpward';
import SortDescIcon from '@material-ui/icons/ArrowDownward';
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
import { apiPost, apiPatch, apiGet } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import { EVENTS_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../common/urls';



function TicketTableDetail(props) {
  const { classes, history, user } = props;
  const [moreRow, setMoreRow] = React.useState(null)
  const [indexActive, setIndexActive] = React.useState(0)
  const [deletingRow, setDeletingRow] = React.useState({})
  const [movingRow, setMovingRow] = React.useState({})
  const [laterDialog, setLaterDialog] = React.useState(false)

  const [contactHistories, setContactHistories] = React.useState({
    'Send Email ': 0,
    'Send Email Manually': 0,
    'Call Client': 0
  })
  const [sortOption, setSortOption] = React.useState('asc')
  const [isSort, setIsSort] = React.useState(false)
  const [searchOptions, setSearchOptions] = React.useState({
    type: 'name'
  })

  const [searchInput, setSearchInput] = React.useState('')

  const [first, setFirst] = React.useState(true)

  const handleSearch = e => {
    e.preventDefault()
    searchStringFunc()
  }

  const handleChangeSelectSearchOption = e => {
    setSearchOptions({ [e.target.name]: e.target.value });
  }

  const handleChangeSearchInput = e => {
    setSearchInput([e.target.name] = e.target.value)
  }


  const searchStringFunc = () => {
    let searchString = `${searchOptions.type == 'name' ? '&contact_name=' + searchInput : ''}`
    searchString += `${searchOptions.type == 'campaign' ? '&campaign=' + searchInput : ''}`
    searchString == `${searchOptions.type == 'name' ? '&contact_name_order=' + sortOption : ''}`
    searchString += `${searchOptions.type == 'product' ? '&campaign_order=' + sortOption : ''}`
    setUrl(CONTACT_MARKETING_URL + `?type=both` + searchString)
  }

  React.useEffect(() => {
    searchStringFunc()
  }, [sortOption])

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

  const [tickets, setTickets, setUrl, forceUpdate] =
    useFetchData(CONTACT_MARKETING_URL, history, {
      data: []
    }, data => {
      if (data.data.length) {
        let t = data.data[indexActive]
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
    })

  const handleRefreshTickets = e => {
    e.preventDefault()
    setUrl(CONTACT_MARKETING_URL)
    setSearchInput('')
  }

  // React.useEffect(() => {
  //   if (!first) {
  //     console.log(3)
  //     handleViewDetail(indexActive)
  //   }
  // })
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

  const onRemoveContact = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      setDeletingRow({})
      forceUpdate()

      if (tickets.data.length == 1) {
        setMoreRow(null)
      }
      else {
        handleViewDetail(0)
      }
    })
  }

  const onMoveToFollowUp = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + movingRow.id,
      { status: 'COMPLETED' }, false, true).then(res => {
        setMovingRow({})
        forceUpdate()
        if (tickets.data.length == 1) {
          setMoreRow(null)
        }
        else {
          handleViewDetail(0)
        }
      })
  }

  const handleViewDetail = (index) => {
    let t = tickets.data[index]
    if (t) {
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
    setIndexActive(index)
  }


  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Tickets</BreadcrumbsItem>
      <Dialog open={Object.keys(movingRow).length != 0}
        onClose={() => { setMovingRow({}) }
        }
      >
        <DialogTitle>
          Confirm Action
            </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              Move contact <b>({movingRow.full_name})</b> to follow-up phase
              . This action cannot be undone. Are you sure?
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setMovingRow({}) }}>Cancel</Button>
          <Button color='primary' onClick={() => { onMoveToFollowUp() }}>Move</Button>
        </DialogActions>
      </Dialog>
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
              Remove contact <b>({deletingRow.full_name})</b> out of campaign <b>({deletingRow.campaignName})</b>
              . This action cannot be undone. Are you sure?
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDeletingRow({}) }}>Cancel</Button>
          <Button color='primary' onClick={() => { onRemoveContact() }}>Remove</Button>
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
                    tickets.data && tickets.data.map((t, index) => {
                      return (
                        <li className={cn({ activeElement: index == indexActive })} key={index} onClick={() => {
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
                <IconButton onClick={e => handleRefreshTickets(e)}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid className="text-right" item xs={6}>
                {tickets.data.length} ticket(s)
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
                setDeletingRow={setDeletingRow}
                setMovingRow={setMovingRow}
                user={user}
                setLaterDialog={setLaterDialog}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default withStyles(styles)(TicketTableDetail);