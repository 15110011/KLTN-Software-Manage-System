import * as React from 'react'


import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import ProductCharts from './ProductCharts'


import styles from './ManagerStyles.js'
function ManagerDashboard(props){

  return(
    <div className='p-4'>
      <Grid container>
        <Grid item xs={12}>
          <ProductCharts/>
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(ManagerDashboard)
