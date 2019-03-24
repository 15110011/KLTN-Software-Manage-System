import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function ProductList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
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
              data={[
                { numeral: '1', name: 'Mehmet', description: 'Baran' },
                { numeral: '2', name: 'Zerya Betül', description: 'Baran' },
              ]}
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(ProductList);