import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';
import * as DateFnsUtils from '@date-io/date-fns';
import MaterialTable from 'material-table'


import styles from './Styles.js'
import { Paper } from '@material-ui/core';

function Report(props) {
  const { classes } = props
  const [states, setStates] = React.useState()

  return (
    <div className={classes.root}>
      <Grid container>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    select
                    label="State"
                    value={states}
                    // onChange={this.handleChange('currency')}
                    SelectProps={{

                    }}
                    margin="normal"
                  >
                    <MenuItem>
                      sd
            </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <DateTimePicker
                    // onChange={setStartDate}
                    // value={startDate}
                    style={{ marginTop: '16px' }}
                    label="From"
                    name="from"
                    minDate={new Date()}
                    format="MM/dd/yyyy hh:mm a"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <DateTimePicker
                    // onChange={setStartDate}
                    // value={startDate}
                    style={{ marginTop: '16px' }}
                    label="To"
                    name="to"
                    minDate={new Date()}
                    format="MM/dd/yyyy hh:mm a"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={12} className="pt-3">
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral' },
              { title: 'Order', field: 'order' },
              { title: 'Product', field: 'product' },
              { title: 'Campaign', field: 'campaign' },
              { title: 'From', field: 'from' },
              { title: 'To', field: 'to' },
              { title: 'State', field: 'state' }
            ]}
            data={[{
              numeral: '12'
            }]}
            title="Product"
            options={{
              toolbar: true,
              paging: true,
              search: false
            }}
          />
        </Grid>
        <Grid item xs={12} className="pt-3">
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral' },
              { title: 'Order', field: 'order' },
              { title: 'Product', field: 'product' },
              { title: 'Campaign', field: 'campaign' },
              { title: 'From', field: 'from' },
              { title: 'To', field: 'to' },
              { title: 'State', field: 'state' }
            ]}
            data={[{
              numeral: '12'
            }]}
            title="Sale Rep"
            options={{
              toolbar: true,
              paging: true,
              search: false
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Report);