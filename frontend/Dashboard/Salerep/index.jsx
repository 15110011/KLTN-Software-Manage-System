import * as React from 'react'

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import styles from './SalerepStyles.js'
import MarketingTable from './MarketingTable'
import ActivitiesTable from './ActivitiesTable'
import { apiGet, apiPost } from '../../common/Request.js';



function SalerepDashboard(props) {

  const { classes } = props


  const tableMarketingRef = React.useRef(null);
  const tableActivtyRef = React.useRef(null);

  const forceMarketing = () => {
    tableMarketingRef.current.onQueryChange()
  }
  const forceActivities = () => {
    tableActivtyRef.current.onQueryChange()
  }


  return (
    <div className={classes.root}>
      <Grid container classes={{ container: classes.fixTable }}>
        <Grid item xs={12}>
          <ActivitiesTable tableActivtyRef={tableActivtyRef}
            tableMarketingRef={tableMarketingRef}
            forceActivities={forceActivities}
          />
        </Grid>
        <Grid item xs={12}>
          <MarketingTable forceActivities={forceActivities}
            forceMarketing={forceMarketing}
            tableMarketingRef={tableMarketingRef}
          />
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(SalerepDashboard)
