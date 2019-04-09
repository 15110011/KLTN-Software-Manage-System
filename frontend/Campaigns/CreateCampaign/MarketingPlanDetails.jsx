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

function MarketingPlanDetails(props) {
  const {
    classes,
    createCampaign,
    handleChangeMarketingPlanSelect,
    fetchMarketingPlanSuggestion,
    onChangeCreateCampaign
  } = props
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
}
export default MarketingPlanDetails