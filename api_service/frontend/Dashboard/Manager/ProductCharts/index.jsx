import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import {
  ComposedChart, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, Label
} from 'recharts'
import * as NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper'
import { VectorMap } from 'react-jvectormap'

import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardIcon from '../../../components/Card/CardIcon'
import CategoryIcon from '@material-ui/icons/Category'

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { apiGet } from '../../../common/Request'
import { ORDER_CHART_URL, LICENSE_CHART_URL } from '../../../common/urls'
import useFetchData from '../../../CustomHook/useFetchData'

import styles from './Styles.js'


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="">
        <div className="custom-tooltip">
          <p className="custom-tooltip-label">{`Month ${label}`}</p>
          <ul className="custom-tooltip-item-list">
            {payload.map(p => {
              return (
                <li className="tooltip-item" key={`payload${p.name}`} style={{ color: p.color }}>
                  <span className="tooltip-item-name">{p.name}</span>
                  <span className="tooltip-item-separator"> : </span>
                  <span className="tooltip-item-value">
                    {
                      p.name == 'Income' ?
                        <NumberFormat value={p.value} displayType='text' thousandSeparator={true} prefix={'$'} />
                        : p.value
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

const ProductCharts = (props) => {


  const { classes } = props


  const [chartType, setChartType] = React.useState('product')
  const [duration, setDuration] = React.useState('month')

  const [productData, setProductData, setUrl, forceUpdate] = useFetchData(ORDER_CHART_URL + `?chart_type=${chartType}&duration=${duration}`, null, null)
  const [licenseData, setLicenseData, setUrlLicense, forceUpdateLicense] = useFetchData(LICENSE_CHART_URL + `?duration=${duration}`, null, null)

  const [selectTypeLineChart, setSelectTypeLineChart] = React.useState(
    'month'
  )
  const onChangeSelectTypeLineChart = e => {
    setSelectTypeLineChart(e.target.value)
  }

  const [selectTypeComposeChart, setSelectTypeComposeChart] = React.useState(
    'month'
  )
  const onChangeSelectTypeComposeChart = e => {
    setSelectTypeComposeChart(e.target.value)
  }
  let vectorRef = React.useRef(null)

  return (
    <Grid container spacing={8}>
      <Grid item xs={6} md={12} lg={12}>
        <Paper>
          <Card plain >
            <CardHeader icon color="success">
              <CardIcon color="success">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Products
              {/* <TextField
                  select
                  style={{ float: 'right', width: '100px', marginRight: '15px' }}
                  onChange={onChangeSelectTypeComposeChart}
                  value={selectTypeComposeChart}
                  inputProps={{
                    name: 'selectTypeComposeChart',
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
                </TextField> */}
              </h4>
            </CardHeader>
            <CardBody>
              <div style={{ witdh: '50%', height: '300px' }}>
                <ResponsiveContainer>
                  <ComposedChart
                    width={500}
                    height={400}
                    data={productData && Object.keys(productData).map((k) => {
                      return {
                        month: k,
                        'Income/Sales': productData[k].income.total / productData[k].number.total,
                        Income: productData[k].income.total
                      }
                    })}
                    margin={{
                      top: 20, right: 20, bottom: 5, left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="month" >
                      <Label value="Month" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number">
                      <Label value="Unit ($)" position="left" angle={-90} />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout='vertical' align='right' verticalAlign='top' margin={{ left: 10 }} wrapperStyle={{ paddingLeft: '10px' }} />
                    <Bar dataKey="Income" barSize={20} fill="#413ea0" label={{ position: 'top' }} />
                    <Line type="monotone" dataKey="Income/Sales" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
      <Grid item item xs={6} md={12} lg={12}>
        <Paper>
          <Card plain >
            <CardHeader icon>
              <CardIcon color="info">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>License
              {/* <TextField
                  select
                  style={{ float: 'right', width: '100px', marginRight: '15px' }}
                  onChange={onChangeSelectTypeLineChart}
                  value={selectTypeLineChart}
                  inputProps={{
                    name: 'selectTypeLineChart',
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
                </TextField> */}
              </h4>
            </CardHeader>
            <CardBody>
              <div style={{ witdh: '50%', height: '300px' }}>
                <ResponsiveContainer>
                  <LineChart
                    width={500}
                    height={300}
                    data={licenseData && Object.keys(licenseData).map(l => {
                      return {
                        month: l,
                        "1 month": licenseData[l][1],
                        "6 months": licenseData[l][6],
                        "12 months": licenseData[l][12],
                        "Life time": licenseData[l]['lifetime'],
                      }
                    })}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month">
                      <Label value="Month" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                      <Label value="Unit" position="left" angle={-90} />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout='vertical' align='right' verticalAlign='top' wrapperStyle={{ paddingLeft: '10px' }} />
                    <Line type="monotone" dataKey="1 month" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="6 months" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="12 months" stroke="#ffc658" />
                    <Line type="monotone" dataKey="Life time" stroke="#d62728" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}


export default withStyles(styles)(ProductCharts)