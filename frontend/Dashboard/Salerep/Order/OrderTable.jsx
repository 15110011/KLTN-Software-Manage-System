import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import * as dateFns from 'date-fns'

import { EVENTS_URL, CONTACT_MARKETING_URL, ORDER_URL } from '../../../common/urls';

import styles from '../SalerepStyles.js'
import { EVENTS_URL, GROUP_URL } from '../../../common/urls';
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CreateEventDialog from '../../../Events/CreateEventDialog'
import CardBody from "../../../components/Card/CardBody";
// import CustomFItlerRow from '../../../components/CustomFilterRow'

import USERCONTEXT from '../../../components/UserContext'
import { apiGet, apiPost } from '../../../common/Request'
import useFetchData from '../../../CustomHook/useFetchData'
import { spawn } from 'child_process';
// import TicketDetail from './TicketDetail'

let flSearch = {
}

let activePage = 0

function OrderTable(props) {

  const { classes, forceActivities, tableRef } = props

  // const [viewType, setViewType] = React.useState('campaign')

  // const [createEventDialog, setCreateEventDialog] = React.useState(false)

  const [openDialog, setOpenDialog] = React.useState(false)

  const [moreRow, setMoreRow] = React.useState(null)
  const [deletingRow, setDeletingRow] = React.useState(null)
  const [movingRow, setMovingRow] = React.useState(null)



  const [moreDialog, setMoreDialog] = React.useState(false)

  // const [groups, setGroups, setUrl] = useFetchData(GROUP_URL, null, { data: [], total: 0 })
  // const [timeRanges, setTimeRanges] = React.useState([null, null, null, null, null, { from: null, to: null }])
  //Activity


  const flOrder = []


  return (

    <USERCONTEXT.Consumer>
      {({ user }) =>
        <>
          {openDialog && moreRow &&
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
                {/* <TicketDetail
                  histories={moreRow.histories}
                  allHistories={moreRow.histories}
                  campaign={moreRow.campaign} contact={moreRow.contact}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={tableActivtyRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  user={user}
                  getMoreRow={getMoreRow}
                /> */}
              </DialogContent>
            </Dialog>
          }
          <MaterialTable
            tableRef={tableRef}
            components={
              {
                Header: props => <MTableHeader {...props}
                  onOrderChange={(orderBy, dir) => {
                    flOrder.forEach((order, index) => {
                      if (orderBy != index) {
                        flOrder[index] = null
                      }
                    })
                    flOrder[orderBy] = dir

                    props.onOrderChange(orderBy, dir)
                  }}
                />,
                Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                  console.log(value)
                  if (columnId == 1) {
                    flSearch.fname = value
                  }
                  else if (columnId == 2) {
                    flSearch.email = value
                  }
                  else if (columnId == 3) {
                    flSearch.phone = value
                  }
                  else if (columnId == 4) {
                    flSearch.campaign = value
                  }
                  else if (columnId == 5) {
                    flSearch.noSteps = value
                  }
                  activePage = 0
                  props.onFilterChanged(columnId, value);
                }}
                />,
                Toolbar: props =>
                  <>
                    <Card plain>
                      <CardHeader color="rose">
                        <h4 className={classes.cardTitleWhite}>Orders</h4>
                      </CardHeader>
                    </Card>
                  </>
                ,
                Pagination: props => <TablePagination {...props}
                  page={activePage} rowsPerPageOptions={[5, 10, 20]}
                  count={props.count}
                  onChangePage={(e, nextPage) => {
                    props.onChangePage(a, nextPage)
                    // setActivePage(nextPage)
                    activePage = nextPage
                  }}
                />

              }
            }
            columns={[
              { title: 'Order ID', field: '#', headerStyle: { maxWidth: '0px' }, filtering: false, sorting: false },
              { title: 'Name', field: 'fname' },
              {
                title: 'Email', field: 'email'
              },
              {
                title: 'Phone', field: 'phone', sorting: false
              },
              {
                title: 'Packages', field: 'packages',
              },
              {
                title: 'Licenses Status', field: 'status',
                render: rowData => {
                  console.log(rowData)
                  if (rowData.license[0].status === 'GOOD')
                    return <div className="text-success">All licenses are working fine</div>
                  if (rowData.license[0].status === 'EXPIRING')
                    return <div className="text-warning">Some licenses are expiring soon</div>
                  if (rowData.license[0].status === 'EXPIRED') 
                    return <div className="text-danger">Some licenses are expired</div>
                }
              },
            ]}
            data={(query) => {

              return new Promise((resolve, reject) => {
                let searchString = `${flSearch.fname ? '&contact_name=' + flSearch.fname : ''}`
                searchString += `${flSearch.email ? '&email=' + flSearch.email : ''}`
                searchString += `${flSearch.phone ? '&phone=' + flSearch.phone : ''}`
                searchString += `${flSearch.campaign ? '&campaign=' + flSearch.campaign : ''}`
                searchString += `${flSearch.noSteps ? '&no_steps=' + flSearch.noSteps : ''}`
                searchString += `${flOrder[1] ? '&contact_order=' + flOrder[1] : ''}`
                searchString += `${flOrder[2] ? '&email_order=' + flOrder[2] : ''}`
                searchString += `${flOrder[4] ? '&camapign_order=' + flOrder[4] : ''}`
                searchString += `${flOrder[5] ? '&no_steps_order=' + flOrder[5] : ''}`
                searchString += `${flOrder[6] ? '&progress_order=' + flOrder[6] : ''}`

                apiGet(ORDER_URL + `?status=COMPLETED&page=${activePage}&limit=${query.pageSize}` + searchString + query.search, true).then(res => {
                  const data = res.data.data.map((d, index) => {
                    const license = d.licenses.map((license) => {
                      const licenseTime = dateFns.addMonths(new Date(license.start_date), license.duration)
                      const timeLeft = licenseTime - dateFns.addDays(new Date(), 10)
                      const tenDays = 864000000
                      if (timeLeft < 0) {
                        const time = -timeLeft
                        if (time > tenDays) return { status: 'EXPIRED' }
                        if (time > 0 && time < tenDays) return { status: 'EXPIRING' }
                      }
                      return { status: 'GOOD' }
                    })
                    return {
                      '#': query.pageSize * activePage + index + 1,
                      fname: d.name,
                      phone: d.contacts.phone,
                      email: d.contacts.mail,
                      packages: d.packages.length,
                      license,
                      id: d.id
                    }
                  })

                  resolve({
                    data,
                    page: res.data.page,
                    totalCount: res.data.total
                  })

                })
              })
            }}
            actions={[
              {
                icon: 'remove',
                tooltip: 'Fail this Contact',
                onClick: (event, row) => {
                  setDeletingRow(row)
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
              debounceInterval: 300,
              actionsColumnIndex: -1
            }}
          />
        </>
      }
    </USERCONTEXT.Consumer>
  )

}

export default withStyles(styles)(OrderTable)