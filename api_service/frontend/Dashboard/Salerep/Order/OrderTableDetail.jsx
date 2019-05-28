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

import styles from './OrderDetailStyle.js'
import useFetchData from '../../../CustomHook/useFetchData'
import { ORDER_URL, CONTACT_URL, PACKAGES_URL, CONTACT_MARKETING_URL } from '../../../common/urls';
import OrderDetail from './OrderDetail'


function OrderTableDetail(props) {

  const { classes, history } = props;
  const [sortOption, setSortOption] = React.useState({
    type: 'name'
  })
  const [moreRow, setMoreRow] = React.useState(null)
  const [deletingRow, setDeletingRow] = React.useState(null)
  const [movingRow, setMovingRow] = React.useState(null)
  const [indexActive, setIndexActive] = React.useState(0)
  const [update, setUpdate] = React.useState(0)


  const [first, setFirst] = React.useState(true)

  const [order, setOrder, setUrl, forceUpdate] =
    useFetchData(ORDER_URL + '?status=COMPLETED', history, {
      data: []
    })
  // React.useEffect(() => {
  //   if (!first) {
  //     handleViewDetail(indexActive)
  //   }
  // }, [update])

  const handleChangeSelectSortOption = e => {
    setSortOption({ [e.target.name]: e.target.value });
  }


  React.useEffect(() => {
    if (first && order.data.length > 0) {
      const firstOrder = order.data[0]
      setFirst(false)
      setUpdate(update + 1)
      setMoreRow({
        name: firstOrder.name,
        status: firstOrder.status,
        packages: firstOrder.packages,
        contacts: firstOrder.contacts,
        id: firstOrder.id,
        allLicenses: firstOrder.licenses
      })
    }
  }, [order.data.length])

  const handleViewDetail = (index) => {
    const firstOrder = order.data[index]
    setFirst(false)
    setUpdate(update + 1)
    setMoreRow({
      name: firstOrder.name,
      status: firstOrder.status,
      packages: firstOrder.packages,
      contacts: firstOrder.contacts,
      id: firstOrder.id,
      allLicenses: firstOrder.licenses
    })
    setIndexActive(index)
  }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/dashboard/`}>Orders</BreadcrumbsItem>
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
                      Order
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
                    order.data && order.data.map((order, index) => {
                      return (
                        <li className={cn({ activeElement: index == indexActive })} key={index} onClick={() => {
                          handleViewDetail(index)
                        }}>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {order.name}
                          </Typography>
                          <Typography variant="body2" style={{ paddingBottom: '10px' }}>
                            {
                              order.status == 'RUNNING' &&
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusActive
                                }}
                              >
                                {order.status}
                              </Button>
                            }
                            {
                              order.status == 'FAILED' &&
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusFinished
                                }}
                              >
                                {order.status}
                              </Button>
                            }
                            {
                              order.status == 'OVERDUE' &&
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusFinished
                                }}
                              >
                                {order.status}
                              </Button>
                            }
                            {
                              order.status == 'COMPLETED' &&
                              <Button
                                variant='contained'
                                classes={{
                                  contained: classes.btnStatusIdle
                                }}
                              >
                                {order.status}
                              </Button>
                            }
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
              <Grid className="text-right" style={{ padding: '12px' }} item xs={6}>
                {order.data.length} order(s)
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Grid style={{ padding: '45px 40px' }} container spacing={24}>
            {
              moreRow &&
              <OrderDetail
                id={moreRow.id}
                moreRow={moreRow}
                updateTable={() => { forceUpdate() }}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(OrderTableDetail);