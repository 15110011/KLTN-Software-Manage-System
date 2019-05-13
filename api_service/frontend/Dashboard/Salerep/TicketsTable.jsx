import * as React from 'react'
import { withStyles, Button } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as cn from 'classnames'
import styles from './SalerepStyles.js'
import { EVENTS_URL, CONTACT_MARKETING_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TicketDetail from './TicketDetail'
import { apiGet, apiPost, apiPatch } from '../../common/Request'
import CustomSnackbar from '../../components/CustomSnackbar'
import USERCONTEXT from '../../components/UserContext'

const search = {}
let activePage = 0
let order = []

function TicketsTable(props) {

  const { 
    classes, 
    tableMarketingRef, 
    forceActivities, 
    forceMarketing, 
    history, 
    forceFollowUp,
    expanded,
    handleExpandClick
   } = props

  const [deletingRow, setDeletingRow] = React.useState({})
  const [movingRow, setMovingRow] = React.useState({})
  const [moreRow, setMoreRow] = React.useState({})
  const [successNoti, setSuccessNoti] = React.useState(false)

  const [laterDialog, setLaterDialog] = React.useState(false)
  const [moreDialog, setMoreDialog] = React.useState(false)


  //Marketing
  const marketingSearch = {}
  let activePage = 0

  const getMoreRow = id => {
    apiGet(CONTACT_MARKETING_URL + '/' + id, true).then(res => {
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
    })
  }

  const onRemoveContact = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      forceMarketing()
      forceActivities()
      setDeletingRow({})
      setMoreDialog(null)
      notification('Successfully Removed')
    })
  }

  const onMoveToFollowUp = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + movingRow.id,
      { status: 'COMPLETED' }, false, true).then(res => {
        forceMarketing()
        forceActivities()
        forceFollowUp()
        setMoreDialog(null)
        notification('Successfully Moved')
        setMovingRow({})
      })
  }

  const notification = (m = 'Successfully Added') => {
    setSuccessNoti(m)
    setTimeout(() => {
      setSuccessNoti(false)
    }, 2000);
  }

  return (
    <USERCONTEXT.Consumer>
      {({ user }) =>
        <div style={{ position: 'relative' }}>
          {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
          {moreDialog &&
            <Dialog
              open={true}
              onClose={() => setMoreDialog(false)}
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
                  campaign={moreRow.campaign}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={tableMarketingRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  user={user}
                  setMovingRow={setMovingRow}
                  setDeletingRow={setDeletingRow}
                  getMoreRow={getMoreRow}
                />
              </DialogContent>
            </Dialog>
          }
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
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded['waitingList'],
            })}
            onClick={() => handleExpandClick('waitingList')}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse collapsedHeight="100px" in={expanded['waitingList']}>
            <MaterialTable
              tableRef={tableMarketingRef}
              components={
                {
                  Toolbar: props =>
                    <Card plain>
                      <CardHeader color="primary">
                        <h4 onClick={() => history.push('/dashboard/ticket-detail')} style={{ cursor: 'pointer' }} className={classes.cardTitleWhite}>Waiting List</h4>
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
                  Body: props => <MTableBody {...props} onFilterChanged={(columnId, value, position) => {
                    if (columnId == 1) {
                      search.full_name = value
                    }
                    else if (columnId == 2) {
                      search.email = value
                    }
                    else if (columnId == 3) {
                      search.phone = value
                    }
                    else if (columnId == 4) {
                      search.campaign = value
                    }
                    activePage = 0
                    props.onFilterChanged(columnId, value);
                  }}
                  />,
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
                { title: '#', field: '#', filtering: false, headerStyle: { maxWidth: '0px' }, sorting: false, filtering: false },
                { title: 'Full name', field: 'full_name', headerStyle: { minWidth: '200px' } },
                { title: 'Email', field: 'mail' },
                { title: 'Phone', field: 'phone', sorting: false },
                {
                  title: 'Campaign', field: 'campaignName'
                },
              ]}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let searchString = `${search.full_name ? '&contact_name=' + search.full_name : ''}`
                  searchString += `${search.email ? '&email=' + search.email : ''}`
                  searchString += `${search.phone ? '&phone=' + search.phone : ''}`
                  searchString += `${search.campaign ? '&campaign=' + search.campaign : ''}`
                  searchString += `${order[1] ? '&contact_name_order=' + order[1] : ''}`
                  searchString += `${order[2] ? '&email_order=' + order[2] : ''}`
                  searchString += `${order[4] ? '&campaign_order=' + order[4] : ''}`
                  apiGet(CONTACT_MARKETING_URL + `?page=${activePage}&limit=${query.pageSize}` + searchString, true).then(res => {
                    const data = []
                    res.data.data.forEach((c, index) => {
                      data.push({
                        '#': (activePage * query.pageSize + index + 1),
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
                  icon: 'remove',
                  tooltip: 'Remove contact out of this campaign',
                  onClick: (event, row) => {
                    setDeletingRow(row)
                    // forceActivities()
                  },
                },
                {
                  icon: 'swap_horiz',
                  tooltip: 'Move to Follow-up',
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
                paging: true,
                filtering: true,
                actionsColumnIndex: -1,
                debounceInterval: 300,
              }}
            />
          </Collapse>
        </div>
      }
    </USERCONTEXT.Consumer>
  )
}

export default withStyles(styles)(TicketsTable)