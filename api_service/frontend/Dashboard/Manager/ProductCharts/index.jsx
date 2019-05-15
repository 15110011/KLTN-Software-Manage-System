import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import {
  ComposedChart, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart
} from 'recharts'
import * as NumberFormat from 'react-number-format';
import Paper from '@material-ui/core/Paper'
import { VectorMap } from 'react-jvectormap'

import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardIcon from '../../../components/Card/CardIcon'
import CategoryIcon from '@material-ui/icons/Category'
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

  let vectorRef = React.useRef(null)

  console.log(vectorRef)

  return (
    <Grid container spacing={8}>
      <Grid item xs={6}>
        <Paper>
          <Card plain >
            <CardHeader icon color="success">
              <CardIcon color="success">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Products</h4>
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
                      top: 20, right: 20, bottom: 20, left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Income" barSize={20} fill="#413ea0" label={{ position: 'top' }} />
                    <Line type="monotone" dataKey="Income/Sales" stroke="#ff7300" />
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
            <CardHeader icon>
              <CardIcon color="info">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>License</h4>
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
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
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