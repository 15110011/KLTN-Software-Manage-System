import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import useFetchData from '../../CustomHook/useFetchData'
import { TablePagination } from '@material-ui/core';
import { apiGet, apiDelete } from '../../common/Request';


const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fixTable: {
    maxWidth: '90%',
  }
});

function FollowUpPlanList(props) {
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
              { title: 'Description', field: 'description' },
              {
                title: 'Status',
                field: 'status',
                lookup: {'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE'}
              },
            ]}
            // data={products.data.map(
            //   (product, index) => ({
            //     numeral: index + 1,
            //     name: product.name,
            //     description: product.desc,
            //     status: product.status
            //   })
            // )}
            title="Campaign List"
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

export default withStyles(styles)(FollowUpPlanList);