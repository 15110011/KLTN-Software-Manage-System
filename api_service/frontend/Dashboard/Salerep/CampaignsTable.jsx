import * as React from 'react'
import { withStyles, Button, IconButton } from '@material-ui/core';
import MaterialTable, { MTableBodyRow, MTableFilterRow } from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'
import MoreVert from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'
import * as dateFns from 'date-fns'
import * as cn from 'classnames'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './SalerepStyles.js'
import { CAMPAIGNS_URL, CONTACT_MARKETING_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomFItlerRow from '../../components/CustomFilterRow'

import CampaignDetail from './CampaignDetail'
import { apiGet, apiPost, apiPatch, apiDelete } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'

import USERCONTEXT from '../../components/UserContext'

const search = { timeRanges: [null, null, null, { from: null, to: null }, { from: null, to: null }] }
let activePageCampaign = 0

function CampaignTable(props) {

  const { 
    classes, 
    forceActivities, 
    history, 
    tableRef,
    expanded,
    handleExpandClick
  } = props

  const [deletingRow, setDeletingRow] = React.useState({})
  const [campaignRow, setMovingRow] = React.useState({})
  const [moreRow, setMoreRow] = React.useState({})

  const [moreDialog, setMoreDialog] = React.useState(false)

  const [timeRanges, setTimeRanges] = React.useState([null, null, null, { from: null, to: null }, { from: null, to: null }])
  const [notiSuccess, setNotiSuccess] = React.useState(false)



  //Campaign
  let order = []


  const onNotiSuccess = (msg) => {
    setNotiSuccess(msg)
    setTimeout(() => {
      setNotiSuccess(false)
    }, 2000);
  }


  const onRemoveCampaign = () => {
    apiDelete(CAMPAIGNS_URL + '/' + deletingRow.id, { status: 'FAILED' }, true).then(res => {
      setDeletingRow({})
      forceActivities()
      tableRef.current.onQueryChange()
      setMoreDialog(false)
      onNotiSuccess('Successfully Removed')
    })
  }

  const onForceStart = () => {
    apiPatch(CAMPAIGNS_URL + '/' + campaignRow.id,
      { start_date: dateFns.format(new Date(), 'yyyy-MM-dd') }, false, true).then(res => {
        tableRef.current.onQueryChange()
        setMovingRow(false)
        forceActivities()
        setMoreDialog(false)
        onNotiSuccess('Successfully Started')
      })
  }

  // const getMoreRow = id => {
  //   apiGet(CAMPAIGNS_URL + '/' + id, true).then(res => {
  //     const c = res.data
  //     let status = 'Idle'
  //     if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
  //       && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
  //       status = 'Active'
  //     }
  //     else if (dateFns.isAfter(c.end_date, dateFns.parseISO(new Date().toISOString()))) {
  //       status = 'Finished'
  //     }
  //     setMoreRow({
  //       '#': (activePageCampaign * query.pageSize + index + 1),
  //       name: c.name,
  //       product: c.product ? c.product.name : <i>Undefined</i>,
  //       start: c.start_date,
  //       end: c.end_date,
  //       id: c.id,
  //       status
  //     })
  //   })
  // }

  return (
    <USERCONTEXT.Consumer>
      {({ user }) =>
        <div style={{ position: 'relative' }}>
          {
            notiSuccess &&
            <CustomSnackbar success msg={notiSuccess} />
          }
          {moreDialog &&
            <Dialog
              open={true}
              onClose={() => setMoreDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>
                  Manage Campaign
                </h4>
              </DialogTitle>
              <DialogContent>
                <CampaignDetail
                  moreRow={moreRow}
                  setDeletingRow={setDeletingRow}
                  setMovingRow={setMovingRow}
                  onNotiSuccess={onNotiSuccess}
                  userId={user.id}
                // getMoreRow={getMoreRow}
                />
              </DialogContent>
            </Dialog>
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
                <div>This campaign<b> ({deletingRow.name})</b> will be removed.
                  This action cannot be undone. Are you sure?</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setDeletingRow({}) }}>Cancel</Button>
              <Button color='primary' onClick={() => { onRemoveCampaign() }}>Remove</Button>
            </DialogActions>
          </Dialog>
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded['campaign'],
            })}
            onClick={() => handleExpandClick('campaign')}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse collapsedHeight="100px" in={expanded['campaign']}>
            <MaterialTable
              tableRef={tableRef}
              components={
                {
                  Toolbar: props =>
                    <Card plain>
                      <CardHeader color="danger">
                        <h4 onClick={() => history.push('/dashboard/campaign-detail')} style={{ cursor: 'pointer' }} className={classes.cardTitleWhite}>Campaigns</h4>
                      </CardHeader>
                    </Card>,
                  Header: props => <MTableHeader {...props}
                    onOrderChange={(orderBy, dir) => {
                      order.forEach((orderType, index) => {
                        if (orderBy != index) {
                          order[index] = null
                        }
                      })
                      order[orderBy] = dir

                      props.onOrderChange(orderBy, dir)
                    }}
                  />,
                  Pagination: props => <TablePagination {...props}
                    page={activePageCampaign} rowsPerPageOptions={[5, 10, 20]}
                    count={props.count}
                    onChangePage={(e, nextPage) => {
                      props.onChangePage(a, nextPage)
                      // setActivePage(nextPage)
                      activePageCampaign = nextPage
                    }}
                  />,
                  Body: props => <MTableBody {...props} onFilterChanged={(columnId, value, position) => {
                    if (columnId == 1) {
                      search.name = value
                    }
                    else if (columnId == 2) {
                      search.productName = value
                    }
                    else if (columnId == 3) {
                      search.timeRanges[columnId][position] = value
                      return
                    }
                    else if (columnId == 4) {
                      search.timeRanges[columnId][position] = value

                      return
                    }
                    else if (columnId == 5) {
                      search.status = value
                    }
                    activePageCampaign = 0
                    props.onFilterChanged(columnId, value);
                  }}
                  />,
                  Row: props => {
                    return <MTableBodyRow {...props}></MTableBodyRow>
                  },
                  Action: props => {
                    if (props.action.icon == 'more_vert') {

                      return (
                        <Tooltip title={props.action.tooltip}>
                          <IconButton
                            onClick={(event) => props.action.onClick(event, props.data)}
                          >
                            <MoreVert></MoreVert>
                          </IconButton>
                        </Tooltip>
                      )
                    }
                    if (props.action.icon == 'play_circle_filled' && props.data.status == 'Idle' && props.data.manager == user.id) {
                      return (
                        <Tooltip title={props.action.tooltip}>
                          <IconButton
                            onClick={(event) => props.action.onClick(event, props.data)}
                          >
                            <PlayIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }
                    if (props.action.icon == 'delete' && props.data.status == 'Idle' && props.data.manager == user.id) {
                      return (
                        <Tooltip title={props.action.tooltip}>
                          <IconButton
                            onClick={(event) => props.action.onClick(event, props.data)}
                          >
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                        </Tooltip>)
                    }
                    return null
                  },
                  FilterRow: props =>
                    <CustomFItlerRow {{
                      ...props,
                      onFilterDateRange: (position, date, colId) => {
                        search.timeRanges[colId][position] = date
                        const timeRangesClone = [...timeRanges]
                        timeRangesClone[colId][position] = date
                        setTimeRanges(timeRangesClone)
                        // props.onFilterChanged(colId, date, position)
                        tableRef.current.onQueryChange()
                      },
                      timeRanges: timeRanges

                    }} />
                }
              }
              columns={[
                { title: '#', field: '#', filtering: false, headerStyle: { maxWidth: '0px' } },
                {
                  title: 'Name', field: 'name', headerStyle: { minWidth: '200px' },
                  customSort: (a, b) => a.name.toString().toLowerCase() < b.name.toString().toLowerCase()
                },
                {
                  title: 'Product', field: 'product',
                  render: (rowData) => {
                    if (!rowData.product) return <i>Undefined</i>
                    return rowData.product
                  },
                  customSort: (a, b) => {

                    if (!a.product) return 1
                    if (!b.product) return -1
                    return a.product.toString().toLowerCase() < b.product.toString().toLowerCase() ? -1 : 1

                  }
                },
                {
                  title: 'Start', field: 'start', type: 'dateRange',
                  customSort: (a, b) => {
                    if (dateFns.isBefore(dateFns.parseISO(a.start), dateFns.parseISO(b.start))) return -1
                    return 1

                  },
                  render: row => {
                    return dateFns.format(dateFns.parseISO(row.start), 'dd-MM-yyyy')
                  }
                },
                {
                  title: 'End', field: 'end', type: 'dateRange',
                  customSort: (a, b) => {
                    if (dateFns.isBefore(dateFns.parseISO(a.end), dateFns.parseISO(b.end))) return -1
                    return 1
                  },
                  render: row => dateFns.format(dateFns.parseISO(row.end), 'dd-MM-yyyy')
                },
                {
                  title: 'Status', field: 'status',
                  customSort: (a, b) => {
                    if (a.status == 'Idle' || b.status == 'Finished') return -1
                    if (b.status == 'Idle' || a.status == 'Finished') return 1
                    return 0
                  },

                  render: (data) => {
                    if (data.status == 'Active') {
                      return <div className="text-success">Active</div>
                    }

                    else if (data.status == 'Idle') {
                      return <div className="text-warning">Idle</div>
                    }

                    return <div className="text-danger">Finished</div>
                  },
                  lookup: {
                    'Idle': 'Idle',
                    'Active': 'Active',
                    'Finished': 'Finished'
                  }
                }
              ]}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let searchString = `${search.name ? '&campaign_name=' + search.name : ''}`
                  searchString += `${search.productName ? '&product_name=' + search.productName : ''}`
                  searchString += `${search.timeRanges[3].from ? '&start_from=' + search.timeRanges[3].from : ''}`
                  searchString += `${search.timeRanges[3].to ? '&start_to=' + search.timeRanges[3].to : ''}`
                  searchString += `${search.timeRanges[4].from ? '&end_from=' + search.timeRanges[4].from : ''}`
                  searchString += `${search.timeRanges[4].to ? '&end_to=' + search.timeRanges[4].to : ''}`
                  searchString += `${search.status ? '&status=' + search.status : ''}`
                  searchString += `${order[1] ? '&name_order=' + order[1] : ''}`
                  searchString += `${order[2] ? '&product_order=' + order[2] : ''}`
                  searchString += `${order[3] ? '&start_order=' + order[3] : ''}`
                  searchString += `${order[4] ? '&end_order=' + order[4] : ''}`
                  searchString += `${order[5] ? '&status_order=' + order[5] : ''}`
                  apiGet(CAMPAIGNS_URL + `?type=both&page=${activePageCampaign}&limit=${query.pageSize}` + searchString, true).then(res => {
                    const data = res.data.data.map((c, index) => {
                      let status = 'Idle'
                      let currentDate = dateFns.parseISO(new Date().toISOString())
                      currentDate = dateFns.setHours(currentDate, 0)
                      currentDate = dateFns.setMinutes(currentDate, 0)
                      currentDate = dateFns.setSeconds(currentDate, 0)
                      if (
                        (!dateFns.isAfter(dateFns.parseISO(c.start_date), currentDate)
                          && !dateFns.isBefore(dateFns.parseISO(c.end_date), currentDate)
                        )
                        || dateFns.isSameDay(dateFns.parseISO(c.end_date), currentDate)
                      ) {
                        status = 'Active'
                      }
                      else if (dateFns.isBefore(dateFns.parseISO(c.end_date), currentDate)) {
                        status = 'Finished'
                      }
                      return {
                        '#': (activePageCampaign * query.pageSize + index + 1),
                        name: c.name,
                        product: c.product ? c.product.name : null,
                        start: c.start_date,
                        end: c.end_date,
                        id: c.id,
                        packages: c.packages,
                        follow_up_plan: c.follow_up_plan,
                        marketing_plan: c.marketing_plan,
                        status,
                        manager: c.manager.id,
                        allContacts: c.contacts

                      }
                    })
                    resolve({
                      data,
                      page: res.data.page,
                      totalCount: res.data.total
                    })
                  })
                })
              }
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Delete campaign',
                  onClick: (event, row) => {
                    setDeletingRow(row)
                    // forceActivities()
                  },
                },
                {
                  icon: 'play_circle_filled',
                  tooltip: 'Start campaign',
                  onClick: (event, row) => {
                    setMovingRow(row)
                  },
                },
                {
                  icon: 'more_vert',
                  tooltip: 'More actions',
                  onClick: (event, row) => {
                    setMoreRow(row)
                    setMoreDialog(true)
                  },
                },
              ]}
              options={{
                search: false,
                filtering: true,
                paging: true,
                actionsColumnIndex: -1,
                debounceInterval: 300,
                sorting: true
              }}
            />
          </Collapse>
        </div>
      }
    </USERCONTEXT.Consumer>
  )
}

export default withStyles(styles)(CampaignTable)