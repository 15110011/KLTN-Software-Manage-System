import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import { TablePagination } from '@material-ui/core';

import CreateCategory from '../CreateCategory'
import CreateProductType from '../CreateProductType'
import styles from './CategoryListStyle'


function CategoryList(props) {

  const { classes } = props;

  const [createCategoryDialog, setCreateCategoryDialog] = React.useState(false)
  const [createProductTypeDialog, setCreateProductTypeDialog] = React.useState(false)

  const handleCloseCreateCategoryDialog = e => {
    setCreateCategoryDialog(false)
  }

  const handleCloseCreateProductTypeDialog = e => {
    setCreateProductTypeDialog(false)
  }
  return (
    <div className={classes.root}>
      <CreateCategory
        createCategoryDialog={createCategoryDialog}
        handleCloseCreateCategoryDialog={handleCloseCreateCategoryDialog}
      />
      <CreateProductType
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
            data={[

            ]}
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
              paging: false,
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
            data={[

            ]}
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
              paging: false,
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CategoryList);