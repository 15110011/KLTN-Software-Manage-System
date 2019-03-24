import * as React from 'react'
import ReactDOM from 'react-dom';

import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import styles from './ProductDetailStyle'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


function ProductDetail(props) {
  const { classes, theme } = props;
  const [value, setValue] = React.useState(0)
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: '0'
  })
  const [search, setSearch] = React.useState('')
  const [month, setMonth] = React.useState('')

  const handleChangeMonth = month => e => {
    setMonth(e.target.value)
  }

  const handleChangeSearch = search => e => {
    setSearch(e.target.value);
  };

  let InputLabelRef = ''

  const handleChange = e => {
    setAddBtn({ [e.target.name]: e.target.value });
  }

  // React.useEffect(() => {
  //   setAddBtn(
  //     ReactDOM.findDOMNode(InputLabelRef).offsetWidth
  //   );
  // },[])

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/products/:id'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <ProductIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Product</span></li>
                  <li><p style={{ fontSize: '16px' }}>Product ABC</p></li>
                </ul>
              </div>
            </Grid>
            <AppBar position="static" className={classes.bgrMenuTab}>
              <Tabs value={value}
                onChange={(e, value) => {
                  setValue(value)
                }}
                classes={{ indicator: classes.tabSelected }}
              >

                <Tab label={<span><DetailIcon />&nbsp;Product Detail</span>} />
                <Tab label={<span><ProductIcon /> Tab 2</span>} />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left' }}>
              {value === 0 &&
                <TabContainer>
                  <Grid container>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Product Name:
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={'mt-3'}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Product Active:
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={'mt-3'}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Sales Start Date:
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        type="date"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={'mt-3'}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Support Start Date:
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        type="date"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <MaterialTable
                    columns={[
                      { title: 'Actions', field: 'actions' },
                      { title: 'Package Name', field: 'packageName' },
                      { title: 'Sell Price', field: 'sellPrice' },
                      {
                        title: 'Notes', field: 'notes',
                      },
                    ]}
                    data={[
                      {
                        actions:
                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                              ref={ref => {
                                InputLabelRef = ref;
                              }}
                              htmlFor="outlined-age-simple"
                            >
                              Add
                          </InputLabel>
                            <Select
                              value={addBtn.add}
                              onChange={handleChange}
                              input={
                                <OutlinedInput
                                  labelWidth={addBtn.labelWidth}
                                  name="age"
                                  id="outlined-age-simple"
                                />
                              }
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        ,
                        packageName:
                          <form className={classes.container} noValidate autoComplete="off">
                            <Grid container>
                              <Grid item xs={12}>
                                <TextField
                                  id="standard-select-currency-native"
                                  select
                                  label="Search"
                                  className={classes.textField}
                                  value={search}
                                  onChange={handleChangeSearch}
                                  SelectProps={{
                                    native: true,
                                    MenuProps: {
                                      className: classes.menu,
                                    },
                                  }}
                                  helperText=""
                                  margin="normal"
                                >
                                </TextField>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                  <InputLabel
                                    ref={ref => {
                                      InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                  >
                                    Add Feature
                                  </InputLabel>
                                  <Select
                                    className={classes.formFeature}
                                    value={addBtn.add}
                                    onChange={handleChange}
                                    input={
                                      <OutlinedInput
                                        labelWidth={addBtn.labelWidth}
                                        name="age"
                                        id="outlined-age-simple"
                                      />
                                    }
                                  >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </form>
                        ,
                        sellPrice:
                          <FormControl variant="outlined" className={classes.formControl}>
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
                        ,
                        notes:
                          <Input
                            defaultValue="Notes"
                            className={classes.input}
                            inputProps={{
                              'aria-label': 'Description',
                            }}
                          />

                      },
                      { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                    ]}
                    title="Basic"
                    options={{
                      toolbar: false,
                      paging: false,
                    }}
                  />
                  <Grid container>
                    <Grid item xs={12} className="d-flex justify-content-center mt-3">
                      <Button variant="contained" className={classes.button}>
                        CANCEL
                      </Button>&nbsp;&nbsp;
                      <Button variant="contained" color="primary" className={classes.button}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {value === 1 && <TabContainer>Item Two</TabContainer>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(ProductDetail);