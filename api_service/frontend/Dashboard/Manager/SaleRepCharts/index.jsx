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

const months = [
  {
    name: 'January',
    value: '1'
  },
  {
    name: 'February',
    value: '2'
  },
  {
    name: 'March',
    value: '3'
  },
  {
    name: 'April ',
    value: '4'
  },
  {
    name: 'May',
    value: '5'
  },
  {
    name: 'June',
    value: '6'
  },
  {
    name: 'July ',
    value: '7'
  },
  {
    name: 'August',
    value: '8'
  },
  {
    name: 'September',
    value: '9'
  },
  {
    name: 'October',
    value: '10'
  },
  {
    name: 'November',
    value: '11'
  },
  {
    name: 'December',
    value: '12'
  }
]

const quarters = [
  {
    name: 'Q1',
    value: '1'
  },
  {
    name: 'Q2',
    value: '2'
  },
  {
    name: 'Q3',
    value: '3'
  },
  {
    name: 'Q4',
    value: '4'
  },
]


function SaleRepCharts(props) {

  const { classes } = props;

  const [selectType, setSelectType] = React.useState(
    'month'
  )

  const [selectTypePieChart, setSelectTypePieChart] = React.useState(
    'month'
  )

  const [selectWhichType, setSelectWhichType] = React.useState(
    new Date().getMonth() + 1
  )

  const [selectWhichTypePieChart, setSelectWhichTypePieChart] = React.useState(
    new Date().getMonth() + 1
  )

  const years = []
  const curYear = new Date().getFullYear()
  for (let i = 0; i < 5; i += 1) {
    years.push(curYear - i)
  }

  const onChangeSelectType = e => {
    setSelectType(e.target.value)
    if (e.target.value == "month") {
      setSelectWhichType(new Date().getMonth() + 1)
    } else if (e.target.value == 'quarter') {
      setSelectWhichType(`${parseInt(12 / (new Date().getMonth() + 1))}`)
    } else if (e.target.value == 'year') {
      setSelectWhichType(new Date().getFullYear())
    }
  }

  const onChangeSelectWhichType = e => {
    setSelectWhichType(e.target.value)
  }

  const onChangeSelectTypePieChart = e => {
    setSelectTypePieChart(e.target.value)
    if (e.target.value == "month") {
      setSelectWhichTypePieChart(new Date().getMonth() + 1)
    } else if (e.target.value == 'quarter') {
      setSelectWhichTypePieChart(`${parseInt(12 / (new Date().getMonth() + 1))}`)
    } else if (e.target.value == 'year') {
      setSelectWhichTypePieChart(new Date().getFullYear())
    }
  }

  const onChangeSelectWhichTypePieChart = e => {
    setSelectWhichTypePieChart(e.target.value)
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={7}>
        <Paper>
          <Card plain >
            <CardHeader icon color="primary">
              <CardIcon color="primary">
                <SaleRepIcon />
              </CardIcon>
              <h4 style={{ paddingRight: '24px' }} className={classes.cardChartTitle}>Sale Representative
                <TextField
                  select
                  style={{ float: 'right', width: '100px' }}
                  onChange={onChangeSelectWhichType}
                  value={selectWhichType}
                  inputProps={{
                    name: 'selectWhichType',
                  }}
                >
                  {
                    selectType == 'month' &&
                    months.map((m, i) => {
                      return (
                        <MenuItem key={i} value={m.value}>
                          {m.name}
                        </MenuItem>
                      )
                    })
                  }
                  {
                    selectType == 'quarter' &&
                    quarters.map((q, i) => {
                      return (
                        <MenuItem key={i} value={q.value}>
                          {q.name}
                        </MenuItem>
                      )
                    })
                  }
                  {
                    selectType == 'year' &&
                    years.map((y, i) => {
                      return (
                        <MenuItem key={i} value={y}>
                          {y}
                        </MenuItem>
                      )
                    })
                  }
                </TextField>
                <TextField
                  select
                  style={{ float: 'right', width: '100px', marginRight: '15px' }}
                  onChange={onChangeSelectType}
                  value={selectType}
                  inputProps={{
                    name: 'selectType',
                  }}
                >
                  <MenuItem value="month">
                    Month
                      </MenuItem>
                  <MenuItem value="quarter">
                    Quarter
                      </MenuItem>
                  <MenuItem value="year">
                    Year
                      </MenuItem>
                </TextField>
              </h4>
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
                    <Bar barSize={30} dataKey="Quantity" fill="#8884d8" label={{ position: 'top' }} />
                    <Line type="monotone" dataKey="Income" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper>
          <Card plain >
            <CardHeader icon color="primary">
              <CardIcon color="primary">
                <SaleRepIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Sale Representative
              <TextField
                  select
                  style={{ float: 'right', width: '100px' }}
                  onChange={onChangeSelectWhichTypePieChart}
                  value={selectWhichTypePieChart}
                  inputProps={{
                    name: 'selectWhichType',
                  }}
                >
                  {
                    selectTypePieChart == 'month' &&
                    months.map((m, i) => {
                      return (
                        <MenuItem key={i} value={m.value}>
                          {m.name}
                        </MenuItem>
                      )
                    })
                  }
                  {
                    selectTypePieChart == 'quarter' &&
                    quarters.map((q, i) => {
                      return (
                        <MenuItem key={i} value={q.value}>
                          {q.name}
                        </MenuItem>
                      )
                    })
                  }
                  {
                    selectTypePieChart == 'year' &&
                    years.map((y, i) => {
                      return (
                        <MenuItem key={i} value={y}>
                          {y}
                        </MenuItem>
                      )
                    })
                  }
                </TextField>
                <TextField
                  select
                  style={{ float: 'right', width: '100px', marginRight: '15px' }}
                  onChange={onChangeSelectTypePieChart}
                  value={selectTypePieChart}
                  inputProps={{
                    name: 'selectTypePieChart',
                  }}
                >
                  <MenuItem value="month">
                    Month
                      </MenuItem>
                  <MenuItem value="quarter">
                    Quarter
                      </MenuItem>
                  <MenuItem value="year">
                    Year
                      </MenuItem>
                </TextField>
              </h4>
            </CardHeader>
            <CardBody>
              <Typography classes={{ root: classes.activitytTagline }} component='p'>
                Top 10 sale representatives with successful deal
                          </Typography>
              <div style={{ width: '100%', height: '400px' }}>
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