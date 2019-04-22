import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import { TablePagination } from '@material-ui/core';

import CreateCategory from '../CreateCategory'
import CreateProductType from '../CreateProductType'

import useFetchData from '../../CustomHook/useFetchData'

import styles from './CategoryListStyle'
// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL, PRODUCT_TYPES_URL, PRODUCT_CATEGORIES_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function CategoryList(props) {

  const { classes } = props;

  const [createCategoryDialog, setCreateCategoryDialog] = React.useState(false)
  const [createProductTypeDialog, setCreateProductTypeDialog] = React.useState(false)
  const tableRef = React.useRef(null);


  const handleCloseCreateCategoryDialog = e => {
    setCreateCategoryDialog(false)
  }

  const handleCloseCreateProductTypeDialog = e => {
    setCreateProductTypeDialog(false)
  }

  const [categoryData, setCategoryData, setURLCategory, forceUpdateCategory] = useFetchData(PRODUCT_CATEGORIES_URL, props.history, {})
  const [productTypeData, setProductTypeData, setURLProductType, forceUpdateProductType] = useFetchData(PRODUCT_TYPES_URL, props.history, {})

  return (
    <div className={classes.root}>
      <CreateCategory
        forceUpdateCategory={forceUpdateCategory}
        tableRef={tableRef}
        setCreateCategoryDialog={setCreateCategoryDialog}
        createCategoryDialog={createCategoryDialog}
        handleCloseCreateCategoryDialog={handleCloseCreateCategoryDialog}
      />
      <CreateProductType
        forceUpdateProductType={forceUpdateProductType}
        tableRef={tableRef}
        setCreateProductTypeDialog={setCreateProductTypeDialog}
        createProductTypeDialog={createProductTypeDialog}
        handleCloseCreateProductTypeDialog={handleCloseCreateProductTypeDialog}
      />
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12} className="mt-5">
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral' },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'desc' },
              { title: 'Status', field: 'status' },
            ]}
            data={
              Object.values(categoryData).map((c, i) => (
                {
                  numeral: i + 1,
                  name: c.name,
                  desc: c.description,
                  status: c.status
                }
              )
              )
            }
            title="Category"
            actions={
              [
                {
                  icon: 'add',
                  tooltip: 'Create Category',
                  onClick: (event, rows) => {
                    setCreateCategoryDialog(true)
                    // setCreateProduct()
                  },
                  isFreeAction: true
                }
              ]
            }
            options={{
              toolbar: true,
              paging: true,
            }}
          />
        </Grid>
        <Grid item xs={12} className="mt-5">
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral' },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'desc' },
              { title: 'Status', field: 'status' },
            ]}
            data={
              Object.values(productTypeData).map((p, i) => (
                {
                  numeral: i + 1,
                  name: p.name,
                  desc: p.description,
                  status: p.status
                }
              )
              )
            }
            title="Product Type"
            actions={
              [
                {
                  icon: 'add',
                  tooltip: 'Create Product Type',
                  onClick: (event, rows) => {
                    setCreateProductTypeDialog(true)
                    // setCreateProduct()
                  },
                  isFreeAction: true
                }
              ]
            }
            options={{
              toolbar: true,
              paging: true,
            }}
            // onRowClick={(e, rowData) => { props.history.push('/product-types/' + rowData.id) }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CategoryList);