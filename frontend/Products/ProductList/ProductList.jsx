import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useFetchData from '../../CustomHook/useFetchData'
import { PRODUCTS_URL } from "../../common/urls";

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
  const [products, setProducts, setURL, forceUpdate] = useFetchData(PRODUCTS_URL, props.history, { data: [], total: 0 })
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid classes={{container: classes.fixTable}} container spacing={8}>
        <Grid item xs={12}>
            <MaterialTable
              columns={[
                { title: '#', field: 'numeral', type: 'numeric' },
                { title: 'Name', field: 'name' },
                { title: 'Description', field: 'description' },
                {
                  title: 'Status',
                  field: 'status',
                },
              ]}
              data={products.data.map(
                (product, index) => ({
                  numberal: index + 1,
                  name: product.name,
                  description: product.description,
                  status: product.status
                })
              )}
              title="Product List"
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
                paging: false
              }}
            />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(ProductList);