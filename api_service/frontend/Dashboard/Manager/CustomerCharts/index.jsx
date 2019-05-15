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
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import { apiGet } from '../../../common/Request'
import { ORDER_CHART_URL, LICENSE_CHART_URL } from '../../../common/urls'
import useFetchData from '../../../CustomHook/useFetchData'

import styles from './Styles.js'
import stateHashes from '../../../common/StateHash'


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

const CustomerCharts = (props) => {


  const { classes } = props


  const [duration, setDuration] = React.useState('month')

  const [stateData, setStateData, setUrl, forceUpdate] = useFetchData(ORDER_CHART_URL + `?chart_type=state&duration=${duration}`, null, { data: [] })

  let vectorRef = React.useRef(null)

  let totalAmount = stateData.data.reduce((acc, d) => {
    acc += d.amount
    return acc
  }, 0)

  let regionData = stateData.data.reduce((acc, d) => {
    acc['US-' + d.code] = d.amount
    return acc
  }, {})

  console.log(regionData)


  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper>
          <Card plain >
            <CardHeader icon>
              <CardIcon color="info">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>Top 6 States</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <Grid item xs={4}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell style={{ textAlign: 'right' }}>Amount</TableCell>
                        <TableCell>Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stateData.data.map((d, index) => {
                        return (
                          <TableRow>
                            <TableCell>{d.code}</TableCell>
                            <TableCell>{stateHashes[d.code]}</TableCell>
                            <TableCell style={{ textAlign: 'right' }}>{d.amount}</TableCell>
                            <TableCell>{(d.amount * 100 / totalAmount).toFixed(2) + '%'}</TableCell>
                          </TableRow>)
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ witdh: '50%', height: '300px' }}>
                    <VectorMap map={'us_aea'}
                      backgroundColor="transparent"
                      containerClassName="map"
                      ref={vectorRef}
                      containerStyle={{
                        width: '100%',
                        height: '100%'
                      }}
                      labels={
                        {
                          regions: {
                            render: (code) => { return code.split('-')[1] },
                            offsets: (code) => {
                              return {
                                'CA': [-10, 10],
                                'ID': [0, 40],
                                'OK': [25, 0],
                                'LA': [-20, 0],
                                'FL': [45, 0],
                                'KY': [10, 5],
                                'VA': [15, 5],
                                'MI': [30, 30],
                                'AK': [50, -25],
                                'HI': [25, 50]
                              }[code.split('-')[1]];
                            }
                          }
                        }
                      }
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0
                        }
                      }}
                      regionLabelStyle={{
                        initial: {
                          fill: '#fff'
                        },
                        hover: {
                          fill: 'black'
                        }
                      }}
                      series={
                        {
                          regions: [{
                            values: regionData,
                            scale: ['#d3d3d3', '#424242'],
                            normalizeFunction: 'polynomial',
                            legend: {
                              // horizontal: true,
                              // vertical: true,
                              title: 'Amount Ranges',
                            },
                          }]
                        }
                      }
                      containerClassName="map"
                      onRegionTipShow={(e, el, code) => {
                        el.html(el.html() + ': ' + regionData[code]);
                      }
                      }
                    />

                  </div>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}


export default withStyles(styles)(CustomerCharts)