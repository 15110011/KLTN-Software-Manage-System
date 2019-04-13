import * as React from 'react'
import { withStyles, Button } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'


import styles from './SalerepStyles.js'
import { EVENTS_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import { apiGet, apiPost, apiPatch } from '../../common/Request'

function MarketingTable(props) {

  const { classes, tableMarketingRef, forceActivities, forceMarketing } = props

  const [deletingRow, setDeletingRow] = React.useState({})




  //Marketing
  const marketingSearch = {}
  let activePageMarketing = 0


  const onRemoveContact = () => {
    apiPatch(EVENTS_URL + '/' + deletingRow.id, { marketing: { status: 'FAILED' } }, false, true).then(res => {
      forceMarketing()
      forceActivities()
      setDeletingRow({})
    })
  }

  return (
    <>
      <Dialog open={Object.keys(deletingRow).length != 0}
        onClose={() => { setDeletingRow({}) }
        }
      >
        <DialogTitle>
          REMOVE CONTACT {deletingRow.full_name} OUT OF CAMPAIGN {deletingRow.campaign}
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
                  <h4 className={classes.cardTitleWhite}>Contacts in Marketing Plan</h4>
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
            title: 'Campaign', field: 'campaign'
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            // let searchString = `${activitySearch.priority ? '&priority=' + activitySearch.priority : ''}`
            // searchString += `${activitySearch.remaining ? '&remaining=' + activitySearch.remaining : ''}`
            apiGet(EVENTS_URL + `?list_type=marketing&page=${activePageMarketing}&limit=${query.pageSize}`, true).then(res => {
              const data = []
              res.data.data.forEach((d, index) => {
                d.contacts.forEach(c => {
                  data.push({
                    '#': (activePageMarketing * query.pageSize + index + 1),
                    full_name: c.first_name + ' ' + c.last_name,
                    mail: c.mail,
                    phone: c.phone,
                    campaign: d.marketing.marketing_plan.name,
                    id: d.id
                  })
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
            onClick: (event, rows) => {
              console.log('asflkajsf');
            },
          },
          {
            icon: 'more_vert',
            tooltip: 'More actions',
            onClick: (event, rows) => {
              console.log('asflkajsf');
            },
          },
        ]}
        options={{
          search: false,
          filtering: false,
          paging: true,
          actionsColumnIndex: -1,
          debounceInterval: 300
        }}
      />
    </>
  )


}

export default withStyles(styles)(MarketingTable)