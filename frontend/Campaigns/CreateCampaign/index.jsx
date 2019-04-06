import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@material-ui/icons/RemoveRedEye';
import MaterialTable from 'material-table'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import * as cn from 'classnames'

import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'

// API
import { CAMPAIGNS_URL, REFRESH_TOKEN_URL, PACKAGES_URL, MARKETING_PLANS_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const getSteps = ['Campaign Infomation', 'Marketing Plans', 'Follow-up Plans']


function getStepContent(
  step,
  classes,
  onChangeCreateCampaign,
  createCampaign,
  activeStep,
  handleChangePackageSelect,
  fetchPackageSuggestion,
  handleChangeAssigneeSelect,
  user,
  handleChangeMarketingPlanSelect,
  fetchMarketingPlanSuggestion
) {
  switch (step) {
    case 0:
      return (
        <form onSubmit={(e) => {
          onCreateCampaign(e)
        }
        }>
          <div style={{ textAlign: 'left', padding: '40px' }}>
            <Grid container spacing={40}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Campaign Info
                      </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Campaign Name
                            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      fullWidth
                      required
                      onChange={onChangeCreateCampaign}
                      value={createCampaign.name}
                      name="name"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Start Date
                            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="date"
                      fullWidth
                      required
                      onChange={onChangeCreateCampaign}
                      value={createCampaign.start_date}
                      name="start_date"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Packages
                            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <AsyncSelect
                      handleChange={(values, element) => handleChangePackageSelect(values, element)}
                      onChangeSelect={(values, element) => handleChangePackageSelect(values, element)}
                      data={
                        createCampaign.packages
                          .reduce((acc, p) => {
                            acc.push({ label: `${p.label}`, value: p.id, ...p })
                            return acc
                          }, [])
                      }
                      multi
                      placeholder=""
                      label=""
                      loadOptions={fetchPackageSuggestion}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Close Date
                            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <Input
                      type="date"
                      fullWidth
                      required
                      onChange={onChangeCreateCampaign}
                      value={createCampaign.end_date}
                      name="end_date"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Assigned to
                            </InputLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <SelectCustom
                      handleChange={(values, element) => handleChangeAssigneeSelect(values, element)}
                      name="assigned_to"
                      options={user.sale_reps.reduce((acc, u) => {
                        console.log(u)
                        acc.push(
                          {
                            label: `${u.user.username}`,
                            value: u.user.id,
                            ...u
                          }
                        )
                        return acc
                      }, [])}
                      data={
                        createCampaign.assigned_to
                          .reduce((acc, u) => {
                            acc.push({ label: `${u.user.username}`, value: u.user.id, ...u })
                            return acc
                          }, [])
                      }
                      fullWidth
                      multi
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      required
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
                        onChange={onChangeCreateCampaign}
                        value={createCampaign.status}
                        name="status"
                        native
                        inputProps={{
                          name: 'age',
                          id: 'age-native-simple',
                        }}
                      >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={40}>
                  <Grid className={classes.inputCustom} item xs={2}>
                    <InputLabel
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Description
                            </InputLabel>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      onChange={onChangeCreateCampaign}
                      value={createCampaign.desc}
                      name="desc"
                      classes={{ root: classes.fixTextArea }}
                      fullWidth
                      multiline={true}
                      rows={5}
                      rowsMax={5}
                      underline={false}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </form>
      )
    case 1:
      return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {/* {
              error[1].must && Object.keys(error[1].must).map(k => (
                <p className='text-danger'>
                  {error[1].must[k]}
                </p>
              ))
            } */}
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Plan name
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <AsyncSelect
                    handleChange={(values, element) => handleChangeMarketingPlanSelect(values, element)}
                    onChangeSelect={(values, element) => handleChangeMarketingPlanSelect(values, element)}
                    data={
                      {
                        label: `${createCampaign.marketing_plan.name}`, value: createCampaign.marketing_plan.id, ...createCampaign.marketing_plan
                      }
                    }
                    multi
                    placeholder=""
                    label=""
                    loadOptions={fetchMarketingPlanSuggestion}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton aria-label="Edit" classes={{ root: classes.fixButton }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Load contacts from
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <FormControl fullWidth className={classes.formControl}>
                    <Select
                      // value={createMarketingPlan.status}
                      // onChange={onChangeCreateProduct}
                      displayEmpty
                      // name="status"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="ACTIVE">
                        Contacts Address
                </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    All Conditions(All conditions must be met)
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Grid container spacing={24}>
                    <Grid item xs={5}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">First name</InputLabel>
                        <Select
                          // value={m.operand}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          displayEmpty
                          name="operand"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            as
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Equal to</InputLabel>
                        <Select
                          // value={m.operator}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          displayEmpty
                          name="operator"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            asd
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="standard-name"
                          label="Condition"
                          className={classes.textField}
                          // value={m.condition}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'must')}
                          name="condition"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={cn(classes.inputCustom)} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Any Conditions(At least one condition must be met)
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Grid container spacing={24}>
                    <Grid item xs={5}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">First name</InputLabel>
                        <Select
                          // value={l.operand}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          displayEmpty
                          name="operand"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            as
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Equal to</InputLabel>
                        <Select
                          // value={l.operator}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          displayEmpty
                          name="operator"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            asd
                </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl fullWidth className={classes.formControl}>
                        <TextField
                          id="standard-name"
                          label="Condition"
                          className={classes.textField}
                          // value={l.condition}
                          // onChange={(e) => onChangeCreateMarketingPlan(e, i, 'at_least')}
                          name="condition"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Actions
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <SelectCustom
                    // options={"asdsa"}
                    // handleChange={(values, element) => handleChangeSelect(values, element)}
                    // data={

                    // }
                    multi
                    placeholder=""
                    label=""
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Choose Email Template
                    </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Email Template</InputLabel>
                    <Select
                      // value={this.state.age}
                      // onChange={this.handleChange}
                      inputProps={{
                        name: 'age',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <IconButton aria-label="Preview" classes={{ root: classes.fixButton }}>
                    <PreviewIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="mt-5" item xs={12}>
              <Divider />
              <Grid container spacing={24}>
                <Grid item xs={12} style={{ marginTop: '20px' }}>
                  <Button variant="contained" color="primary">Apply</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid classes={{ container: classes.fixTable }} container spacing={24} className="mt-4">
            <Grid item xs={12}>
              <MaterialTable
                columns={[
                  { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
                  { title: 'Name', field: 'name' },
                  { title: 'Description', field: 'description' },
                  {
                    title: 'Status',
                    field: 'status',
                    lookup: { 'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE' }
                  },
                ]}
                // data={products.data.map(
                //   (product, index) => ({
                //     numeral: index + 1,
                //     name: product.name,
                //     description: product.desc,
                //     status: product.status
                //   })
                // )}
                title="Campaign List"
                actions={[
                  {
                    icon: 'done_all',
                    tooltip: 'Do',
                    onClick: (event, rows) => {
                      alert('You selected ' + rows.length + ' rows')
                    },
                  },
                ]}
                options={{
                  selection: true,
                  filtering: true,
                  paging: true
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      )
    case 2:
      return (
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <div className={cn(classes.stepper)}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {/* {followUpPlan.steps.map((label, index) => (
                <Step key={'steplabel' + index}>
                  <StepLabel onClick={() => setActiveStep(index)}
                    style={{ cursor: 'pointer' }}
                  >Step {index + 1}</StepLabel>
                </Step>
              ))} */}
                <Step>
                  <StepLabel>
                    aa
                </StepLabel>
                </Step>
              </Stepper>
            </div>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={24}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  required
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Plan name
            </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <Input
                  fullWidth
                  required
                  // onChange={onChangeCreatePlan}
                  // value={followUpPlan.name}
                  name="name"
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={40}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  required
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Action
            </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth className={classes.formControl}>
                  <SelectCustom
                    // options={actions.actions.map((g, i) => ({
                    //   label: `${g}`,
                    //   value: `${g}`,
                    // }))}
                    // handleChange={(values, element) => handleChangeSelect(values, element)}
                    // data={
                    //   createStep.actions
                    //     .reduce((acc, g) => {
                    //       acc.push({ label: `${g.label}`, value: g.value })
                    //       return acc
                    //     }, [])
                    // }
                    multi
                    placeholder=""
                    label=""
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={40}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Duration (days)
            </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <Input
                  fullWidth
                  required
                  // onChange={onChangeCreateSteps}
                  // value={createStep.duration}
                  type="number"
                  name="duration"
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={40}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  required
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Required Fields
            </InputLabel>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={40}>
                  <Grid item xs={5}>
                    <Input
                      fullWidth
                      required
                      // onChange={onChangeCreateProduct}
                      // value={createProduct.desc}
                      name="desc"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        // value={createProduct.status}
                        // onChange={onChangeCreateProduct}
                        displayEmpty
                        name="status"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="text">
                          Text Field
                </MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="check_box">
                          Check Box
                </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <Input
                      fullWidth
                      required
                      // onChange={onChangeCreateProduct}
                      // value={createProduct.desc}
                      name="desc"
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    default:
      return 'Unknown step';
  }
}

function CreateCampaign(props) {

  const [createCampaign, setCreateCampaign] = React.useState({
    name: '',
    packages: [],
    start_date: '',
    end_date: '',
    assigned_to: [],
    follow_up_plan: {},
    marketing_plan: {},
    status: '',
    desc: '',
    mail_template: {}
  })

  const [error, setError] = React.useState({})

  const [activeStep, setActiveStep] = React.useState(0)

  const { user } = props;

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  };

  const handleReset = () => {
    setActiveStep(0)
  };

  const handleChangeAssigneeSelect = (value, action) => {
    setCreateCampaign({ ...createCampaign, assigned_to: value })
  }

  const handleCreateCampaign = e => {
    e.preventDefault()
    apiPostCampaign()
  }

  const fetchMarketingPlanSuggestion = (input) => {
    return apiGet(MARKETING_PLANS_URL + "?marketing_plan_suggest=" + input, true).then(res => {
      return res.data.suggestions.map(s => ({ label: s, value: s }))
    })
  }

  const handleChangeMarketingPlanSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(MARKETING_PLANS_URL + "?name=" + action.option.value, true).then(res => {
        const realResult = res.data.marketing_plan[0]
        setCreateCampaign({ ...createCampaign, marketing_plan: realResult })
      })
    }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, packages: value })
    }
  }

  const fetchPackageSuggestion = (input) => {
    return apiGet(PACKAGES_URL + "?package_suggest=" + input, true).then(res => {
      return res.data.suggestions.map(s => ({ label: s, value: s }))
    })
  }

  const handleChangePackageSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(PACKAGES_URL + "?package_suggest=" + action.option.value, true).then(res => {
        const clonePackage = [].concat(createCampaign.packages)
        const realResult = res.data.packages.find(p => {
          return p.name == action.option.value
        })
        clonePackage.push({
          ...realResult,
          label: realResult.name,
          value: realResult.id
        })
        setCreateCampaign({ ...createCampaign, packages: clonePackage })
      })
    }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, packages: value })
    }
  }

  const apiPostCampaign = () => {
    apiPost(CAMPAIGNS_URL, createCampaign, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostCampaign()
              // notification()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        // else {
        //   notification()
        // }
      })
  }

  const onChangeCreateCampaign = e => {
    setCreateCampaign({ ...createCampaign, [e.target.name]: e.target.value })
  }

  const { classes } = props;

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/campaigns/add'>ABC</BreadcrumbsItem>
      <Stepper activeStep={activeStep} alternativeLabel>
        {getSteps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              onClick={() => { setActiveStep(index) }}
              style={{ cursor: 'pointer' }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <form onSubmit={handleCreateCampaign}>
          <Paper className={classes.paper}>
            {
              getStepContent(
                activeStep,
                classes,
                onChangeCreateCampaign,
                createCampaign,
                activeStep,
                handleChangePackageSelect,
                fetchPackageSuggestion,
                handleChangeAssigneeSelect,
                user,
                handleChangeMarketingPlanSelect,
                fetchMarketingPlanSuggestion
              )
            }
            <div style={{ marginTop: '140px' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                variant="outlined"
              >
                Back
                </Button>
              {' '}
              <Button hidden={activeStep === 2} variant="contained" color="primary" onClick={handleNext}>
                Next
            </Button>
              {
                activeStep === getSteps.length - 1 &&
                (
                  <Button variant="contained" color="primary" type="submit">Create</Button>
                )
              }
            </div>
          </Paper>
        </form>
      </div>
    </div>
  )
}

export default withStyles(styles)(CreateCampaign);