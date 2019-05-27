import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/Remove'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField'

import styles from './FormLicensePriceStyle'
import NumberFormatCustom from '../../../components/NumberFormatCustom'

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

  const { classes, price, months } = props;



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
              value={price.month}
              onChange={e=>props.onInputChange(e,price.month)}
              input={
                <OutlinedInput
                  labelWidth={addBtn.labelWidth}
                  name="month"
                  id="outlined-age-simple"
                />
              }
            >
            {months}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            label="Price"
            name='value'
            value={price.value}
            onChange={e=>props.onInputChange(e,price.month)}
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
            fullWidth
            className={classes.input}
          />
        </Grid>
        <div onClick={() => props.onRemoveLicenseType()} className={classes.removeBtn}>
          <RemoveIcon />
        </div>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(FormLicensePrice);