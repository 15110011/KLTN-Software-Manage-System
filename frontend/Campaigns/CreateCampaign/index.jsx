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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import { htmlToState, draftToRaw } from "../../common/utils";

import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'

// API
import {
  CAMPAIGNS_URL,
  REFRESH_TOKEN_URL,
  PACKAGES_URL,
  MARKETING_PLANS_URL,
  GET_SALE_REPS_URL,
  PRODUCTS_URL,
  CONTACT_URL,
  GROUP_URL,
  MARKETING_PLANS_CONDITIONS_URL
} from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import useFetchData from '../../CustomHook/useFetchData'
import StepDetail from './StepDetail'

const getSteps = ['Campaign Infomation', 'Marketing Plans', 'Follow-up Plans']

function CreateCampaign(props) {

  const [createCampaign, setCreateCampaign] = React.useState({
    name: '',
    packages: [],
    packagesOptions: [],
    product: {},
    start_date: '',
    end_date: '',
    assigned_to: [],
    follow_up_plan: {},
    marketing_plan: {},
    status: '',
    desc: '',
    mail_template: {},
    contacts: [],
    groups: []
  })

  const [applyConditionTable, setApplyConditionTable] = React.useState(false)

  const [marketingPlanConditions, setMarketingPlanConditions] = useFetchData(MARKETING_PLANS_CONDITIONS_URL, props.history, {})
  const [editorState, setEditorState] = React.useState(htmlToState(""))

  const [saleRep, setSaleRep] = useFetchData(GET_SALE_REPS_URL, props.history, {})

  const [error, setError] = React.useState({})

  const [activeStep, setActiveStep] = React.useState(0)

  const { user } = props;

  const handleApplyConditionTable = e => {
    e.preventDefault()
    setApplyConditionTable(true)
  }

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

  const fetchProductSuggestion = (input) => {
    if (input != '') {
      return apiGet(PRODUCTS_URL + "?product_suggest=" + input, true).then(res => {
        return res.data.suggestion.map(s => ({ label: s, value: s }))
      })
    }
  }

  const handleChangeProductSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(PRODUCTS_URL + "?name=" + value.value, true).then(res => {
        const realResult = res.data.data[0]
        apiGet(PACKAGES_URL + "?searchProduct=" + realResult.id, true).then(res => {
          setCreateCampaign({ ...createCampaign, packagesOptions: res.data.data, product: realResult })
        }
        )
      })
    }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, product: {} })
    }
  }

  const fetchMarketingPlanSuggestion = (input) => {
    return apiGet(MARKETING_PLANS_URL + "?marketing_plan_suggest=" + input, true).then(res => {
      return res.data.suggestion.map(s => ({ label: s, value: s }))
    })
  }

  const handleChangeMarketingPlanSelect = (value, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      apiGet(MARKETING_PLANS_URL + "?name=" + value.value, true).then(res => {
        const realResult = res.data.marketing_plans[0]
        setCreateCampaign({ ...createCampaign, marketing_plan: realResult })
      })
    }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, marketing_plan: {} })
    }
  }

  const fetchPackageSuggestion = (input) => {
    if (input != '') {
      return apiGet(PACKAGES_URL + "?package_suggest=" + input, true).then(res => {
        return res.data.suggestion.map(s => ({ label: s, value: s }))
      })
    }
  }

  const handleChangePackageSelectCustom = (value, action) => {
    setCreateCampaign({ ...createCampaign, packages: value })
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
        apiGet(PRODUCTS_URL + "?name=" + realResult.product.name, true).then(res => {
          const realResultProduct = res.data.data[0]
          apiGet(PACKAGES_URL + "?searchProduct=" + realResultProduct.id, true).then(res => {
            setCreateCampaign({ ...createCampaign, packagesOptions: res.data.data, product: realResultProduct, packages: clonePackage })
          }
        })
      }
    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateCampaign({ ...createCampaign, packages: value })
    }
  }

  const fetchLoadContactSuggestion = (input) => {
    return apiGet(GROUP_URL + "?group=" + input, true).then(res => {
      return res.data.data.map(s => ({ label: s.name, value: s.id, ...s }))
    })
  }

  const handleChangeLoadContactSelect = (value, action) => {
    if (action.action != 'input-blur' && action.action != 'menu-close') {
      setCreateCampaign({ ...createCampaign, groups: value })
    }
  }

  const apiPostCampaign = () => {
    apiPost(CAMPAIGNS_URL, { ...createCampaign, desc: draftToRaw(editorState) }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
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

  const { classes, createCampaignDialog, handleCloseCreateCampaignDialog } = props;

  return (
    <div>
      <BreadcrumbsItem to='/campaigns/add'>ABC</BreadcrumbsItem>
      <Dialog
        open={createCampaignDialog}
        onClose={handleCloseCreateCampaignDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateCampaignDialog}>
          Create Campaign
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <IconButton aria-label="Close" onClick={handleCloseCreateCampaignDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
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
          <div className={classes.paper}>
            <form onSubmit={handleCreateCampaign}>
              <StepDetail
                handleApplyConditionTable={handleApplyConditionTable}
                applyConditionTable={applyConditionTable}
                marketingPlanConditions={marketingPlanConditions}
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
                handleChangeProductSelect={handleChangeProductSelect}
                fetchProductSuggestion={fetchProductSuggestion}
                handleChangePackageSelectCustom={handleChangePackageSelectCustom}
                handleChangeLoadContactSelect={handleChangeLoadContactSelect}
                fetchLoadContactSuggestion={fetchLoadContactSuggestion}
              />
              <div style={{float: 'right', marginTop: '50px'}}>
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
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={this.handleClose} color="primary">
            Disagree
            </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
            </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(CreateCampaign);