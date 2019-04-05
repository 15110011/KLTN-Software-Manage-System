import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import { TablePagination } from '@material-ui/core';

// API
import { MARKETING_PLANS_URL } from "../../common/urls";
import { apiGet, apiDelete } from '../../common/Request';


import styles from './MarketingPlanListStyle'

function MarketingPlanList(props) {

  const { classes } = props;
  const tableRef = React.useRef(null);
  const search = {}
  let activePage = 0

  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
            { title: 'Quantity In Used', field: 'used' },
              {
                title: 'Status',
                field: 'status',
              },
            ]}
            components={
              {
                Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                  if (columnId === 1) search.name = value
                  if (columnId === 3) search.status = value
                  props.onFilterChanged(columnId, value)
                }}
                />,
                Pagination: props => <TablePagination {...props}
                  page={activePage} rowsPerPageOptions={[5, 10, 20]}
                  count={props.count}
                  onChangePage={(e, nextPage) => {
                    props.onChangePage(e, nextPage)
                    activePage = nextPage
                  }}
                />
              }
            }
            data={(query) =>
              new Promise((resolve, reject) => {
                let searchString = `${search.name ? '&name=' + search.name : ''}`
                if (search.status && search.status.length === 1)
                  searchString += `${search.status ? '&status=' + search.status : ''}`
                apiGet(MARKETING_PLANS_URL + `?name=${activePage}&limit=${query.pageSize}` + searchString, true)
                  .then(json => {
                    const data = json.data.data.map((m, i) => ({
                      numeral: activePage * query.pageSize + i + 1,
                      name: m.name,
                      used: m.used,
                      status: m.status,
                    }))
                    resolve({
                      data,
                      totalCount: json.data.total
                    })
                  })
              })
            }
            title="Marketing Plan"
            actions={[
              {
                icon: 'done_all',
                tooltip: 'Do',
                onClick: (event, rows) => {
                  alert('You selected ' + rows.length + ' rows')
                },
              },
            ]}
            options={{
              selection: true,
              filtering: true,
              paging: true
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MarketingPlanList);