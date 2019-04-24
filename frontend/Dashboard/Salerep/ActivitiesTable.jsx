import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

import { EVENTS_URL, CONTACT_MARKETING_URL } from '../../common/urls';

import styles from './SalerepStyles.js'
import MoreDialog from './MoreDialog'
import { EVENTS_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import USERCONTEXT from '../../components/UserContext'
import { apiGet, apiPost } from '../../common/Request'

function ActivitiesTable(props) {

  const { classes, tableActivtyRef, tableMarketingRef, forceActivities } = props

  const [viewType, setViewType] = React.useState('campaign')

  const [openDialog, setOpenDialog] = React.useState(false)
  const [moreRow, setMoreRow] = React.useState(null)



  //Activity
  let activitySearch = {
    viewType: 'campaign'
  }


  const activityOrder = []
  let activePageActivity = 0


  return (

    <USERCONTEXT.Consumer>
      {({ user }) =>
        <>

          {openDialog == 'marketing' && moreRow && <MoreDialog setDialog={stt => { setOpenDialog(stt) }}
            histories={moreRow.histories}
            campaign={moreRow.campaign} contact={moreRow.contact}
            id={moreRow.id}
            contact={moreRow.contact}
            updateTable={tableMarketingRef.current.onQueryChange}
            updateActivities={forceActivities}
            marketing={moreRow.marketing}
            user={user}
          />}
          {viewType == 'campaign' && <MaterialTable
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
                  if (columnId == 4) {
                    activitySearch.priority = value
                  }
                  else if (columnId == 5) {
                    activitySearch.remaining = value
                  }
                  else if (columnId == 1) {
                    activitySearch.target = value
                  }
                  else if (columnId == 2) {
                    activitySearch.campaign = value
                  }
                  else if (columnId == 3) {
                    activitySearch.phase = value
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
                          <IconButton>
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
                title: 'Campaign', field: 'campaign'
              },
              {
                title: 'Phase', field: 'phase',
                lookup: {
                  'Ticket': 'Ticket',
                  'Follow-Up': 'Follow-Up',
                  'Order': 'Order',
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
                searchString += `${activityOrder[5] ? '&remainingOrder=' + activityOrder[5] : ''}`
                searchString += `${activityOrder[4] ? '&priorityOrder=' + activityOrder[4] : ''}`
                searchString += `${activityOrder[1] ? '&targetOrder=' + activityOrder[1] : ''}`
                searchString += `${activityOrder[2] ? '&campaignOrder=' + activityOrder[2] : ''}`
                searchString += `${activityOrder[3] ? '&phaseOrder=' + activityOrder[3] : ''}`
                searchString += `${query.search == '' ? '&view_type=' + viewType : ''}`


                apiGet(EVENTS_URL + `?list_type=upcoming&page=${activePageActivity}&limit=${query.pageSize}` + searchString + query.search, true).then(res => {
                  const data = res.data.data.reduce((acc, d, index) => {
                    const priority = ['Low', 'Medium', 'High']
                    let phase = ''
                    if (d.order && d.order.status == 'COMPLETED') {
                      phase = 'Order'
                    }
                    else if (d.order) {
                      phase = 'Follow-up'
                    }
                    else {
                      phase = 'Ticket'
                    }
                    console.log(d)
                    console.log(phase)
                    acc.push(...d.contacts.map(c => {
                      return {
                        work: d.name,
                        target: c.first_name + ' ' + c.last_name,
                        campaign: d.marketing.campaign.name,
                        phase,
                        priority: priority[d.priority],
                        remaining: d.remaining + ' day(s)',
                        id: d.id,
                        marketing: d.marketing
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

                apiGet(CONTACT_MARKETING_URL + '/' + rowData.marketing.id, true).then(res => {
                  const c = res.data
                  setMoreRow({
                    full_name: c.contact.full_name,
                    mail: c.contact.mail,
                    phone: c.contact.phone,
                    campaignName: c.campaign.name,
                    id: c.id,
                    contact: c.contact,
                    campaign: c.campaign,
                    histories: c.histories,
                    marketing: c
                  })
                  setOpenDialog('marketing')
                })
              }
            }}
            title="Contacts List"
            options={{
              search: false,
              filtering: true,
              paging: true,
              debounceInterval: 300,

            }}
          />}

          {viewType == 'personal' && <MaterialTable
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
                          <IconButton>
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
                    acc.push(...d.contacts.map(c => {
                      return {
                        work: d.name,
                        target: c.first_name + ' ' + c.last_name,
                        priority: priority[d.priority],
                        remaining: d.remaining + ' day(s)',
                        id: d.id,
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
            }
            }
            onRowClick={(e, rowData) => {
              console.log(rowData)
            }}

            title="Contacts List"
            options={{
              search: false,
              filtering: true,
              paging: true,
              debounceInterval: 300,

            }}
          />
          }
        </>
      }
    </USERCONTEXT.Consumer>
  )

}

export default withStyles(styles)(ActivitiesTable)