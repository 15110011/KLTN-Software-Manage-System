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

import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardIcon from '../../../components/Card/CardIcon'
import SaleRepIcon from '@material-ui/icons/Group'


import { apiGet } from '../../../common/Request'
import { ORDER_CHART_URL } from '../../../common/urls'
import useFetchData from '../../../CustomHook/useFetchData'

import styles from './Styles.js'

const data = [
  {
    name: 'Cristiano Ronaldo', Quantity: 9800, Income: 2600,
  },
  {
    name: 'Luccy Wohn', Quantity: 5400, Income: 4000,
  },
  {
    name: 'Nv 3', Quantity: 6400, Income: 3000,
  },
  {
    name: 'Nv 4', Quantity: 3000, Income: 7000,
  },
  {
    name: 'Nv 5', Quantity: 4000, Income: 4000,
  },
  {
    name: 'Nv 6', Quantity: 5000, Income: 5000,
  },
  {
    name: 'Nv 7', Quantity: 2000, Income: 4300,
  },
  {
    name: 'Nv 8', Quantity: 7000, Income: 6400,
  },
  {
    name: 'Nv 9', Quantity: 2600, Income: 8000,
  },
  {
    name: 'Nv 10', Quantity: 8800, Income: 2400,
  },
];

const data1 = [
  { name: 'Luccy Vo', value: 400 },
  { name: 'Luccy Vo', value: 600 },
  { name: 'Luccy Vo', value: 900 },
  { name: 'Luccy Vo', value: 700 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class CustomizedAxisTick extends React.PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    const names = payload.value.split(' ')
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">{`${names[0][0].trim()}. ${names[1].trim()}`}</text>
      </g>
    );
  }
}

function SaleRepCharts(props) {

  const { classes } = props;

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper>
          <Card plain >
            <CardHeader icon color="primary">
              <CardIcon color="primary">
                <SaleRepIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Sale Representative</h4>
            </CardHeader>
            <CardBody>
              <Typography classes={{ root: classes.activitytTagline }} component='p'>
                Top 10 sale representatives with quantity and income
                          </Typography>
              <div style={{ witdh: '100%', height: '400px' }}>
                <ResponsiveContainer>
                  <ComposedChart width={600} height={300} data={data}
                    margin={{
                      top: 20, right: 20, bottom: 20, left: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quantity" fill="#8884d8" label={{ position: 'top' }} />
                    <Line type="monotone" dataKey="Income" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Card plain >
            <CardHeader icon color="primary">
              <CardIcon color="primary">
                <SaleRepIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Sale Representative</h4>
            </CardHeader>
            <CardBody>
              <Typography classes={{ root: classes.activitytTagline }} component='p'>
                Top 10 sale representatives with successful deal
                          </Typography>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <PieChart width={500} height={500}>
                    <Tooltip />
                    <Pie
                      data={data1}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {
                        data1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                      }
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(SaleRepCharts);