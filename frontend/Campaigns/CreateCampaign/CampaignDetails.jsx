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

function CampaignDetails(props) {
  const {
    classes,
    onChangeCreateCampaign,
    createCampaign,
    handleChangePackageSelect,
    fetchPackageSuggestion,
    handleChangeAssigneeSelect,
    user,
    saleRep
  } = props
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
                  options={saleRep.saleRep && saleRep.sale_reps.reduce((acc, u) => {
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
}
export default CampaignDetails