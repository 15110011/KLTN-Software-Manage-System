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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
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
    onChangeCreateCampaign,
    marketingPlanConditions,
    fetchLoadContactSuggestion,
    handleChangeLoadContactSelect,
    handleApplyConditionTable,
    applyConditionTable,
    deleteExceptionContacts
  } = props
  return (
    <Grid container spacing={24}>
      {/* <Grid item xs={12}>
        {
              error[1].must && Object.keys(error[1].must).map(k => (
                <p className='text-danger'>
                  {error[1].must[k]}
                </p>
              ))
            }
      </Grid> */}
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
                Marketing plan name
                    </InputLabel>
            </Grid>
            <Grid item xs={7}>
              <AsyncSelect
                handleChange={(values, element) => handleChangeMarketingPlanSelect(values, element)}
                onChangeSelect={(values, element) => handleChangeMarketingPlanSelect(values, element)}
                data={
                  Object.keys(createCampaign.marketing_plan).length === 0 ? '' :
                    {
                      label: `${createCampaign.marketing_plan.name}`, value: createCampaign.marketing_plan.id, ...createCampaign.marketing_plan
                    }
                }
                single
                placeholder=""
                label=""
                loadOptions={fetchMarketingPlanSuggestion}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="Edit" classes={{ root: classes.fixButton }}>
                <EditIcon style={{ fontSize: '16px' }} />
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
                Contacts from groups
                    </InputLabel>
            </Grid>
            <Grid item xs={7}>
              <FormControl fullWidth className={classes.formControl}>
                <AsyncSelect
                  handleChange={(values, element) => handleChangeLoadContactSelect(values, element)}
                  onChangeSelect={(values, element) => handleChangeLoadContactSelect(values, element)}
                  data={
                    createCampaign.groups.reduce((acc, g) => {
                      acc.push({ label: g.name, value: g.id, ...g })
                      return acc
                    }, [])
                  }
                  multi
                  placeholder=""
                  label=""
                  loadOptions={fetchLoadContactSuggestion}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {
            createCampaign.marketing_plan.condition &&
            createCampaign.marketing_plan.condition.must.map((m, i) => {
              return (
                <>
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
                          <Tooltip title={marketingPlanConditions[m.operand].name} aria-label="Add">
                            <FormControl fullWidth className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Operands</InputLabel>
                              <Select
                                value={m.operand}
                                name="operand"
                                className={classes.selectEmpty}
                                disabled
                              >
                                {
                                  Object.values(marketingPlanConditions).map(c => {
                                    return (
                                      <MenuItem key={c.name} value={c.id}>
                                        {c.name}
                                      </MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </FormControl>
                          </Tooltip>
                        </Grid>
                        <Grid item xs={5}>
                          <Tooltip title={m.operator} aria-label="Add">
                            <FormControl fullWidth className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Operators</InputLabel>
                              <Select
                                value={m.operator}
                                disabled
                                name="operator"
                                className={classes.selectEmpty}
                              >
                                <MenuItem value={m.operator}>
                                  {m.operator}
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Tooltip>
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Data</InputLabel>
                            <Select
                              value={m.data}
                              displayEmpty
                              name="operator"
                              disabled
                              className={classes.selectEmpty}
                            >
                              <MenuItem value={m.data}>
                                {m.data}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                  </Grid>
                </>
              )
            })
          }
        </Grid>
        {
          createCampaign.marketing_plan.actions &&
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
                <Input value={createCampaign.marketing_plan.actions.reduce((acc, a) => {
                  acc += a + ', '
                  return acc
                }, '').slice(0, -2)} fullWidth
                  disabled
                ></Input>
              </Grid>
            </Grid>
          </Grid>
        }
        {createCampaign.marketing_plan.actions && createCampaign.marketing_plan.actions.findIndex(a => a == 'Send Email') != -1 && <Grid item xs={10}>
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
        </Grid>}

        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Button onClick={(e) => handleApplyConditionTable(e)} variant="contained" color="primary">Filter</Button>
            </Grid>
          </Grid>
        </Grid>
        {
          applyConditionTable == true &&
          <Grid classes={{ container: classes.fixTable }} container spacing={24} className="mt-4">
            <Divider />
            <Grid item xs={12}>
              <MaterialTable
                columns={[
                  { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
                  { title: 'First Name', field: 'fname' },
                  { title: 'Last Name', field: 'lname' },
                  { title: 'Email', field: 'email' },
                  { title: 'Phone', field: 'phone' },
                  { title: 'Orgnization', field: 'org' },
                ]}
                data={createCampaign.contacts.map(
                  (c, index) => ({
                    numeral: index + 1,
                    fname: c.first_name,
                    lname: c.last_name,
                    email: c.mail,
                    phone: c.phone,
                    org: c.org,
                    id: c.id
                  })
                )}
                title="Contacts List"
                actions={[
                  {
                    icon: 'delete',
                    tooltip: 'Do',
                    onClick: (event, rows) => {
                      rows.forEach(r => {
                        let index = createCampaign.contacts.findIndex(c => c.id == r.id)
                        let cloneContact = createCampaign.contacts.concat([])
                        if (index != -1) {
                          cloneContact = cloneContact.slice(0, index).concat(cloneContact.slice(index + 1))
                        }
                        deleteExceptionContacts(cloneContact)
                      })
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
        }
      </Grid>
    </Grid>
  )
}
export default MarketingPlanDetails