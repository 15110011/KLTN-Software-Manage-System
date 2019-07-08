import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import * as dateFns from 'date-fns'
import * as cn from 'classnames'

import { EVENTS_URL, CONTACT_MARKETING_URL } from '../../common/urls';

import styles from './SalerepStyles.js'
import { EVENTS_URL, GROUP_URL, ORDER_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CreateEventDialog from '../../Events/CreateEventDialog'
import CustomFItlerRow from '../../components/CustomFilterRow'

import USERCONTEXT from '../../components/UserContext'
import { apiGet, apiPost, apiPatch } from '../../common/Request'
import useFetchData from '../../CustomHook/useFetchData'
import FollowUpDetail from './FollowUp/FollowUpDetail'
import TicketDetail from './TicketDetail'
import CustomSnackbar from '../../components/CustomSnackbar'
import stateHash from '../../common/StateHash'

let activitySearch = {
  viewType: 'campaign',
  timeRanges: [null, null, null, null, null, { from: null, to: null }]
}
let activePageActivity = 0

function ActivitiesTable(props) {

  const {
    classes,
    tableActivtyRef,
    tableMarketingRef,
    forceActivities,
    expanded,
    handleExpandClick
  } = props

  const [viewType, setViewType] = React.useState('campaign')

  const [createEventDialog, setCreateEventDialog] = React.useState(false)

  const [openDialog, setOpenDialog] = React.useState(false)
  const [successNoti, setSuccessNoti] = React.useState(false)

  const [moreRow, setMoreRow] = React.useState(null)

  const [deletingRow, setDeletingRow] = React.useState({})
  const [movingRow, setMovingRow] = React.useState({})
  const [groups, setGroups, setUrl] = useFetchData(GROUP_URL, null, { data: [], total: 0 })
  const [timeRanges, setTimeRanges] = React.useState([null, null, null, null, null, { from: null, to: null }])
  //Activity

  const notification = (m = 'Successfully Added') => {
    setSuccessNoti(m)
    setTimeout(() => {
      setSuccessNoti(false)
    }, 2000);
  }

  const onRemoveContact = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      forceActivities()
      setDeletingRow({})
      setOpenDialog(false)
      tableMarketingRef.current.onQueryChange()
      tableActivtyRef.current.onQueryChange()
      notification('Successfully Removed')
    })
  }

  const onMoveToFollowUp = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + movingRow.id,
      { status: 'COMPLETED' }, false, true).then(res => {
        forceActivities()
        tableMarketingRef.current.onQueryChange()
        setOpenDialog(false)
        tableActivtyRef.current.onQueryChange()
        notification('Successfully Moved')
        setMovingRow({})
      })
  }

  const activityOrder = []
  const getMoreRow = id => {
    apiGet(CONTACT_MARKETING_URL + '/' + id, true).then(res => {
      const c = res.data
      console.log(c)
      setMoreRow({
        full_name: c.contact.full_name,
        mail: c.contact.mail,
        phone: c.contact.phone,
        campaignName: c.campaign.name,
        id: c.id,
        contact: c.contact,
        campaign: c.campaign,
        histories: c.histories,
        marketing: c,
        thread_ids: c.thread_ids
      })
    })
  }

  const getMoreRow2 = id => {
    apiGet(ORDER_URL + '/' + id, true).then(res => {
      const d = res.data
      const noSteps = d.campaign.follow_up_plan.steps.length;
      const progress =
        (d.step_details.reduce((acc, s) => {
          if (s.status == "COMPLETED") acc += 1;
          return acc;
        }, 0) /
          noSteps) *
        100;
      setMoreRow({
        fname:
          d.contacts.first_name + " " + d.contacts.last_name,
        phone: d.contacts.phone,
        mail: d.contacts.mail,
        state: stateHash[d.contacts.state],
        campaignName: d.campaign.name,
        noSteps,
        progress,
        id: d.id,
        packages: d.campaign.packages,
        followup: d,
        histories: d.history,
        allHistories: d.all_histories,
        contact: d.contacts,
        created: d.created
      })
    })
  }

  return (

    <USERCONTEXT.Consumer>
      {({ user }) =>
        <div style={{ position: 'relative' }}>
          {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
          {createEventDialog && <CreateEventDialog
            toggleDialog={() => { setCreateEventDialog(!createEventDialog) }}
            user={user}
            setLaterDialog={setCreateEventDialog}
            notification={notification}
            mustBeCampaign={viewType == 'campaign'}
            mustBePersonal={viewType == 'personal'}
            type_={viewType}
            contactOptions={groups.data.reduce((acc, g) => {
              g.contacts = g.contacts.map(c => ({ ...c, label: `${c.first_name} ${c.last_name}`, value: c.id }))
              acc.push(...g.contacts)
              return acc
            }, [])}
            updateActivities={forceActivities}
          />}
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
          {openDialog == 'marketing' && moreRow &&
            <Dialog
              open={true}
              onClose={() => setOpenDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>
                  Manage Contact
                </h4>
              </DialogTitle>
              <DialogContent>
                <TicketDetail
                  histories={moreRow.histories}
                  allHistories={moreRow.histories}
                  campaign={moreRow.campaign} contact={moreRow.contact}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={tableActivtyRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  user={user}
                  setMovingRow={setMovingRow}
                  setDeletingRow={setDeletingRow}
                  getMoreRow={getMoreRow}
                  moreRow={moreRow}
                />
              </DialogContent>
            </Dialog>
          }
          {openDialog == 'followUp' && moreRow && (
            <Dialog
              open={true}
              onClose={() => setOpenDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>Manage Contact</h4>
              </DialogTitle>
              <DialogContent>
                <FollowUpDetail
                  histories={moreRow.histories}
                  allHistories={moreRow.histories}
                  campaign={moreRow.campaign2}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={tableActivtyRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  getMoreRow={getMoreRow}
                  // updateTable={tableActivtyRef.current.onQueryChange}
                  user={user}
                  setMovingRow={setMovingRow}
                  setDeletingRow={setDeletingRow}
                  moreRow={moreRow}
                  followup={moreRow.followup}
                  updateTable={() => {
                    forceFollowUp();
                    // tableMarketingRef.current.onQueryChange()
                    // let cloneMoreRow = { ...moreRow }
                    // cloneMoreRow.histories.unshift(contact)
                    // setMoreRow(cloneMoreRow)
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: viewType == 'campaign' ? expanded['upcoming1'] : expanded['upcoming2'],
            })}
            onClick={() => handleExpandClick(viewType == 'campaign' ? 'upcoming1' : 'upcoming2')}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          {viewType == 'campaign' &&
            <Collapse collapsedHeight="100px" timeout="auto" in={expanded['upcoming1']}>
              <MaterialTable
                tableRef={tableActivtyRef}
                components={
                  {
                    Header: props => <MTableHeader {...props}
                      onOrderChange={(orderBy, dir) => {
                        activityOrder.forEach((order, index) => {
                          if (orderBy != index) {
                            activityOrder[index] = null
                          }
                        })
                        activityOrder[orderBy] = dir

                        props.onOrderChange(orderBy, dir)
                      }}
                    />,
                    Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                      if (columnId == 1) {
                        activitySearch.target = value
                      }
                      else if (columnId == 2) {
                        activitySearch.campaign = value
                      }
                      else if (columnId == 3) {
                        activitySearch.phase = value
                      }
                      else if (columnId == 4) {
                        activitySearch.priority = value
                      }
                      else if (columnId == 5) {
                        activitySearch.timeRanges[columnId][position] = value
                        return
                      }
                      else if (columnId == 6) {
                        activitySearch.remaining = value
                      }
                      activePageActivity = 0
                      props.onFilterChanged(columnId, value);
                    }}
                    />,
                    Toolbar: props =>
                      <>
                        <Card plain>
                          <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Upcoming Activities</h4>
                          </CardHeader>
                        </Card>
                        <div className='px-4 d-flex justify-content-between'>
                          <Typography classes={{ root: classes.activitytTagline }} component='span'>
                            Events which start today will be displayed in this table
                          </Typography>
                          <span>
                            <Select
                              value={viewType}
                              onChange={
                                (e) => {
                                  tableActivtyRef.current.onQueryChange({ search: `&view_type=${e.target.value}` })
                                  activitySearch.viewType = e.target.value
                                  setViewType(e.target.value)
                                }
                              }
                            >
                              <MenuItem value='campaign'>Campaign</MenuItem>
                              <MenuItem value='personal'>Personal</MenuItem>
                            </Select>
                            <Tooltip title="Create new activity">
                              <IconButton onClick={() => { setCreateEventDialog(true) }}>
                                <AddIcon></AddIcon>
                              </IconButton>
                            </Tooltip>
                          </span>
                        </div>
                      </>
                    ,

                    Pagination: props => <TablePagination {...props}
                      page={activePageActivity} rowsPerPageOptions={[5, 10, 20]}
                      count={props.count}
                      onChangePage={(e, nextPage) => {
                        props.onChangePage(a, nextPage)
                        // setActivePage(nextPage)
                        activePageActivity = nextPage
                      }}
                    />,

                    FilterRow: props =>
                      <CustomFItlerRow {{
                        ...props,
                        onFilterDateRange: (position, date, colId) => {
                          activitySearch.timeRanges[colId][position] = date
                          const timeRangesClone = [...timeRanges]
                          timeRangesClone[colId][position] = date
                          setTimeRanges(timeRangesClone)
                          // props.onFilterChanged(colId, date, position)
                          tableActivtyRef.current.onQueryChange()
                        },
                        timeRanges: timeRanges
                      }}
                      />

                  }
                }
                columns={[
                  { title: 'Work', field: 'work', filtering: false, headerStyle: { minWidth: '350px' }, },
                  {
                    title: 'Target', field: 'target'
                  },
                  {
                    title: 'Campaign', field: 'campaign'
                  },
                  {
                    title: 'Phase', field: 'phase',
                    lookup: {
                      'Ticket': 'Ticket',
                      'Follow-up': 'Follow-up',
                    }
                  },
                  {
                    title: 'Priority', field: 'priority'
                    ,
                    render: rowData => {
                      if (rowData.priority == 'Low') {
                        return <div className="text-success">Low</div>
                      }

                      else if (rowData.priority == 'Medium') {
                        return <div className="text-warning">Medium</div>
                      }

                      return <div className="text-danger">High</div>
                    },
                    lookup: {
                      0: 'Low',
                      1: 'Medium',
                      2: 'High',
                    }
                  },
                  {
                    title: 'Start', field: 'start',
                    render: (row) => {
                      return dateFns.format(dateFns.parseISO(row.start), 'HH:mm MM-dd-yyyy')

                    },
                    type: 'dateRange'

                  },
                  {
                    title: 'Remaining', field: 'remaining', type: 'numeric'
                  },
                ]}
                data={(query) => {

                  return new Promise((resolve, reject) => {
                    let searchString = `${activitySearch.priority ? '&priority=' + activitySearch.priority : ''}`
                    searchString += `${activitySearch.remaining ? '&remaining=' + activitySearch.remaining : ''}`
                    searchString += `${activitySearch.target ? '&target=' + activitySearch.target : ''}`
                    searchString += `${activitySearch.campaign ? '&campaign=' + activitySearch.campaign : ''}`
                    searchString += `${activitySearch.phase ? '&phase=' + activitySearch.phase : ''}`
                    searchString += `${activitySearch.phaseId ? '&phaseId=' + activitySearch.phaseId : ''}`
                    searchString += `${activitySearch.timeRanges[5].from ? '&start_from=' + activitySearch.timeRanges[5].from : ''}`
                    searchString += `${activitySearch.timeRanges[5].to ? '&start_to=' + activitySearch.timeRanges[5].to : ''}`
                    searchString += `${activityOrder[6] ? '&remainingOrder=' + activityOrder[6] : ''}`
                    searchString += `${activityOrder[5] ? '&startOrder=' + activityOrder[5] : ''}`
                    searchString += `${activityOrder[4] ? '&priorityOrder=' + activityOrder[4] : ''}`
                    searchString += `${activityOrder[1] ? '&targetOrder=' + activityOrder[1] : ''}`
                    searchString += `${activityOrder[2] ? '&campaignOrder=' + activityOrder[2] : ''}`
                    searchString += `${activityOrder[3] ? '&phaseOrder=' + activityOrder[3] : ''}`
                    searchString += `${query.search == '' ? '&view_type=' + viewType : ''}`


                    apiGet(EVENTS_URL + `?list_type=upcoming&page=${activePageActivity}&limit=${query.pageSize}` + searchString + query.search, true).then(res => {
                      const data = res.data.data.reduce((acc, d, index) => {
                        const priority = ['Low', 'Medium', 'High']
                        let phase = ''
                        let phaseId = ''
                        if (d.order && d.order.status == 'COMPLETED') {
                          phase = 'Order'
                          phaseId = `O` + d.order.id
                        }
                        else if (d.order) {
                          phase = 'Follow-up'
                          phaseId = `F` + d.order.id
                        }
                        else {
                          phase = 'Ticket'
                          phaseId = `T` + d.marketing.id
                        }
                        console.log(phase)
                        acc.push(...d.contacts.map(c => {
                          return {
                            work: d.name,
                            target: c.first_name + ' ' + c.last_name,
                            campaign: d.marketing ? d.marketing.campaign.name : d.order.campaign.name,
                            phase,
                            priority: priority[d.priority],
                            remaining: d.remaining + ' day(s)',
                            id: d.id,
                            marketing: d.marketing,
                            start: d.start_date,
                            phaseId,
                            order: d.order,
                            campaign2: d.marketing ? d.marketing.campaign : d.order.campaign,

                          }
                        }))
                        return acc
                      }, [])

                      resolve({
                        data,
                        page: res.data.page,
                        totalCount: res.data.total
                      })
                    })
                  })
                }}
                onRowClick={(e, rowData) => {
                  if (rowData.phase == 'Ticket') {
                    getMoreRow(rowData.marketing.id)
                    setOpenDialog('marketing')
                  }
                  else if (rowData.phase == 'Follow-up') {
                    console.log(rowData)
                    getMoreRow2(rowData.order.id)
                    setOpenDialog('followUp')

                  }
                }}
                title="Contacts List"
                options={{
                  search: false,
                  filtering: true,
                  paging: true,
                  debounceInterval: 300,

                }}
              />
            </Collapse>
          }
          {viewType == 'personal' &&
            <Collapse collapsedHeight="100px" in={expanded['upcoming2']}>
              <MaterialTable
                tableRef={tableActivtyRef}
                components={
                  {
                    Header: props => <MTableHeader {...props}
                      onOrderChange={(orderBy, dir) => {
                        activityOrder.forEach((order, index) => {
                          if (orderBy != index) {
                            activityOrder[index] = null
                          }
                        })
                        activityOrder[orderBy] = dir

                        props.onOrderChange(orderBy, dir)
                      }}
                    />,
                    Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                      if (columnId == 2) {
                        // activitySearch.priority = value
                        activitySearch.priority = value
                      }
                      else if (columnId == 3) {
                        // activitySearch.remaining = value
                        activitySearch.remaining = value
                      }
                      activePageActivity = 0
                      props.onFilterChanged(columnId, value);
                    }}
                    />,
                    Toolbar: props =>
                      <>
                        <Card plain>
                          <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Upcoming Activities</h4>
                          </CardHeader>
                        </Card>
                        <div className='px-4 d-flex justify-content-between'>
                          <Typography classes={{ root: classes.activityTagline }} component='span'>
                            Events which start today will be displayed in this table
                </Typography>
                          <span>
                            <Select
                              value={viewType}
                              onChange={
                                (e) => {
                                  tableActivtyRef.current.onQueryChange({ search: `&view_type=${e.target.value}` })
                                  activitySearch.viewType = e.target.value
                                  setViewType(e.target.value)
                                }
                              }
                            >
                              <MenuItem value='campaign'>Campaign</MenuItem>
                              <MenuItem value='personal'>Personal</MenuItem>
                            </Select>
                            <Tooltip title="Create new activity">
                              <IconButton onClick={() => {
                                setCreateEventDialog(true)
                              }}>
                                <AddIcon></AddIcon>
                              </IconButton>
                            </Tooltip>
                          </span>
                        </div>
                      </>
                    ,

                    Pagination: props => <TablePagination {...props}
                      page={activePageActivity} rowsPerPageOptions={[5, 10, 20]}
                      count={props.count}
                      onChangePage={(e, nextPage) => {
                        props.onChangePage(a, nextPage)
                        // setActivePage(nextPage)
                        activePageActivity = nextPage
                      }}
                    />
                  }
                }
                columns={[
                  { title: 'Work', field: 'work', filtering: false, headerStyle: { minWidth: '350px' }, },
                  {
                    title: 'Target', field: 'target'
                  },
                  {
                    title: 'Priority', field: 'priority'
                    ,
                    render: rowData => {
                      if (rowData.priority == 'Low') {
                        return <div className="text-success">Low</div>
                      }

                      else if (rowData.priority == 'Medium') {
                        return <div className="text-warning">Medium</div>
                      }

                      return <div className="text-danger">High</div>
                    },
                    lookup: {
                      0: 'Low',
                      1: 'Medium',
                      2: 'High',
                    }
                  },
                  {
                    title: 'Remaining', field: 'remaining', type: 'numeric'
                  },
                ]}
                data={(query) => {

                  return new Promise((resolve, reject) => {
                    let searchString = `${activitySearch.priority ? '&priority=' + activitySearch.priority : ''}`
                    searchString += `${activitySearch.remaining ? '&remaining=' + activitySearch.remaining : ''}`
                    searchString += `${activitySearch.target ? '&target=' + activitySearch.target : ''}`
                    searchString += `${activityOrder[1] ? '&targetOrder=' + activityOrder[1] : ''}`
                    searchString += `${activityOrder[3] ? '&remainingOrder=' + activityOrder[3] : ''}`
                    searchString += `${activityOrder[2] ? '&priorityOrder=' + activityOrder[2] : ''}`
                    searchString += `${query.search == '' ? '&view_type=' + viewType : ''}`

                    apiGet(EVENTS_URL + `?list_type=upcoming&page=${activePageActivity}&limit=${query.pageSize}` + searchString + query.search, true).then(res => {
                      const data = res.data.data.reduce((acc, d, index) => {
                        const priority = ['Low', 'Medium', 'High']
                        acc.push({
                          work: d.name,
                          target: 'Me',
                          priority: priority[d.priority],
                          remaining: d.remaining + ' day(s)',
                          id: d.id,
                        })
                        return acc
                      }, [])

                      resolve({
                        data,
                        page: res.data.page,
                        totalCount: res.data.total
                      })
                    })
                  })
                }
                }
                onRowClick={(e, rowData) => {
                }}

                title="Contacts List"
                options={{
                  search: false,
                  filtering: true,
                  paging: true,
                  debounceInterval: 300,

                }}
              />
            </Collapse>
          }
        </div>
      }
    </USERCONTEXT.Consumer>
  )

}

export default withStyles(styles)(ActivitiesTable)