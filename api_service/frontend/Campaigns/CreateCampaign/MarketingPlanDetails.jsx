import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PreviewIcon from '@material-ui/icons/RemoveRedEye';
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
// import * as cn from 'classnames';

// Components
import AsyncSelect from '../../components/AsyncSelectCustom';
import stateHashes from '../../common/StateHash';

import CreateMarketingPlan from '../../MarketingPlan/CreateMarketingPlan';

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
    deleteExceptionContacts,
    showEditIcon,
    isCreateMarketingPlanDialog,
    setIsCreateMarketingPlanDialog,
    addMarketingPlanToEdit,
    isEditMarketingPlan,
    setIsEditMarketingPlan,
    notification,
  } = props;
  const [previewTemplate, setPreviewTemplate] = React.useState(null);

  const [
    createMarketingPlanDialog,
    setCreateMarketingPlanDialog,
  ] = React.useState(false);
  const handleCloseCreateMarketingPlanDialog = () => {
    setCreateMarketingPlanDialog(false);
  };

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
      {previewTemplate && (
        <Dialog
          open
          onClose={() => {
            setPreviewTemplate(null);
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <div>{previewTemplate.name}</div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2} style={{ position: 'relative' }}>
                    <InputLabel htmlFor="custom-css-standard-input" required>
                      Subject
                    </InputLabel>
                  </Grid>
                  <Grid item xs={10}>
                    <div>{previewTemplate.subject}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2} style={{ position: 'relative' }}>
                    <InputLabel htmlFor="custom-css-standard-input" required>
                      Template
                    </InputLabel>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing="8">
                      <Grid item xs={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: previewTemplate.template,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            paddingTop: '10px',
                            border: '1px solid #F1F1F1',
                            height: '100%',
                          }}
                        >
                          <p
                            style={{
                              padding: '10px',
                              fontSize: '20px',
                              fontStyle: 'italic',
                              fontWeight: 'bold',
                            }}
                          >
                            System Variables
                          </p>
                          <ul>
                            <li style={{ listStyleType: 'circle' }}>
                              $contact_name$: Your customer name
                            </li>
                          </ul>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      {createMarketingPlanDialog && (
        <React.Fragment>
          {isEditMarketingPlan ? (
            <>
              <CreateMarketingPlan
                marketingData={createCampaign.marketing_plan}
                isEditMarketingPlan={isEditMarketingPlan}
                addMarketingPlanToEdit={addMarketingPlanToEdit}
                isCreateMarketingPlanDialog={isCreateMarketingPlanDialog}
                createMarketingPlanDialog={createMarketingPlanDialog}
                handleCloseCreateMarketingPlanDialog={
                  handleCloseCreateMarketingPlanDialog
                }
                setCreateMarketingPlanDialog={setCreateMarketingPlanDialog}
                setIsCreateMarketingPlanDialog={setIsCreateMarketingPlanDialog}
                notification={notification}
              />
            </>
          ) : (
            <>
              <CreateMarketingPlan
                notification={notification}
                isEditMarketingPlan={isEditMarketingPlan}
                addMarketingPlanToEdit={addMarketingPlanToEdit}
                isCreateMarketingPlanDialog={isCreateMarketingPlanDialog}
                createMarketingPlanDialog={createMarketingPlanDialog}
                handleCloseCreateMarketingPlanDialog={
                  handleCloseCreateMarketingPlanDialog
                }
                setCreateMarketingPlanDialog={setCreateMarketingPlanDialog}
                setIsCreateMarketingPlanDialog={setIsCreateMarketingPlanDialog}
              />
            </>
          )}
        </React.Fragment>
      )}
      <Grid container spacing={24}>
        <Grid item xs={10}>
          <Grid container spacing={24}>
            <Grid className={classes.inputCustom} item xs={4}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabelMarketing,
                  focused: classes.cssFocused,
                }}
              >
                Marketing plan name
              </InputLabel>
            </Grid>
            <Grid item xs={7}>
              <AsyncSelect
                handleChange={(values, element) => handleChangeMarketingPlanSelect(values, element)
                }
                onChangeSelect={(values, element) => handleChangeMarketingPlanSelect(values, element)
                }
                data={
                  Object.keys(createCampaign.marketing_plan).length === 0
                    ? ''
                    : {
                      label: `${createCampaign.marketing_plan.name}`,
                      value: createCampaign.marketing_plan.id,
                      ...createCampaign.marketing_plan,
                    }
                }
                single
                placeholder=""
                label=""
                loadOptions={fetchMarketingPlanSuggestion}
              />
            </Grid>
            <Grid item xs={1} style={{ display: 'inline-flex' }}>
              {createCampaign.marketing_plan.name && (
                <IconButton
                  onClick={() => {
                    setCreateMarketingPlanDialog(true);
                    setIsEditMarketingPlan(true);
                  }}
                  aria-label="Edit"
                  classes={{ root: classes.fixButton }}
                >
                  <EditIcon style={{ fontSize: '16px' }} />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setCreateMarketingPlanDialog(true);
                  setIsCreateMarketingPlanDialog(true);
                  setIsEditMarketingPlan(false);
                }}
                aria-label="Add"
                classes={{ root: classes.fixButton }}
              >
                <AddIcon style={{ fontSize: '16px' }} />
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
                  root: classes.cssLabelMarketing,
                  focused: classes.cssFocused,
                }}
              >
                Contacts from groups
              </InputLabel>
            </Grid>
            <Grid item xs={7}>
              <FormControl fullWidth className={classes.formControl}>
                <AsyncSelect
                  handleChange={(values, element) => handleChangeLoadContactSelect(values, element)
                  }
                  onChangeSelect={(values, element) => handleChangeLoadContactSelect(values, element)
                  }
                  data={createCampaign.groups.reduce((acc, g) => {
                    acc.push({ label: g.name, value: g.id, ...g });
                    return acc;
                  }, [])}
                  multi
                  placeholder=""
                  label=""
                  loadOptions={fetchLoadContactSuggestion}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {createCampaign.marketing_plan.condition
            && createCampaign.marketing_plan.condition.must.map((m, i) => (
              <>
                <Grid container key={i} spacing={24}>
                  <Grid className={classes.inputCustom} item xs={4}>
                    <InputLabel
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabelMarketing,
                        focused: classes.cssFocused,
                      }}
                    >
                      All Conditions(All conditions must be met)
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container spacing={24}>
                      <Grid item xs={5}>
                        <Tooltip
                          title={marketingPlanConditions[m.operand].name}
                          aria-label="Add"
                        >
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="age-simple">
                              Operands
                            </InputLabel>
                            <Select
                              value={m.operand}
                              name="operand"
                              className={classes.selectEmpty}
                              disabled
                            >
                              {Object.values(marketingPlanConditions).map(c => (
                                <MenuItem key={c.name} value={c.id}>
                                  {c.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={3}>
                        <Tooltip title={m.operator} aria-label="Add">
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="age-simple">
                              Operators
                            </InputLabel>
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
                      <Grid item xs={4}>
                        {m.operand == '1' ? (
                          <Tooltip
                            title={(
                              <ul>
                                {m.data.map(m => (
                                  <li>{`${stateHashes[m]}`}</li>
                                ))}
                              </ul>
)}
                          >
                            <FormControl
                              fullWidth
                              className={classes.formControl}
                            >
                              <InputLabel htmlFor="age-simple">Data</InputLabel>
                              <Input
                                value={m.data
                                  .reduce((acc, m) => {
                                    acc += `${stateHashes[m]}, `;
                                    return acc;
                                  }, '')
                                  .slice(0, -2)}
                                displayEmpty
                                disabled
                                className={classes.selectEmpty}
                              />
                            </FormControl>
                          </Tooltip>
                        ) : (
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="age-simple">Data</InputLabel>
                            <Input
                              value={m.data}
                              displayEmpty
                              disabled
                              className={classes.selectEmpty}
                            />
                          </FormControl>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </>
            ))}
        </Grid>
        {createCampaign.marketing_plan.actions && (
          <Grid item xs={10}>
            <Grid container spacing={24}>
              <Grid className={classes.inputCustom} item xs={4}>
                <InputLabel
                  htmlFor="custom-css-standard-input"
                  classes={{
                    root: classes.cssLabelMarketing,
                    focused: classes.cssFocused,
                  }}
                >
                  Actions
                </InputLabel>
              </Grid>
              <Grid item xs={7}>
                <Input
                  value={createCampaign.marketing_plan.actions
                    .reduce((acc, a) => {
                      let res = acc;
                      res += `${a}, `;
                      return res;
                    }, '')
                    .slice(0, -2)}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {createCampaign.marketing_plan.actions
          && createCampaign.marketing_plan.actions.findIndex(
            a => a === 'Send Email',
          ) !== -1 && (
            <Grid item xs={10}>
              <Grid container spacing={24}>
                <Grid className={classes.inputCustom} item xs={4}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabelMarketing,
                      focused: classes.cssFocused,
                    }}
                  >
                    Email Template
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Input
                    value={createCampaign.marketing_plan.mail_template.name}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Preview email">
                    <IconButton
                      aria-label="Preview"
                      classes={{ root: classes.fixButton }}
                      onClick={() => {
                        setPreviewTemplate(
                          createCampaign.marketing_plan.mail_template,
                        );
                      }}
                    >
                      <PreviewIcon style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <Button
                onClick={(e) => {
                  if (createCampaign.marketing_plan.name) {
                    handleApplyConditionTable(e);
                  } else {
                  }
                }}
                variant="contained"
                color="primary"
              >
                Filter
              </Button>
            </Grid>
            {!createCampaign.marketing_plan.name && (
              <div className="text-muted small w-100">
                <i>*Select marketing plan and contact groups to filter</i>
              </div>
            )}
          </Grid>
        </Grid>
        {applyConditionTable === true && createCampaign.marketing_plan.name && (
          <Grid
            classes={{ container: classes.fixTable }}
            container
            className="mt-4 d-flex justify-content-center"
          >
            <Divider />
            <div style={{ width: '85%', marginBottom: '8px' }}>
              <MaterialTable
                columns={[
                  {
                    title: '#',
                    field: 'numeral',
                    type: 'numeric',
                    cellStyle: { width: '50px' },
                    filtering: false,
                  },
                  { title: 'First Name', field: 'fname' },
                  { title: 'Last Name', field: 'lname' },
                  {
                    title: 'State',
                    field: 'state',
                    render: row => stateHashes[row.state],
                  },

                  { title: 'Email', field: 'email' },
                  { title: 'Phone', field: 'phone' },
                  { title: 'Orgnization', field: 'org' },
                ]}
                data={createCampaign.contacts.map((c, index) => ({
                  numeral: index + 1,
                  fname: c.first_name,
                  lname: c.last_name,
                  email: c.mail,
                  phone: c.phone,
                  org: c.org,
                  state: c.state,
                  id: c.id,
                }))}
                title="Contacts List"
                actions={[
                  {
                    icon: 'delete',
                    tooltip: 'Do',
                    onClick: (event, rows) => {
                      rows.forEach((r) => {
                        const index = createCampaign.contacts.findIndex(
                          c => c.id === r.id,
                        );
                        let cloneContact = createCampaign.contacts.concat([]);
                        if (index !== -1) {
                          cloneContact = cloneContact
                            .slice(0, index)
                            .concat(cloneContact.slice(index + 1));
                        }
                        deleteExceptionContacts(cloneContact);
                      });
                    },
                  },
                ]}
                options={{
                  selection: true,
                  filtering: true,
                  paging: true,
                }}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
export default MarketingPlanDetails;
