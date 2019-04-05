import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { InputLabel } from '@material-ui/core';
import useFetchData from '../../CustomHook/useFetchData'

import styles from './CampaignListStyle'

// API
import { CAMPAIGNS_URL, REFRESH_TOKEN_URL, PACKAGES_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function CampaignList(props) {

  const { classes } = props;

  const [campaignData, setCampaignData, setCampaignURL, forceUpdateCampaign] = useFetchData(CAMPAIGNS_URL, props.history, { data: [], total: 0 })

  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'description' },
              {
                title: 'Status',
                field: 'status',
                lookup: { 'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE' }
              },
            ]}
            data={campaignData.data.map(
              (c, i) => ({
                numeral: i + 1,
                name: c.name,
                description: c.desc,
                status: c.status
              })
            )}
            title="Campaign List"
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
              paging: true
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CampaignList);