/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  TableCell, TableRow, TextField,
  FormControl, Select, Input,
  MenuItem, Checkbox, ListItemText,
  InputAdornment, Icon, Tooltip, Grid
} from '@material-ui/core';
import * as DateFnsUtils from '@date-io/date-fns';
import * as formatDate from 'date-fns/format';
import * as parseISO from 'date-fns/parseISO'
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class MTableFilterRow extends React.Component {

  state = {
    from: '',
    to: ''
  }

  renderLookupFilter = (columnDef) => (
    <FormControl style={{ width: '100%' }}>
      <Select
        multiple
        value={columnDef.tableData.filterValue || []}
        onChange={event => {
          this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        }}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={selecteds => selecteds.map(selected => columnDef.lookup[selected]).join(', ')}
        MenuProps={MenuProps}
      >
        {
          Object.keys(columnDef.lookup).map(key => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={columnDef.tableData.filterValue ? columnDef.tableData.filterValue.indexOf(key.toString()) > -1 : false} />
              <ListItemText primary={columnDef.lookup[key]} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )

  renderBooleanFilter = (columnDef) => (
    <Checkbox
      indeterminate={columnDef.tableData.filterValue === undefined}
      checked={columnDef.tableData.filterValue === 'checked'}
      onChange={() => {
        let val;
        if (columnDef.tableData.filterValue === undefined) {
          val = 'checked';
        } else if (columnDef.tableData.filterValue === 'checked') {
          val = 'unchecked';
        }

        this.props.onFilterChanged(columnDef.tableData.id, val);
      }}
    />
  )

  renderDefaultFilter = (columnDef) => {
    const localization = { ...this.props.localization };
    return (
      <TextField
        style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
        type={columnDef.type === 'numeric' ? 'number' : 'text'}
        value={columnDef.tableData.filterValue || ''}
        onChange={(event) => {
          this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title={localization.filterTooltip}>
                <this.props.icons.Filter />
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
    );
  }

  renderDateTypeFilter = (columnDef) => {
    const { onFilterDateRange, timeRanges } = this.props
    let dateInputElement = null;
    let onDateInputChange
    let onDateFromInputChange
    let onDateToInputChange
    onDateInputChange = date => this.props.onFilterChanged(columnDef.tableData.id, date);
    onDateFromInputChange = date => {
      if (date) {
        onFilterDateRange('from', formatDate(date, 'yyyy-MM-dd'), columnDef.tableData.id)
      }
      else {
        onFilterDateRange('from', date, columnDef.tableData.id)
      }
    }
    onDateToInputChange = date => {
      if (date) {
        onFilterDateRange('to', formatDate(date, 'yyyy-MM-dd'), columnDef.tableData.id)
      }
      else {
        onFilterDateRange('to', date, columnDef.tableData.id)
      }

    }

    if (columnDef.type === 'date') {
      dateInputElement = (
        <DatePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable

              format="MM/dd/yyyy"
        />
      );
    }
    else if (columnDef.type === 'dateRange') {
      dateInputElement = (
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <DatePicker
              value={timeRanges[columnDef.tableData.id].from || null}
              onChange={date => onDateFromInputChange(date)}
              clearable
              format="MM/dd/yyyy"
              name='from'
              // label='From'
              placeholder='From'
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              value={timeRanges[columnDef.tableData.id].to || null}
              onChange={date => onDateToInputChange(date)}
              clearable
              name='to'
              format="MM/dd/yyyy"
              // label='To'
              placeholder='To'
            />
          </Grid>
        </Grid>
      );
    }
    else if (columnDef.type === 'datetime') {
      dateInputElement = (
        <DateTimePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable
        />
      );
    } else if (columnDef.type === 'time') {
      dateInputElement = (
        <TimePicker
          value={columnDef.tableData.filterValue || null}
          onChange={onDateInputChange}
          clearable
        />
      );
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {dateInputElement}
      </MuiPickersUtilsProvider>
    );
  }

  getComponentForColumn(columnDef) {
    if (columnDef.filtering === false) {
      return null;
    }

    if (columnDef.field || columnDef.customFilterAndSearch) {
      if (columnDef.lookup) {
        return this.renderLookupFilter(columnDef);
      } else if (columnDef.type === 'boolean') {
        return this.renderBooleanFilter(columnDef);
      } else if (['date', 'datetime', 'time', 'dateRange'].includes(columnDef.type)) {
        return this.renderDateTypeFilter(columnDef);
      } else {
        return this.renderDefaultFilter(columnDef);
      }
    }
  }

  render() {
    const columns = this.props.columns
      .filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .map(columnDef => (
        <TableCell key={columnDef.tableData.id}>
          {this.getComponentForColumn(columnDef)}
        </TableCell>
      ));

    if (this.props.selection) {
      columns.splice(0, 0, (
        <TableCell padding="none" key="key-selection-column">
          <Checkbox onChange={this.props.onFilterSelectionChanged} />
        </TableCell>)
      );
    }
    if (this.props.emptyCell && this.props.hasActions) {
      if (this.props.actionsColumnIndex === -1) {
        columns.push(<TableCell key="key-action-column" />);
      } else {
        let endPos = 0;
        if (this.props.selection) {
          endPos = 1;
        }
        columns.splice(this.props.actionsColumnIndex + endPos, 0, <TableCell key="key-action-column" />);
      }
    }

    if (this.props.hasDetailPanel) {
      columns.splice(0, 0, <TableCell padding="none" key="key-detail-panel-column" />);
    }

    if (this.props.isTreeData > 0) {
      columns.splice(0, 0,
        <TableCell
          padding="none"
          key={"key-tree-data-filter"}
        />
      );
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        columns.splice(0, 0, <TableCell padding="checkbox" key={"key-group-filter" + columnDef.tableData.id} />);
      });

    return (
      <TableRow style={{ height: 10 }}>
        {columns}
      </TableRow>
    );
  }
}

export default MTableFilterRow;
