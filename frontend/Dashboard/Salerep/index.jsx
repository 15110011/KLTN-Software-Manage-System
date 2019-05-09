import * as React from 'react'

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import * as cn from 'classnames'
import styles from './SalerepStyles.js'
import TicketsTable from './TicketsTable'
import ActivitiesTable from './ActivitiesTable'
import CampaignsTable from './CampaignsTable'
import FollowUpTable from './FollowUp/FollowUpTable'
import OrderTable from './Order/OrderTable'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

import CustomSnackbar from '../../components/CustomSnackbar'
import { apiGet, apiPost } from '../../common/Request.js';



function SalerepDashboard(props) {

  const { classes } = props


  const tableMarketingRef = React.useRef(null);
  const tableActivtyRef = React.useRef(null);

  const tableCampaignRef = React.useRef(null);
  const tableFollowUpRef = React.useRef(null)
  const tableOrderUpRef = React.useRef(null)

  const [expanded, setExpanded] = React.useState({
    upcoming1: true,
    upcoming2: true,
    campaign: true,
    followUp: true,
    waitingList: true,
    order: true,
  })

  const [toggleExpand, setToggleExpand] = React.useState(true)

  const handleExpandAllClick = () => {
    setExpanded({
      upcoming1: true,
      upcoming2: true,
      campaign: true,
      followUp: true,
      waitingList: true,
      order: true,
    })
  }
  const handleCollapseAllClick = () => {
    setExpanded({
      upcoming1: false,
      upcoming2: false,
      campaign: false,
      followUp: false,
      waitingList: false,
      order: false,
    })
  }

  const handleExpandClick = (type) => {
    setExpanded({ ...expanded, [type]: !expanded[type] });
  };

  const forceCampaign = () => {
    tableCampaignRef.current.onQueryChange()
  }
  const forceMarketing = () => {
    tableMarketingRef.current.onQueryChange()
  }
  const forceActivities = () => {
    tableActivtyRef.current.onQueryChange()
  }

  const forceFollowUp = () => {
    tableFollowUpRef.current.onQueryChange()
  }
  const forceOrder = () => {
    tableOrderUpRef.current.onQueryChange()
  }


  return (
    <div className={classes.root}>
      <Grid container classes={{ container: classes.fixTable }}>
        <Grid item xs={12} className={cn("text-right pt-4")} >
          <Button style={{ outline: 'none' }} variant="outlined" size="small" color="default" onClick={() => handleCollapseAllClick()}>
            <RemoveIcon fontSize="small" />
            {' '}
            Collapse All
      </Button>
          {' '}
          <Button style={{ outline: 'none' }} variant="outlined" size="small" color="default" onClick={() => handleExpandAllClick()}>
            <AddIcon fontSize="small" />
            {' '}
            Expand All
      </Button>
        </Grid>
        <Grid item xs={12} className="pt-2">
          <ActivitiesTable tableActivtyRef={tableActivtyRef}
            tableMarketingRef={tableMarketingRef}
            forceActivities={forceActivities}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <CampaignsTable forceActivities={forceActivities}
            history={props.history}
            tableRef={tableCampaignRef}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <TicketsTable forceActivities={forceActivities}
            history={props.history}
            forceMarketing={forceMarketing}
            tableMarketingRef={tableMarketingRef}
            forceFollowUp={forceFollowUp}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <FollowUpTable forceActivities={forceActivities}
            history={props.history}
            tableRef={tableFollowUpRef}
            forceFollowUp={forceFollowUp}
            forceOrder={forceOrder}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <OrderTable forceActivities={forceActivities}
            history={props.history}
            tableRef={tableOrderUpRef}
            forceOrder={forceOrder}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(SalerepDashboard)
