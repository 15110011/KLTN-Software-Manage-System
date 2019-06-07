import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import StateIcon from '@material-ui/icons/Flag';
import TypeIcon from '@material-ui/icons/Style';
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
import { apiPost, apiGet } from '../common/Request.js';
import { REPORT_URL } from '../common/urls'
import { CalendarMonthGrid } from 'react-dates/lib';
import * as moment from 'moment'
import statesHashes from '../common/StateHash'

function Report(props) {
  const { classes, user } = props
  const [startDate, setStartDate] = React.useState(moment().startOf('month'))
  const [endDate, setEndDate] = React.useState(moment().endOf('month'))
  const [focusedInput, setFocusedInput] = React.useState(null)
  const [dataSearch, setDataSearch] = React.useState([])
  const [typeReport, setTypeReport] = React.useState('product')
  let data = {
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD'),
    states: []
  }
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
    apiPost(REPORT_URL, { data: { state: data.states.length ? data.states : null, from: startDate.format('YYYY-MM-DD'), to: endDate.format('YYYY-MM-DD') } }, false, true).then(res => {
      setDataSearch(res.data.data)
    })
  }

  const onChangeTypeReport = e => {
    setTypeReport([e.target.name] = e.target.value)
  }

  console.log(dataSearch)

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={3} className={classes.borderBox} style={{ display: 'inline-flex'}}>
              <Grid container style={{ height: '48px', color: '#82888a', border: '1px solid #dbdbdb' }}>
                <Grid item xs={1}>
                  <StateIcon fontSize="small" />
                </Grid>
                {' '}
                <Grid item xs={11}>
                  <MultiSelectComponent id="checkbox" dataSource={sportsData}
                    removed={(e) => {
                      data.states = data.states.filter(s => s != e.itemData.Id)
                    }}
                    select={(e) => {
                      data.states = ([...data.states, e.itemData.Id])
                    }}
                    cssClass={classes.removeBorder}
                    fields={fields} placeholder="Select States" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                    <Inject services={[CheckBoxSelection]} />
                  </MultiSelectComponent>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} className={classes.datePick}>
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
                // minDate={null}
                inputIconPosition={ICON_BEFORE_POSITION}
              />
            </Grid>
            {
              user.profile.is_manager &&
              <Grid item xs={3}>
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
                  value={typeReport}
                  onChange={onChangeTypeReport}
                  SelectProps={{

                  }}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem value="product">
                    Product
                  </MenuItem>
                  <MenuItem value="sale">
                    Sale Rep
                  </MenuItem>
                </TextField>
              </Grid>}
            <Grid item xs={2}>
              <Button onClick={() => handleFilter()} style={{ height: '48px', width: '50%' }} variant="contained" color="primary">
                Filter
                </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="pt-3">
          {
            typeReport == 'product' ?
              <MaterialTable
                title="Product"
                columns={[
                  { title: '#', field: 'numeral', headerStyle: { zIndex: 0 }, filtering: false, sorting: false },
                  { title: 'Order', field: 'order', headerStyle: { zIndex: 0 } },
                  {
                    title: 'Product', field: 'product', headerStyle: { zIndex: 0 },
                    customSort: (a, b) => {
                      if (!a.product) return 1
                      if (!b.product) return -1
                      return a.product.toString().toLowerCase() < b.product.toString().toLowerCase() ? -1 : 1
                    }
                  },
                  {
                    title: 'Campaign', field: 'campaign', headerStyle: { zIndex: 0 },
                    customSort: (a, b) => {
                      if (!a.campaign) return 1
                      if (!b.campaign) return -1
                      return a.campaign.toString().toLowerCase() < b.campaign.toString().toLowerCase() ? -1 : 1
                    }
                  },
                  { title: 'State', field: 'state', headerStyle: { zIndex: 0 } }
                ]}

                options={{
                  search: false,
                  filtering: true
                }}
                data={dataSearch && dataSearch.map((s, i) => ({
                  'numeral': i + 1,
                  'order': s.name ? s.name : '',
                  'product': s.campaign.product != null ? s.campaign.product.name : 'asad',
                  'campaign': s.campaign.name ? s.campaign.name : '',
                  'state': stateHashes[s.contacts.state]
                }))

                }
              /> :
              <MaterialTable
                title="Sale Rep"
                columns={[
                  { title: '#', field: 'numeral', headerStyle: { zIndex: 0 }, filtering: false, sorting: false },
                  { title: 'Order', field: 'order', headerStyle: { zIndex: 0 } },
                  {
                    title: 'Sale Rep', field: 'sale', headerStyle: { zIndex: 0 },
                    // customSort: (a, b) => {
                    //   if (!a.product) return 1
                    //   if (!b.product) return -1
                    //   return a.product.toString().toLowerCase() < b.product.toString().toLowerCase() ? -1 : 1
                    // }
                  },
                  {
                    title: 'Campaign', field: 'campaign', headerStyle: { zIndex: 0 },
                    customSort: (a, b) => {
                      if (!a.campaign) return 1
                      if (!b.campaign) return -1
                      return a.campaign.toString().toLowerCase() < b.campaign.toString().toLowerCase() ? -1 : 1
                    }
                  },
                  { title: 'State', field: 'state', headerStyle: { zIndex: 0 } }
                ]}

                options={{
                  search: false,
                  filtering: true
                }}
                data={dataSearch && dataSearch.map((s, i) => ({
                  'numeral': i + 1,
                  'order': s.name ? s.name : '',
                  'sale': s.sale_rep.username ? s.sale_rep.username : '',
                  'campaign': s.campaign.name ? s.campaign.name : '',
                  'state': stateHashes[s.contacts.state]
                }))
                }
              />
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Report);
