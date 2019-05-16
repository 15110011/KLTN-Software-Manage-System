import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import {
  BarChart,
  Bar,
  Line,
  Cell,
  XAxis,
  YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Legend, Tooltip,
  ResponsiveContainer,
  ComposedChart

} from 'recharts';
import * as NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper'
import * as cn from 'classnames'
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardIcon from '../../../components/Card/CardIcon'
import SaleRepIcon from '@material-ui/icons/Group'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import StatsCard from '../../../components/Card/StatsCard'
import FollowUpPlanIcon from '@material-ui/icons/FindInPage';
import MarketingListIcon from '@material-ui/icons/ListAlt';
import SuccessIcon from '@material-ui/icons/DoneAll';
import FailedIcon from '@material-ui/icons/HighlightOff';

import styles from './Styles'

function Overview(props) {

  const { classes } = props;

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <StatsCard
            icon={MarketingListIcon}
            iconColor="primary"
            title="Waiting List"
            description="50"
            small="Contacts"
            statIcon={MarketingListIcon}
            statIconColor="danger"
            statLink={{ text: "In this month" }}
          />
        </Grid>
        <Grid item xs={3}>
          <StatsCard
            icon={FollowUpPlanIcon}
            iconColor="orange"
            title="Follow-up"
            description="490"
            small="Contacts"
            statIcon={FollowUpPlanIcon}
            statIconColor="danger"
            statLink={{ text: "In this month" }}
          />
        </Grid>
        <Grid item xs={3}>
          <StatsCard
            icon={SuccessIcon}
            iconColor="green"
            title="Success"
            description="40"
            small="Contacts"
            statIcon={SuccessIcon}
            statIconColor="danger"
            statLink={{ text: "In this month" }}
          />
        </Grid>
        <Grid item xs={3}>
          <StatsCard
            icon={FailedIcon}
            iconColor="red"
            title="Failed"
            description="5"
            small="Contacts"
            statIcon={FailedIcon}
            statIconColor="danger"
            statLink={{ text: "In this month" }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Overview);