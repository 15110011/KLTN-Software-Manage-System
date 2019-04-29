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


import styles from './SalerepStyles.js'
import { CAMPAIGNS_URL, CONTACT_MARKETING_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomFItlerRow from '../../components/CustomFilterRow'

import CampaignDetail from './CampaignDetail'
import { apiGet, apiPost, apiPatch } from '../../common/Request'

import USERCONTEXT from '../../components/UserContext'

const search = { timeRanges: [null, null, null, { from: null, to: null }, { from: null, to: null }] }

function CampaignTable(props) {

  const { classes, forceActivities, history, tableRef } = props

  const [deletingRow, setDeletingRow] = React.useState({})
  const [campaignRow, setMovingRow] = React.useState({})
  const [moreRow, setMoreRow] = React.useState({})

  const [moreDialog, setMoreDialog] = React.useState(false)

  const [timeRanges, setTimeRanges] = React.useState([null, null, null, { from: null, to: null }, { from: null, to: null }])


  //Campaign
  let order = []
  let activePageCampaign = 0


  const onRemoveCampaign = () => {
    apiPatch(CAMPAIGNS_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      forceActivities()
      setDeletingRow({})
    })
  }

  const onForceStart = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + campaignRow.id,
      { status: 'COMPLETED' }, false, true).then(res => {
        forceActivities()
        setMovingRow({})
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
        <>
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
                // getMoreRow={getMoreRow}
                />
              </DialogContent>
            </Dialog>
          }
          <Dialog open={Object.keys(campaignRow).length != 0}
            onClose={() => { setMovingRow({}) }
            }
          >
            <DialogTitle>
              Start campaign {campaignRow.name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div>
                  The start date is <i>{campaignRow.start}</i>.
                </div>
                <div>This action cannot be undone</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { setMovingRow({}) }}>Cancel</Button>
              <Button color='primary' onClick={() => { onForceStart() }}>Start now</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={Object.keys(deletingRow).length != 0}
            onClose={() => { setDeletingRow({}) }
            }
          >
            <DialogTitle>
              REMOVE CAMPAIGN {deletingRow.name}
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
              <Button color='primary' onClick={() => { onRemoveCampaign() }}>Remove</Button>
            </DialogActions>
          </Dialog>
          <MaterialTable
            tableRef={tableRef}
            components={
              {
                Toolbar: props =>
                  <Card plain>
                    <CardHeader color="rose">
                      <h4 onClick={() => history.push('/dashboard/campaign-detail')} className={classes.cardTitleWhite}>Campaigns</h4>
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
                    console.log(search)
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
                  if (props.action.icon == 'play_circle_filled' && props.data.status == 'Idle') {
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
                  if (props.action.icon == 'delete' && props.data.status == 'Idle') {
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
              { title: 'Name', field: 'name', headerStyle: { minWidth: '200px' } },
              { title: 'Product', field: 'product' },
              { title: 'Start', field: 'start', type: 'dateRange' },
              {
                title: 'End', field: 'end', type: 'dateRange'
              },
              {
                title: 'Status', field: 'status',
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
                apiGet(CAMPAIGNS_URL + `?page=${activePageCampaign}&limit=${query.pageSize}` + searchString, true).then(res => {
                  const data = res.data.data.map((c, index) => {
                    let status = 'Idle'
                    if (!dateFns.isAfter(dateFns.parseISO(c.start_date), dateFns.parseISO(new Date().toISOString()))
                      && !dateFns.isBefore(dateFns.parseISO(c.end_date), dateFns.parseISO(new Date().toISOString()))) {
                      status = 'Active'
                    }
                    else if (dateFns.isAfter(c.end_date, dateFns.parseISO(new Date().toISOString()))) {
                      status = 'Finished'
                    }
                    return {
                      '#': (activePageCampaign * query.pageSize + index + 1),
                      name: c.name,
                      product: c.product ? c.product.name : <i>Undefined</i>,
                      start: dateFns.format(dateFns.parseISO(c.start_date), 'dd-MM-yyyy'),
                      end: dateFns.format(dateFns.parseISO(c.end_date), 'dd-MM-yyyy'),
                      id: c.id,
                      packages: c.packages,
                      follow_up_plan: c.follow_up_plan,
                      marketing_plan: c.marketing_plan,
                      status
                    }
                  })
                  console.log(data)
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
                tooltip: 'Start Campaign',
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
        </>
      }
    </USERCONTEXT.Consumer>
  )
}

export default withStyles(styles)(CampaignTable)