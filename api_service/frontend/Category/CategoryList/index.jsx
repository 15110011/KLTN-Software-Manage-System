import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TablePagination } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core'

import CreateCategory from '../CreateCategory'
import CreateProductType from '../CreateProductType'

import useFetchData from '../../CustomHook/useFetchData'
import CustomSnackbar from '../../components/CustomSnackbar'
import styles from './CategoryListStyle'
// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL, PRODUCT_TYPES_URL, PRODUCT_CATEGORIES_URL } from "../../common/urls";
import { apiPost, apiGet, apiDelete } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function CategoryList(props) {

  const { classes } = props;

  const [createCategoryDialog, setCreateCategoryDialog] = React.useState(false)
  const [createProductTypeDialog, setCreateProductTypeDialog] = React.useState(false)
  const tableRef = React.useRef(null);
  const [deleteCategory, setDeleteCategory] = React.useState([])
  const [deleteType, setDeleteType] = React.useState([])
  const [completeNotice, setCompleteNotice] = React.useState(false)


  const handleCloseCreateCategoryDialog = e => {
    setCreateCategoryDialog(false)
  }

  const handleCloseCreateProductTypeDialog = e => {
    setCreateProductTypeDialog(false)
  }

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m)
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
  }

  const onDeleteCategory = e => {
    const promises = deleteCategory.map(id => {
      return apiDelete(PRODUCT_CATEGORIES_URL + '/' + id, null, true)
    })
    Promise.all(promises).then(r => {
      notification('Successfully Deleted')
      setDeleteCategory(false)
      forceUpdateCategory()
    })
  }

  const onDeleteType = e => {
    const promises = deleteType.map(id => {
      return apiDelete(PRODUCT_TYPES_URL + '/' + id, null, true)
    })
    Promise.all(promises).then(r => {
      notification('Successfully Deleted')
      setDeleteType(false)
      forceUpdateProductType()
    })
  }

  const [categoryData, setCategoryData, setURLCategory, forceUpdateCategory] = useFetchData(PRODUCT_CATEGORIES_URL, props.history, { data: [], total: 0 })
  const [productTypeData, setProductTypeData, setURLProductType, forceUpdateProductType] = useFetchData(PRODUCT_TYPES_URL, props.history, { data: [], total: 0 })
  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <CreateCategory
        forceUpdateCategory={forceUpdateCategory}
        tableRef={tableRef}
        notification={notification}
        setCreateCategoryDialog={setCreateCategoryDialog}
        createCategoryDialog={createCategoryDialog}
        handleCloseCreateCategoryDialog={handleCloseCreateCategoryDialog}
      />
      <CreateProductType
        forceUpdateProductType={forceUpdateProductType}
        tableRef={tableRef}
        notification={notification}
        setCreateProductTypeDialog={setCreateProductTypeDialog}
        createProductTypeDialog={createProductTypeDialog}
        handleCloseCreateProductTypeDialog={handleCloseCreateProductTypeDialog}
      />
      <Dialog
        open={deleteCategory.length}
        onClose={() => setDeleteCategory([])}
      >
        <DialogTitle>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>This category(s) will be deleted</div>
            <div>This action cannot be undone. Are you sure?</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDeleteCategory([]) }}>Cancel</Button>
          <Button onClick={(e) => { onDeleteCategory(e) }} color='primary' >Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteType.length}
        onClose={() => setDeleteType([])}
      >
        <DialogTitle>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>This product type(s) will be deleted</div>
            <div>This action cannot be undone. Are you sure?</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDeleteType([]) }}>Cancel</Button>
          <Button onClick={(e) => { onDeleteType(e) }} color='primary' >Delete</Button>
        </DialogActions>
      </Dialog>
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
              categoryData.data.map((c, i) => {
                return (
                  {
                    numeral: i + 1,
                    name: c.name,
                    desc: c.description,
                    status: c.status,
                    id: c.id
                  }
                )
              }
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
                },
                {

                  icon: 'delete',
                  tooltip: 'Delete Category',
                  onClick: (event, rows) => {
                    setDeleteCategory(rows.map(r => r.id))
                  },
                },
              ]
            }
            options={{
              toolbar: true,
              paging: true,
              selection: true,
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
              productTypeData.data.map((p, i) => (
                {
                  numeral: i + 1,
                  name: p.name,
                  desc: p.description,
                  status: p.status,
                  id: p.id
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
                },
                {

                  icon: 'delete',
                  tooltip: 'Delete Product Type',
                  onClick: (event, rows) => {
                    setDeleteType(rows.map(r => r.id))
                  },
                },
              ]
            }
            options={{
              toolbar: true,
              paging: true,
              selection: true
            }}
          // onRowClick={(e, rowData) => { props.history.push('/product-types/' + rowData.id) }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CategoryList);