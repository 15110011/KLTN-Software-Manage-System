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
import { htmlToState, draftToRaw } from "../../common/utils";

import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'

// API
import { CAMPAIGNS_URL, REFRESH_TOKEN_URL, PACKAGES_URL, MARKETING_PLANS_URL, GET_SALE_REPS_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import useFetchData from '../../CustomHook/useFetchData'
import StepDetail from './StepDetail'

const getSteps = ['Campaign Infomation', 'Marketing Plans', 'Follow-up Plans']

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

  const [editorState, setEditorState] = React.useState(htmlToState(""))
  const [saleRep, setSaleRep] = useFetchData(GET_SALE_REPS_URL, props.history, {})

  const [error, setError] = React.useState({})

  const [activeStep, setActiveStep] = React.useState(0)

  const { user } = props;

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1)
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
      return res.data.suggestion.map(s => ({ label: s, value: s }))
    })
  }

  const handleChangeMarketingPlanSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(MARKETING_PLANS_URL + "?name=" + action.option.value, true).then(res => {
        const realResult = res.data.marketing_plans[0]
        setCreateCampaign({ ...createCampaign, marketing_plan: realResult })
      })
    }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, packages: value })
    }
  }

  const fetchPackageSuggestion = (input) => {
    return apiGet(PACKAGES_URL + "?package_suggest=" + input, true).then(res => {
      return res.data.suggestion.map(s => ({ label: s, value: s }))
    })
  }

  const handleChangePackageSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(PACKAGES_URL + "?name=" + action.option.value, true).then(res => {
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
    apiPost(CAMPAIGNS_URL, { ...createCampaign, desc: draftToRaw(editorState) }, false, true)
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
        else {
          notification()
        }
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
            <StepDetail
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              activeStep={activeStep}
              saleRep={saleRep}
              classes={classes}
              onChangeCreateCampaign={onChangeCreateCampaign}
              createCampaign={createCampaign}
              handleChangePackageSelect={handleChangePackageSelect}
              fetchPackageSuggestion={fetchPackageSuggestion}
              handleChangeAssigneeSelect={handleChangeAssigneeSelect}
              user={user}
              handleChangeMarketingPlanSelect={handleChangeMarketingPlanSelect}
              fetchMarketingPlanSuggestion={fetchMarketingPlanSuggestion}
            />
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