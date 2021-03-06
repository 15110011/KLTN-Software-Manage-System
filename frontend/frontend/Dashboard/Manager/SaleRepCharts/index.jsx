import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import {
  BarChart,
  Bar, Area,
  Line,
  Cell,
  XAxis,
  YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Legend, Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Label

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (<div className="">
      <div className="custom-tooltip">
        <p className="custom-tooltip-label">{`Sale-rep ${label}`}</p>
        <ul className="custom-tooltip-item-list">
          {payload.map(p => {
            return (
              <li className="tooltip-item" key={`payload${p.name}`} style={{ color: p.color }}>
                <span className="tooltip-item-name">{p.name}</span>
                <span className="tooltip-item-separator"> : </span>
                <span className="tooltip-item-value">
                  {p.name == 'Success rate' &&
                    `${p.value}%`
                  }
                  {(p.name == 'Income' || p.name == 'Income/Sales') &&
                    <NumberFormat value={parseFloat(p.value).toFixed(3)} displayType='text' thousandSeparator={true} prefix={'$'} />
                  }
                  {p.name != 'Success rate' && p.name != 'Income' && p.name != 'Income/Sales' &&
                    p.value
                  }
                </span>
                <span className="tooltip-item-unit"> </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
    )

  }
  return null
}


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
        {names.length > 1
          ?
          <text x={0} y={0} dy={8} textAnchor="middle" fill="#666">{`${names[0][0].trim()}. ${names[1].trim()}`}</text>
          :
          <text x={0} y={0} dy={8} textAnchor="middle" fill="#666">{`${names[0].trim()}`}</text>
        }
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

  const [saleRepData, setSaleRepData, setUrlSale, forceUpdateSale] = useFetchData(ORDER_CHART_URL + `?chart_type=sale_rep&duration=${selectType}`, null, { data: [] })
  // const [successData, setSuccessData, setUrlSuccess, forceUpdateSuccess] = useFetchData(ORDER_CHART_URL + `?chart_type=success&duration=${selectType}`, null, { data: [] })

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
      <Grid item xs={12}>
        <Paper>
          <Card plain >
            <CardHeader icon color="primary">
              <CardIcon color="primary">
                <SaleRepIcon />
              </CardIcon>
              <h4 style={{ paddingRight: '24px' }} className={classes.cardChartTitle}>Sale Representative </h4>
            </CardHeader>
            <CardBody>
              <Typography classes={{ root: classes.activitytTagline }} component='p'>
                Top 10 sale representatives with quantity and income
                  </Typography>
              <div style={{ witdh: '100%', height: '400px' }}>
                <ResponsiveContainer>
                  <ComposedChart width={600} height={300} data={saleRepData.data.map(d => {
                    return ({
                      name: d.sale_rep_name,
                      "Income/Sales": (d.income / d.amount).toFixed(2),
                      "Success rate": (d.amount / d.total).toFixed(2) * 100,
                      "Income": d.income,

                    })
                  })}
                    margin={{
                      top: 5, right: 20, bottom: 5, left: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={<CustomizedAxisTick />}>
                      <Label value="SaleRep" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis yAxisId={0} dataKey="Income">
                      <Label value="Unit ($)" position="left" angle={-90} />
                    </YAxis>
                    <YAxis yAxisId={1} unit='%' dataKey='Success rate' orientation="right" stroke="#ff8042">
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout='vertical' align='right' verticalAlign='top' wrapperStyle={{ paddingLeft: '10px' }} />
                    <Bar barSize={30} dataKey="Income" fill="#8884d8" label={{ position: 'top' }} />
                    <Area yAxisId={1} dataKey="Success rate" type="monotone" fill="#ff8042" stroke="#ff8042" />
                    <Line yAxisId={0} type="monotone" dataKey="Income/Sales" type="monotone" fill="#00c49f" stroke="#00c49f" />
                  </ComposedChart>
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