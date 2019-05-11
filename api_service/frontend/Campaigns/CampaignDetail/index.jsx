import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable from 'material-table'

// Components
import DetailTab from './DetailTab';

import styles from './CampaignDetailStyle'
import MarketingTab from './MarketingTab';
import FollowUpTab from './FollowUpTab';
import InvoiceTab from './InvoiceTab';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function CampaignDetail(props) {
  const { classes, theme } = props;
  const [value, setValue] = React.useState(0)

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/products/ + `}>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={8} style={{ margin: 'unset' }}>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <ProductIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Campaign</span></li>
                  <li><p style={{ fontSize: '16px' }}>ABC</p></li>
                </ul>
              </div>
            </Grid>
            <AppBar position="static">
              <Tabs value={value}
                onChange={(e, value) => {
                  setValue(value)
                }}
              >
                <Tab label="Details" />
                <Tab label="Marketing" />
                <Tab label="Follow-up" />
                <Tab label="Invoices" />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left', padding: '40px' }}>
              {value === 0 &&
                <TabContainer>
                  <DetailTab />
                </TabContainer>}
              {value === 1 &&
                <TabContainer>
                  <MarketingTab />
                </TabContainer>}
              {value === 2 &&
                <TabContainer>
                  <FollowUpTab />
                </TabContainer>}
              {value === 3 && 
              <TabContainer>
                <InvoiceTab />
              </TabContainer>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CampaignDetail);