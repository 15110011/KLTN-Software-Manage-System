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

const CustomerCharts = (props) => {


  const { classes } = props


  const [chartType, setChartType] = React.useState('product')
  const [duration, setDuration] = React.useState('month')

  const [productData, setProductData, setUrl, forceUpdate] = useFetchData(ORDER_CHART_URL + `?chart_type=${chartType}&duration=${duration}`, null, null)
  const [licenseData, setLicenseData, setUrlLicense, forceUpdateLicense] = useFetchData(LICENSE_CHART_URL + `?duration=${duration}`, null, null)

  let vectorRef = React.useRef(null)

  console.log(vectorRef)

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper>
          <Card plain >
            <CardHeader icon>
              <CardIcon color="info">
                <CategoryIcon />
              </CardIcon>
              <h4 className={classes.cardChartTitle}>License</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={6}>
                  <div style={{ witdh: '50%', height: '300px' }}>
                    <VectorMap map={'us_aea'}
                      backgroundColor="transparent"
                      containerClassName="map"
                      ref={vectorRef}
                      containerStyle={{
                        width: '100%',
                        height: '100%'
                      }}

                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0
                        }
                      }}
                      series={
                        {
                          regions: [{
                            values: { 'US-AK': 1, 'US-AL': 50 },
                            scale: ['#AAA', '#444'],
                            normalizeFunction: 'polynomial'
                          }]
                        }
                      }
                      containerClassName="map"
                      onRegionTipShow={(e, el, code) => {
                        el.html(el.html() + ': ' + 444);
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