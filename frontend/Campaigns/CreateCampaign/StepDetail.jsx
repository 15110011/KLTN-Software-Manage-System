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
import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'
import * as cn from 'classnames'
import CampaignDetails from './CampaignDetails'
import MarketingPlanDetails from './MarketingPlanDetails'
import FollowUpPlanDetails from './FollowUpPlanDetails'

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


function getStepContent(props) {
  const {
    activeStep,
    classes,
    onChangeCreateCampaign,
    createCampaign,
    handleChangePackageSelect,
    fetchPackageSuggestion,
    handleChangeAssigneeSelect,
    user,
    handleChangeMarketingPlanSelect,
    fetchMarketingPlanSuggestion
  } = props
  switch (activeStep) {
    case 0:
      return (
        <CampaignDetails
          classes={classes}
          onChangeCreateCampaign={onChangeCreateCampaign}
          createCampaign={createCampaign}
          handleChangePackageSelect={handleChangePackageSelect}
          fetchPackageSuggestion={fetchPackageSuggestion}
          handleChangeAssigneeSelect={handleChangeAssigneeSelect}
          user={user}
        />
      )
    case 1:
      return (
        <MarketingPlanDetails
          classes={classes}
          onChangeCreateCampaign={onChangeCreateCampaign}
          createCampaign={createCampaign}
          handleChangeMarketingPlanSelect={handleChangeMarketingPlanSelect}
          fetchMarketingPlanSuggestion={fetchMarketingPlanSuggestion}
        />
      )
    case 2:
      return (
        <FollowUpPlanDetails
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
      )
    default:
      return 'Unknown step';
  }
}

export default getStepContent