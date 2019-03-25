import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

import styles from './FormLicensePriceStyle'

function FormLicensePrice(props) {
  const [month, setMonth] = React.useState('')
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const handleChange = e => {
    setAddBtn({ [e.target.name]: e.target.value });
  }
  const handleChangeMonth = month => e => {
    setMonth(e.target.value)
  }
  let InputLabelRef = ''

  const { classes } = props;

  console.log(234);

  return (
    <div>
      <Grid className="mt-3" container spacing={8} classes={{ container: classes.borderForm }}>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth className={classes.formControl}>
            <InputLabel
              ref={ref => {
                InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
            </InputLabel>
            <Select
              value={month}
              onChange={handleChangeMonth}
              input={
                <OutlinedInput
                  labelWidth={addBtn.labelWidth}
                  name="month"
                  id="outlined-age-simple"
                />
              }
            >
              <MenuItem value={'1month'}>1 Month</MenuItem>
              <MenuItem value={'6months'}>6 Months</MenuItem>
              <MenuItem value={'1year'}>1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Input
            fullWidth
            placeholder="Price"
            className={classes.input}
            inputProps={{
              'aria-label': 'price',
            }}
          />
        </Grid>
        <div onClick={props.onRemoveLicenseType(props.index)} className={classes.removeBtn}>
          <RemoveIcon />
        </div>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(FormLicensePrice);