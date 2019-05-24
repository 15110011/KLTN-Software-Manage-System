import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import StateIcon from '@material-ui/icons/flag';
import TypeIcon from '@material-ui/icons/style';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';
import * as DateFnsUtils from '@date-io/date-fns';
import MaterialTable from 'material-table'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import styles from './Styles.js'
import { Paper } from '@material-ui/core';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT, ICON_BEFORE_POSITION } from './constants';
import '../../node_modules/react-dates/lib/css/_datepicker.css'
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import stateHashes from '../common/StateHash'
import InputAdornment from '@material-ui/core/InputAdornment';
import { apiPost } from '../common/Request.js';
import { REPORT_URL } from '../common/urls'
import { CalendarMonthGrid } from 'react-dates/lib';

function Report(props) {
  const { classes } = props
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const [focusedInput, setFocusedInput] = React.useState(null)
  // const [cloneState, setCloneState] = React.useState([])
  let cloneState = []
  const sportsData = Object.keys(stateHashes).map((k) => {
    return {
      Id: k,
      Name: stateHashes[k]
    }
  })
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // const fields = {
  //   text: 'Name',
  //   value: 'Id'
  // }

  const [fields, setFields] = React.useState({
    text: 'Name',
    value: 'Id'
  })

  const handleFilter = e => {
    apiPost(REPORT_URL, {data: cloneState}, false, true).then(res=>{

    })
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24} >
              <Grid item xs={3} className={classes.borderBox} style={{ display: 'inline-flex', marginLeft: '85px' }}>
                <Grid container style={{ height: '48px', color: '#82888a', border: '1px solid #dbdbdb' }}>
                  <Grid item xs={1}>
                    <StateIcon fontSize="small" />
                  </Grid>
                  {' '}
                  <Grid item xs={11}>
                    <MultiSelectComponent id="checkbox" dataSource={sportsData}
                      removed={(e) => {
                        cloneState = cloneState.filter(s => s != e.itemData.Id)
                      }}
                      select={(e) => {
                        cloneState = ([...cloneState, e.itemData.Id])
                      }}
                      cssClass={classes.removeBorder}
                      fields={fields} placeholder="Select States" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                      <Inject services={[CheckBoxSelection]} />
                    </MultiSelectComponent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <DateRangePicker
                  startDatePlaceholderText="From"
                  endDatePlaceholderText="To"
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                  }} // PropTypes.func.isRequired,
                  onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
                  showDefaultInputIcon={true}
                  inputIconPosition={ICON_BEFORE_POSITION}
                />
              </Grid>
              <Grid item xs={3} style={{ marginLeft: '-85px' }}>
                <TextField
                  style={{ marginTop: '0', height: '48px' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <TypeIcon fontSize="small" />
                    </InputAdornment>,
                  }}
                  fullWidth
                  select
                  label="Type"
                  classes={{ root: classes.textField }}
                  // value={values.currency}
                  // onChange={handleChange('currency')}
                  SelectProps={{

                  }}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem>
                    asd
          </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleFilter()} style={{ height: '48px', width: '50%' }} variant="contained" color="primary">
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} className="pt-3">
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral', headerStyle: { zIndex: 0 } },
              { title: 'Order', field: 'order', headerStyle: { zIndex: 0 } },
              { title: 'Product', field: 'product', headerStyle: { zIndex: 0 } },
              { title: 'Campaign', field: 'campaign', headerStyle: { zIndex: 0 } },
              { title: 'From', field: 'from', headerStyle: { zIndex: 0 } },
              { title: 'To', field: 'to', headerStyle: { zIndex: 0 } },
              { title: 'State', field: 'state', headerStyle: { zIndex: 0 } }
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
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Report);