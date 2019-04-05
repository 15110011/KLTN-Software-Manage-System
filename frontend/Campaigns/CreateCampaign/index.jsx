import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
import * as cn from 'classnames'

import styles from './CreateCampaignStyle'

// Components 
import SelectCustom from '../../components/SelectCustom'


// API
import { CAMPAIGN_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
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

function CreateCampaign(props) {

  const [createCampaign, setCreateCampaign] = React.useState({
    name: '',
    start_date: '',
    end_date: '',
    packages: [],
    follow_up_plan: '',
    marketing_plan: '',
    manager: '',
    assigned_to: [],
    status: '',
    desc: ''
  })
  const [error, setError] = React.useState({})


  const onCreateCampaign = e => {
    e.preventDefault()
    apiPostCampaign()
  }

  const apiPostCampaign = () => {
    apiPost(CAMPAIGN_URL, false, true)
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
      <Grid container spacing={8}>
        <Paper className={classes.paper}>
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
                        Follow-up Plan
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <SelectCustom
                        onChange={onChangeCreateCampaign}
                        value={createCampaign.follow_up_plan}
                        name="follow_up_plan"
                        fullWidth
                        single
                        label=""
                        placeholder=""
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
                        Marketing Plan
                            </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <SelectCustom
                        onChange={onChangeCreateCampaign}
                        value={createCampaign.marketing_plan}
                        name="marketing_plan"
                        fullWidth
                        multi
                        label=""
                        placeholder=""
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
                        onChange={onChangeCreateCampaign}
                        value={createCampaign.assigned_to}
                        name="assigned_to"
                        fullWidth
                        multi
                        label=""
                        placeholder=""
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
                      <SelectCustom
                        onChange={onChangeCreateCampaign}
                        value={createCampaign.packages}
                        name="packages"
                        fullWidth
                        multi
                        label=""
                        placeholder=""
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
                <Grid className="d-flex justify-content-center" item xs={12}>
                  <Button
                    onClick={(e) => { onCreateCampaign(e) }}
                  >ADD
                    </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CreateCampaign);