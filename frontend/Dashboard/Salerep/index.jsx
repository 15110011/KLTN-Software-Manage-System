import * as React from 'react'

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import styles from './SalerepStyles.js'
import TicketsTable from './TicketsTable'
import ActivitiesTable from './ActivitiesTable'
import CampaignsTable from './CampaignsTable'
import FollowUpTable from './FollowUp/FollowUpTable'
import { apiGet, apiPost } from '../../common/Request.js';



function SalerepDashboard(props) {

  const { classes } = props


  const tableMarketingRef = React.useRef(null);
  const tableActivtyRef = React.useRef(null);

  const tableCampaignRef = React.useRef(null);
  const tableFollowUpRef = React.useRef(null)

  const forceCampaign = () => {
    tableCampaignRef.current.onQueryChange()
  }
  const forceMarketing = () => {
    tableMarketingRef.current.onQueryChange()
  }
  const forceActivities = () => {
    tableActivtyRef.current.onQueryChange()
  }

  const forceFollowUp = ()=>{
    tableFollowUpRef.current.onQueryChange()
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
          <CampaignsTable forceActivities={forceActivities}
            history={props.history}
            tableRef={tableCampaignRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TicketsTable forceActivities={forceActivities}
            history={props.history}
            forceMarketing={forceMarketing}
            tableMarketingRef={tableMarketingRef}
          />
        </Grid>
        <Grid item xs={12}>
          <FollowUpTable forceActivities={forceActivities}
            history={props.history}
            tableRef={tableFollowUpRef}
          />
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(SalerepDashboard)
