import * as React from 'react'
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import CustomSnackbar from '../../components/CustomSnackbar'

import styles from './MarketingDetailStyle'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function MarketingPlanDetail(props) {

  const [createMarketingPlan, setCreateMarketingPlan] = React.useState({
    name: '',
    condition: {
      must: [],
    },
    actions: [],
    manager: ''
  })
  const [value, setValue] = React.useState(0)

  const { classes } = props;

  const handleChange = (event, value) => {
    setValue(value)
  };

  const onChangeCreateMarketingPlan = (e, index, conditionType) => {
    if (e.target.name == 'name') {
      setCreateMarketingPlan({ ...createMarketingPlan, [e.target.name]: e.target.value })
    } else {
      if (conditionType == 'must') {
        const must = createMarketingPlan.condition.must.concat([])
        must[index][e.target.name] = e.target.value
        setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, must } })
      } else {
        const at_least = createMarketingPlan.condition.at_least.concat([])
        at_least[index][e.target.name] = e.target.value
        setCreateMarketingPlan({ ...createMarketingPlan, condition: { ...createMarketingPlan.condition, at_least } })
      }
    }
  }


  return (
    <div lassName={classes.root}>
      <div className={classes.paper}>
        <Grid container spacing={8} style={{ margin: 'unset' }}>
          <div className={classes.wrapAvatar}>
            <div className={classes.productAvatar}>
              <CategoryIcon />
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
              <li><span style={{ color: '#616161' }}>Category</span></li>
              <li><p style={{ fontSize: '16px' }}>ABC</p></li>
            </ul>
          </div>
        </Grid>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Category Detail" />
            {/* <Tab label="Item Two" />
          <Tab label="Item Three" /> */}
          </Tabs>
        </AppBar>
        <div style={{ textAlign: 'left' }}>
          {value === 0 &&
            <TabContainer>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustomName} item xs={4}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Marketing Plan Name
                  </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        onChange={onChangeCreateMarketingPlan}
                        value={createMarketingPlan.name}
                        name="name"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={4}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Status
                          </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl fullWidth className={classes.formControl}>
                        <Select
                          // value={createCategory.status}
                          // onChange={onChangeCreateCategory}
                          // name="status"
                          displayEmpty
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            ACTIVE
                            </MenuItem>
                          <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={24}>
                    <Grid item xs={2}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Conditions
                          </InputLabel>
                      </Grid>
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container spacing={24}>
                        <Grid item xs={5}>
                          <Tooltip aria-label="Add">
                            <FormControl fullWidth className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Operands</InputLabel>
                              <Select
                                // value={m.operand}
                                name="operand"
                                className={classes.selectEmpty}
                                disabled
                              >
                                {/* {
                              Object.values(marketingPlanConditions).map(c => {
                                return (
                                  <MenuItem key={c.name} value={c.id}>
                                    {c.name}
                                  </MenuItem>
                                )
                              })
                            } */}
                              </Select>
                            </FormControl>
                          </Tooltip>
                        </Grid>
                        <Grid item xs={5}>
                          <Tooltip aria-label="Add">
                            <FormControl fullWidth className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Operators</InputLabel>
                              <Select
                                // value={m.operator}
                                disabled
                                name="operator"
                                className={classes.selectEmpty}
                              >
                                {/* <MenuItem value={m.operator}>
                              {m.operator}
                            </MenuItem> */}
                              </Select>
                            </FormControl>
                          </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Data</InputLabel>
                            <Select
                              // value={m.data}
                              displayEmpty
                              name="operator"
                              disabled
                              className={classes.selectEmpty}
                            >
                              {/* <MenuItem value={m.data}>
                            {m.data}
                          </MenuItem> */}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabContainer>}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(MarketingPlanDetail);