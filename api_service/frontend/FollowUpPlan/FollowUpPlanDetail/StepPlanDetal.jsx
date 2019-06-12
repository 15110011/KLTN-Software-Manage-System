import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import PreviewIcon from '@material-ui/icons/RemoveRedEye';
import SelectCustom from '../../components/SelectCustom';

import styles from './FollowUpPlanStyles';

function StepPlanDetail(props) {
  const {
    classes,
    step,
    onChangeStepDetailInput,
    handleChangeStepCondition,
    handleAddConditions,
    createFieldDialog,
    actions,
    handleChangeSelect,
    handleOpenDialog,
    onChangeField,
    onAddOrRemoveField,
    onSubmitNewFields,
    newFields,
    onCloseField,
    onRemoveCondition,
    disableApply,
    isFinalStep,
    mailTemplate,
    handleChangeMailTemplate,
  } = props;
  const [previewTemplate, setPreviewTemplate] = React.useState(null);
  return (
    <div style={{ textAlign: 'left', padding: '40px' }}>
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
      <Grid item xs={12}>
        {isFinalStep && (
          <div className="mb-3">
            <i className="text-muted">
              You have to choose packages which customer want to buy in this
              step
            </i>
          </div>
        )}
        {!isFinalStep && (
          <Grid container spacing={40}>
            <Grid className={classes.inputCustom} item xs={2}>
              <InputLabel
                required
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Automatical actions
              </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth className={classes.formControl}>
                {step && actions.actions && (
                  <SelectCustom
                    options={actions.actions.map((g, i) => ({
                      label: `${g}`,
                      value: `${g}`,
                    }))}
                    handleChange={(values, element) => handleChangeSelect(values, element)
                    }
                    data={step.actions.reduce((acc, g) => {
                      acc.push({ label: `${g}`, value: g });
                      return acc;
                    }, [])}
                    multi
                    placeholder=""
                    label=""
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={2} />
            {step.actions.some(a => a == 'Send Email') && (
              <>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                    style={{ bottom: '30px' }}
                  >
                    Mail templates
                  </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  {step.email_template_ && (
                    <SelectCustom
                      handleChange={handleChangeMailTemplate}
                      name="email_template"
                      options={mailTemplate.data.map(template => ({
                        label: template.name,
                        value: template.id,
                        mail_template: template,
                      }))}
                      data={{
                        label: step.email_template_.name,
                        value: step.email_template_.id,
                      }}
                      fullWidth
                      single
                    />
                  )}
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => {
                      setPreviewTemplate(step.email_template_);
                    }}
                  >
                    <PreviewIcon />
                  </IconButton>
                </Grid>
              </>
            )}
          </Grid>
        )}
        <Grid container spacing={40}>
          <Grid className={classes.inputCustom} item xs={2}>
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
              onChange={onChangeStepDetailInput}
              value={step.duration}
              type="number"
              name="duration"
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(StepPlanDetail);
