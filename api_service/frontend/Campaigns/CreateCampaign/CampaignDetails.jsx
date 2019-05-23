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
import * as DateFnsUtils from '@date-io/date-fns';
import { Editor } from "react-draft-wysiwyg";
import "../../common/react-draft-wysiwyg.css";
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';

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
    editorState,
    onEditorStateChange,
    saleRep,
    handleChangeProductSelect,
    fetchProductSuggestion,
    handleChangePackageSelectCustom,
    startDate,
    endDate,
    setStartDate,
    setEndDate
  } = props
  return (
    <form onSubmit={(e) => {
      onCreateCampaign(e)
    }
    }>
      <div style={{ textAlign: 'left', padding: '40px' }}>
        <Grid container spacing={40}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Campaign Info
                  </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={40}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    required
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    Name
                        </InputLabel>
                </Grid>
                <Grid item xs={10}>
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
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    Start Date
                        </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <DateTimePicker
                    onChange={setStartDate}
                    name="startDate"
                    minDate={new Date()}
                    format="MM/dd/yyyy hh:mm a" 
                    value={startDate}
                    required
                    fullWidth
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
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    End Date
                        </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <DateTimePicker
                    onChange={setEndDate}
                    name="endDate"
                    minDate={new Date()}
                    format="MM/dd/yyyy hh:mm a" 
                    value={endDate}
                    required
                    fullWidth
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
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    Product
                        </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <AsyncSelect
                    handleChange={(values, element) => handleChangeProductSelect(values, element)}
                    onChangeSelect={(values, element) => handleChangeProductSelect(values, element)}
                    data={
                      createCampaign.product.name && { label: `${createCampaign.product.name}`, value: createCampaign.product.id, ...createCampaign.product }
                    }
                    single
                    placeholder=""
                    label=""
                    loadOptions={fetchProductSuggestion}
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
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    Packages
                        </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  {
                    !createCampaign.product.id ?
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
                      /> :
                      <SelectCustom
                        handleChange={(values, element) => handleChangePackageSelectCustom(values, element)}
                        name="packages"
                        options={createCampaign.packagesOptions.reduce((acc, p) => {
                          acc.push(
                            {
                              label: `${p.name}`,
                              value: p.id,
                              ...p
                            }
                          )
                          return acc
                        }, [])}
                        data={
                          createCampaign.packages
                            .reduce((acc, p) => {
                              acc.push({ label: `${p.name}`, value: p.id, ...p })
                              return acc
                            }, [])
                        }
                        fullWidth
                        multi
                      />
                  }

                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={40}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabelBot,
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
                    options={user.sale_reps && user.sale_reps.reduce((acc, u) => {
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
            {/* <Grid item xs={6}>
            <Grid container spacing={40}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  required
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabelBot,
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
                  >
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid> */}
            <Grid item xs={12}>
              <Grid container spacing={40}>
                <Grid item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabelBot,
                      focused: classes.cssFocused,
                    }}
                  >
                    Description
                        </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor"
                    onEditorStateChange={onEditorStateChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </div>
    </form>
  )
}
export default withStyles(styles)(CampaignDetails);