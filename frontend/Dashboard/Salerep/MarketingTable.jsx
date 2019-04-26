import * as React from 'react'
import { withStyles, Button } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'


import styles from './SalerepStyles.js'
import { EVENTS_URL, CONTACT_MARKETING_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import MoreDialog from './MoreDialog'
import { apiGet, apiPost, apiPatch } from '../../common/Request'

import USERCONTEXT from '../../components/UserContext'

function MarketingTable(props) {

  const { classes, tableMarketingRef, forceActivities, forceMarketing, history } = props

  const [deletingRow, setDeletingRow] = React.useState({})
  const [movingRow, setMovingRow] = React.useState({})
  const [moreRow, setMoreRow] = React.useState({})

  const [laterDialog, setLaterDialog] = React.useState(false)
  const [moreDialog, setMoreDialog] = React.useState(false)


  //Marketing
  const marketingSearch = {}
  let activePageMarketing = 0


  const onRemoveContact = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + deletingRow.id, { status: 'FAILED' }, false, true).then(res => {
      forceMarketing()
      forceActivities()
      setDeletingRow({})
    })
  }

  const onMoveToFollowUp = () => {
    apiPatch(CONTACT_MARKETING_URL + '/' + movingRow.id,
      { status: 'COMPLETED' }, false, true).then(res => {
        forceMarketing()
        forceActivities()
        setMovingRow({})
      })
  }

  return (
    <USERCONTEXT.Consumer>
      {({ user }) =>
        <>
          {moreDialog && <MoreDialog setDialog={stt => { setMoreDialog(stt) }}
            histories={moreRow.histories}
            allHistories={moreRow.histories}
            campaign={moreRow.campaign} contact={moreRow.contact}
            id={moreRow.id}
            contact={moreRow.contact}
            updateTable={tableMarketingRef.current.onQueryChange}
            updateActivities={forceActivities}
            marketing={moreRow.marketing}
            user={user}
            setMovingRow={setMovingRow}
            setDeletingRow={setDeletingRow}
          />}
          <Dialog open={Object.keys(movingRow).length != 0}
            onClose={() => { setMovingRow({}) }
            }
          >
            <DialogTitle>
              MOVE CONTACT {movingRow.full_name} TO FOLLOW-UP
        </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div>
                  This action cannot be undone
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
              REMOVE CONTACT {deletingRow.full_name} OUT OF CAMPAIGN {deletingRow.campaignName}
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
          <MaterialTable
            tableRef={tableMarketingRef}
            components={
              {
                Toolbar: props =>
                  <Card plain>
                    <CardHeader color="primary">
                      <h4 onClick={()=> history.push('/dashboard/ticket-detail')} className={classes.cardTitleWhite}>Tickets</h4>
                    </CardHeader>
                  </Card>,
                Pagination: props => <TablePagination {...props}
                  page={activePageMarketing} rowsPerPageOptions={[5, 10, 20]}
                  count={props.count}
                  onChangePage={(e, nextPage) => {
                    props.onChangePage(a, nextPage)
                    // setActivePage(nextPage)
                    activePageMarketing = nextPage
                  }}
                />
              }
            }
            columns={[
              { title: '#', field: '#', filtering: false, headerStyle: { maxWidth: '0px' } },
              { title: 'Full name', field: 'full_name', filtering: false, headerStyle: { minWidth: '200px' } },
              { title: 'Phone', field: 'phone' },
              { title: 'Email', field: 'mail' },
              {
                title: 'Campaign', field: 'campaignName'
              },
            ]}
            data={(query) =>
              new Promise((resolve, reject) => {
                // let searchString = `${activitySearch.priority ? '&priority=' + activitySearch.priority : ''}`
                // searchString += `${activitySearch.remaining ? '&remaining=' + activitySearch.remaining : ''}`
                apiGet(CONTACT_MARKETING_URL + `?page=${activePageMarketing}&limit=${query.pageSize}`, true).then(res => {
                  const data = []
                  res.data.data.forEach((c, index) => {
                    data.push({
                      '#': (activePageMarketing * query.pageSize + index + 1),
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
              filtering: false,
              paging: true,
              actionsColumnIndex: -1,
              debounceInterval: 300,
              sorting: false
            }}
          />
        </>
      }
    </USERCONTEXT.Consumer>
  )


}

export default withStyles(styles)(MarketingTable)