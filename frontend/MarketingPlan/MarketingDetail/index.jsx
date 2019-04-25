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
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import CustomSnackbar from '../../components/CustomSnackbar'

import stateHashes from '../../common/StateHash'
import SelectCustom from '../../components/SelectCustom'
import styles from './MarketingDetailStyle'
// Hooks
import useFetchData from '../../CustomHook/useFetchData'
import { MARKETING_PLANS_URL, MARKETING_PLANS_CONDITIONS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost, apiPatch } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function MarketingPlanDetail(props) {
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const marketingPlanId = props.match.params.id
  const [marketingPlanConditions, setMarketingPlanConditions] = useFetchData(MARKETING_PLANS_CONDITIONS_URL, props.history, {})
  const [marketingPlanDetail, setMarketingPlanDetail, setUrl, forceUpdate] =
    useFetchData(MARKETING_PLANS_URL + '/' + marketingPlanId, props.history, {
      name: '',
      condition: {
        must: [],
      },
      actions: [],
      manager: ''
    })
  const [titleStt, setTitleStt] = React.useState('VIEW')
  const [value, setValue] = React.useState(0)
  const [cloneDetail, setCloneDetail] = React.useState({})


  const { classes } = props;

  const handleChange = (event, value) => {
    setValue(value)
  };

  const handleChangeSelectAddress = (value, element, index) => {
    const cloneUpdateMarketingPlan = { ...marketingPlanDetail }
    if (value) {
      cloneUpdateMarketingPlan.condition.must[index][element.name] = value.value
    }
    else {
      cloneUpdateMarketingPlan.condition.must[index][element.name] = ''
    }
    setMarketingPlanDetail({ ...cloneUpdateMarketingPlan })
  }

  const onChangeUpdateMarketingPlan = (e, index, conditionType) => {
    if (e.target.name == 'name') {
      setMarketingPlanDetail({ ...marketingPlanDetail, [e.target.name]: e.target.value })
    } else {
      if (conditionType == 'must') {
        const must = marketingPlanDetail.condition.must.concat([])
        must[index][e.target.name] = e.target.value
        setMarketingPlanDetail({ ...marketingPlanDetail, condition: { ...marketingPlanDetail.condition, must } })
      } else {
        const at_least = marketingPlanDetail.condition.at_least.concat([])
        at_least[index][e.target.name] = e.target.value
        setMarketingPlanDetail({ ...marketingPlanDetail, condition: { ...marketingPlanDetail.condition, at_least } })
      }
    }
  }

  const handleChangeActionTypeSelect = (value, action) => {
    setMarketingPlanDetail({ ...marketingPlanDetail, actions: value.map(v => v.value) })
  }

  const notification = () => {
    setCompleteNotice('Successfully Updated')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
  }

  const handleSavePlanDetail = () => {
    apiPatch(MARKETING_PLANS_URL + '/' + marketingPlanId, { ...marketingPlanDetail }, false, true)
      .then(json => {
        if (json.data) return notification()
      })
  }

  const onChangeCloneInput = (e) => {
    setCloneDetail({ ...cloneDetail, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    if (cloneDetail.name == marketingPlanDetail.name && cloneDetail.name != '')
      handleSavePlanDetail()
  }, [marketingPlanDetail.name])


  return (
    <div lassName={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <BreadcrumbsItem to={`/marketing-plans/ + ${marketingPlanId}`}>{marketingPlanDetail.name}</BreadcrumbsItem>
      <div className={classes.paper}>
        <Grid container spacing={8} style={{ margin: 'unset' }}>
          <div className={classes.wrapAvatar}>
            <div className={classes.productAvatar}>
              <CategoryIcon />
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
              <li><span style={{ color: '#616161' }}>Category</span></li>
              {titleStt == 'VIEW' &&
                <li>
                  <p style={{ fontSize: '16px' }}>{marketingPlanDetail.name}
                    <IconButton onClick={() => {
                      setCloneDetail({ ...marketingPlanDetail })
                      setTitleStt('EDIT')
                    }} >
                      <EditIcon style={{ fontSize: '18px' }} />
                    </IconButton>
                  </p>
                </li>}
              {titleStt == 'EDIT' &&
                <li>
                  <TextField
                    name='name'
                    onChange={onChangeCloneInput}
                    value={cloneDetail.name}
                    style={{ fontSize: '16px' }}
                  />
                  <Tooltip title='Discard Change'>
                    <IconButton onClick={() => setTitleStt('VIEW')} >
                      <CloseIcon style={{ fontSize: '18px' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Apply Change'>
                    <IconButton onClick={() => {
                      setMarketingPlanDetail({ ...marketingPlanDetail, name: cloneDetail.name })
                      setTitleStt('VIEW')
                    }} >
                      <DoneIcon style={{ fontSize: '18px' }} />
                    </IconButton>
                  </Tooltip>
                </li>
              }
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
                        onChange={onChangeUpdateMarketingPlan}
                        value={marketingPlanDetail.name}
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
                        Types
                    </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <SelectCustom
                        handleChange={(values, element) => handleChangeActionTypeSelect(values, element)}
                        name="actions"
                        options={['Send Email', 'Call Client', 'Send Email Manually'].reduce((acc, a) => {
                          acc.push(
                            {
                              label: a,
                              value: a
                            }
                          )
                          return acc
                        }, [])}
                        data={
                          marketingPlanDetail.actions
                            .reduce((acc, a) => {
                              acc.push({ label: a, value: a })
                              return acc
                            }, [])
                        }
                        fullWidth
                        multi
                      />
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
                      <Grid item xs={8}>
                        {
                          marketingPlanDetail.condition.must.map((m, i) => {
                            console.log(m)
                            return (
                              <Grid key={i} container spacing={24}>
                                <Grid item xs={4}>
                                  <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Operands</InputLabel>
                                    <Select
                                      value={m.operand}
                                      onChange={(e) => onChangeUpdateMarketingPlan(e, i, 'must')}
                                      displayEmpty
                                      name="operand"
                                      className={classes.selectEmpty}
                                    >
                                      {
                                        Object.values(marketingPlanConditions).map(c => {
                                          return (
                                            <MenuItem value={c.id}>
                                              {c.name}
                                            </MenuItem>
                                          )
                                        })
                                      }
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                  <FormControl fullWidth className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Operators</InputLabel>
                                    <Select
                                      value={m.operator}
                                      onChange={(e) => onChangeUpdateMarketingPlan(e, i, 'must')}
                                      displayEmpty
                                      name="operator"
                                      className={classes.selectEmpty}
                                    >
                                      {
                                        marketingPlanConditions[m.operand] && marketingPlanConditions[m.operand].operators.map(o => {
                                          return (
                                            <MenuItem value={o}>
                                              {o}
                                            </MenuItem>
                                          )
                                        })
                                      }
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4} style={{ position: 'relative' }}>
                                  {
                                    m.operand != '1' ?
                                      <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                          id="standard-name"
                                          label="Data"
                                          className={classes.textField}
                                          value={m.data}
                                          onChange={(e) => onChangeUpdateMarketingPlan(e, i, 'must')}
                                          name="data"
                                          type="number"
                                        />
                                      </FormControl>
                                      :
                                      <FormControl fullWidth style={{ position: 'absolute', bottom: '13px' }} className={classes.formControl}>
                                        <SelectCustom
                                          className={classes.stateCustomInput}
                                          options={
                                            Object.keys(stateHashes).map(k => {
                                              return {
                                                label: stateHashes[k],
                                                value: k
                                              }
                                            })
                                          }
                                          handleChange={(v, a) => handleChangeSelectAddress(v, a, i)}
                                          value={m.data}
                                          name="data"
                                          fullWidth
                                          label="Data"
                                          single
                                          data={{
                                            label: stateHashes[m.data],
                                            value: m.data
                                          }}
                                        />
                                      </FormControl>
                                  }
                                </Grid>
                              </Grid>
                            )
                          })
                        }
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item xs={12} className="d-flex justify-content-center mt-3">
                          <Button onClick={forceUpdate} variant="contained" className={classes.button}>
                            RESET
                        </Button>&nbsp;&nbsp;
                        <Button onClick={handleSavePlanDetail} variant="contained" color="primary" className={classes.button}>
                            SAVE
                        </Button>
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