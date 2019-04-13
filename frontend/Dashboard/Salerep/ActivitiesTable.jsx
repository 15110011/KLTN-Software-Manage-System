import * as React from 'react'
import { withStyles } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'


import styles from './SalerepStyles.js'
import { EVENTS_URL } from '../../common/urls';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

import { apiGet, apiPost } from '../../common/Request'

function ActivitiesTable(props) {

  const { classes, tableActivtyRef } = props

  //Activity
  const activitySearch = {}
  let activePageActivity = 0

  return (

    <MaterialTable
      tableRef={tableActivtyRef}
      components={
        {
          Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
            if (columnId == 1) {
              activitySearch.priority = value
            }
            else if (columnId == 2) {
              activitySearch.remaining = value
            }
            console.log(columnId, value)
            activePageActivity = 0
            props.onFilterChanged(columnId, value);
          }} />,
          Toolbar: props =>
            <Card plain>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Activities</h4>
              </CardHeader>
            </Card>,

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
          title: 'Priority', field: 'priority'
          ,
          render: rowData => {
            if (rowData.priority == 'Low') {
              return <p className="text-success">Low</p>
            }

            else if (rowData.priority == 'Medium') {
              return <p className="text-warning">Medium</p>
            }

            return <p className="text-danger">High</p>
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
      data={(query) =>
        new Promise((resolve, reject) => {
          let searchString = `${activitySearch.priority ? '&priority=' + activitySearch.priority : ''}`
          searchString += `${activitySearch.remaining ? '&remaining=' + activitySearch.remaining : ''}`
          apiGet(EVENTS_URL + `?list_type=upcoming&page=${activePageActivity}&limit=${query.pageSize}` + searchString, true).then(res => {
            const data = res.data.data.map((d, index) => {
              const priority = ['Low', 'Medium', 'High']
              return {
                work: d.name,
                priority: priority[d.priority],
                remaining: d.remaining + ' day(s)',
                id: d.id
              }
            }
            )
            resolve({
              data,
              page: res.data.page,
              totalCount: res.data.total
            })
          })
        })
      }

      title="Contacts List"
      // actions={[
      //   {
      //     icon: 'add',
      //     tooltip: 'Create New Contact',
      //     onClick: (event, rows) => {
      //       setCreateContactDialog(true)
      //     },
      //     isFreeAction: true
      //   },
      //   {

      //     icon: 'delete',
      //     tooltip: 'Delete Contacts',
      //     onClick: (event, rows) => {
      //       // setCreateContactDialog(true)
      //       setDeleteContacts(rows.map(r => r.id))
      //       setDeleteContactConfirm(true)
      //     },
      //   },
      //   {
      //     icon: 'swap_horiz',
      //     tooltip: 'Add these contacts to group',
      //     onClick: (event, rows) => {
      //       setSelectingContacts(rows)
      //       setChangeGroupDialog(true)
      //     },

      //   },
      // ]}
      // onRowClick={
      //   (e, rowData) => {
      //     props.history.push('/contacts/' + rowData.id)
      //   }
      // }
      options={{
        search: false,
        filtering: true,
        paging: true,
        debounceInterval: 300,

      }}
    />
  )

}

export default withStyles(styles)(ActivitiesTable)