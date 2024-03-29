import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import useFetchData from '../../CustomHook/useFetchData'
import { PRODUCTS_URL } from "../../common/urls";
import { TablePagination } from '@material-ui/core';
import { apiGet, apiDelete } from '../../common/Request';
import { arrayOf } from 'prop-types';
import CreateProduct from '../CreateProduct/CreateProduct'
import { spawn } from 'child_process';

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

function ProductList(props) {
  const { classes } = props;
  const tableRef = React.useRef(null);
  const [createProductDialog, setCreateProductDialog] = React.useState(false)
  const [createProduct, setCreateProduct] = React.useState({
    name: '',
    desc: '',
    status: 'ACTIVE',
    start_sale_date: '',
    start_support_date: '',
    packages: [
      // {
      //   name: '',
      //   prices:
      //     { '1': '' },
      //   discount: 0,
      //   features: [],
      //   numbers: []
      // }
    ],
    features: []
  })

  const handleCloseCreateProductDialog = e => {
    setCreateProductDialog(false)
  }

  const search = {}
  let activePage = 0
  return (
    <div className={classes.root}>
      <CreateProduct
        handleCloseCreateProductDialog={handleCloseCreateProductDialog}
        createProductDialog={createProductDialog}
        setCreateProductDialog={setCreateProductDialog}
      />
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
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
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'description', filtering: false, render: (row)=>{
                return (
                  <span dangerouslySetInnerHTML={{__html: row.description}}></span>
                )
              }  },
              {
                title: 'Status',
                field: 'status',
                lookup: { 'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE' }
              },
            ]}
            data={(query) =>
              new Promise((resolve, reject) => {
                let searchString = `${search.name ? '&name=' + search.name : ''}`
                if (search.status && search.status.length === 1)
                  searchString += `${search.status ? '&status=' + search.status : ''}`
                apiGet(PRODUCTS_URL + `?page=${activePage}&limit=${query.pageSize}` + searchString, true)
                  .then(json => {
                    const data = json.data.data.map((product, index) => ({
                      numeral: activePage * query.pageSize + index + 1,
                      name: product.name,
                      description: product.desc,
                      status: product.status,
                      id: product.id
                    }))
                    resolve({
                      data,
                      page: json.data.page,
                      totalCount: json.data.total
                    })
                  })
              })
            }
            title="Product List"
            actions={[
              {
                icon: 'delete',
                tooltip: 'Do',
                onClick: (event, rows) => {
                  alert('You selected ' + rows.length + ' rows')
                },
              },
              {
                icon: 'add',
                tooltip: 'Create Product',
                onClick: (event, rows) => {
                  setCreateProductDialog(true)
                  setCreateProduct()
                },
                isFreeAction: true
              }
            ]}
            options={{
              search: false,
              selection: true,
              filtering: true,
              paging: true,
              selection: true
            }}
            onRowClick={(e, rowData) => { props.history.push('/products/' + rowData.id) }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(ProductList);