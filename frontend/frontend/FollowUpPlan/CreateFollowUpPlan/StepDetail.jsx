import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, Typography, IconButton, Icon } from '@material-ui/core';
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'
import styles from './CreateFollowUpPlanStyle'
import { create } from 'jss';


function StepDetail(props) {
  const {
    classes,
    createStep,
    onChangeCreateSteps,
    actions,
    handleChangeSelect,
    handleChangeStepCondition,
    error,
    handleAddConditions,
    createFieldDialog,
    handleOpenDialog,
    onChangeField,
    onAddOrRemoveField,
    onSubmitNewFields,
    newFields,
    onCloseField,
    onRemoveCondition,
    disableApply,
    handleChangeAutoActions,
    isFinalStep,
    fetchEmailSuggestion,
    handleChangeMailTemplate
  } = props

  return (


    <Grid container spacing={24}>
      {
        isFinalStep ?
          <Grid item xs={12}>
            <Typography classes={{ root: classes.activitytTgline }} component='span' style={{ fontStyle: 'italic' }}>
              You have to choose packages which customer want to buy in this step
          </Typography>
          </Grid>
          :
          <>
            <Grid className={classes.inputCustom} item xs={2}>
              <InputLabel
                required
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}

                className={error.steps ? classes.danger : null}
                style={{ top: '33px' }}
              >
                Auto
        </InputLabel>
            </Grid>
            <Grid item xs={8}>
              <FormControl component="fieldset" className={classes.formControl} >
                <FormGroup>
                  {
                    actions.actions &&
                    actions.actions
                      .reduce((acc, g) => {
                        acc.push(
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={createStep.actions.find(a => a == g)}
                                onChange={(value, status) => {
                                  handleChangeAutoActions(g, status)
                                }}
                              />
                            }
                            value={g}
                            label={g}
                          />
                        )
                        return acc
                      }, [])
                  }
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={2}></Grid>
            {createStep.actions.find(a => a == 'Send Email') &&
              <>
                <Grid item xs={2} style={{ position: 'relative' }}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Mail template
            </InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <AsyncSelect
                    handleChange={(values, element) => handleChangeMailTemplate(values, element)}
                    onChangeSelect={(values, element) => handleChangeMailTemplate(values, element)}
                    data={
                      { label: createStep.mail_template && createStep.mail_template.name, value: createStep.mail_template && createStep.mail_template.id }
                    }
                    // multi
                    single
                    placeholder=""
                    label=""
                    loadOptions={fetchEmailSuggestion}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
              </>
            }
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
                onChange={onChangeCreateSteps}
                value={createStep.duration}
                type="number"
                name="duration"
                classes={{
                  underline: classes.cssUnderline,
                }}
                inputProps={{
                  min: 1
                }}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            {/* <Grid className={classes.inputCustom} item xs={2}>
        <InputLabel
          required
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Fields
            </InputLabel>
      </Grid>
      <Grid item xs={8}>

        <Button
          onClick={handleAddConditions}
          style={{ float: 'right' }}
        >
          <AddIcon />
          Add Field
          </Button>

      </Grid> */}
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              {/* {createStep.conditions.map((c, index) => {
          return (
            <Grid container spacing={40}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  required
                  onChange={(e) => handleChangeStepCondition(e, index)}
                  value={
                    c['name']
                  }
                  name="name"
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  label="Name"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>
                    Type
                  </InputLabel>
                  <Select
                    value={
                      c['type']
                    }
                    onChange={(e) => handleChangeStepCondition(e, index)}
                    displayEmpty
                    name="type"
                    className={classes.selectEmpty}
                    label="Type"
                  >
                    <MenuItem value="text">
                      Text Field
                </MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="check_box">
                      Check Box
                </MenuItem>
                    <MenuItem value="radio">
                      Check Box (Multiple choices)
                </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {(c.type == 'check_box' || c.type == 'radio') &&
                <Grid item xs={2} style={{ position: 'relative' }}>
                  <Tooltip
                    title={<ul style={{ paddingInlineStart: '16px', fontSize: '12px', maxWidth: '150px', wordBreak: 'break-word' }}>
                      {c.choices.map(c => <li key={`selection${c}`}>{c}</li>)}</ul>}>
                    <Typography classes={{ root: classes.linkStyleCustom }}
                      onClick={() => handleOpenDialog(index)}
                    >{c.choices.length} selection(s)</Typography>
                  </Tooltip>
                </Grid>
              }
              <Grid item xs={1}>
                <IconButton onClick={() => onRemoveCondition(index)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
              {
                createFieldDialog && (
                  <Dialog
                    open={true}
                    onClose={onCloseField}
                    classes={{ paper: classes.paperRoot }}
                    fullWidth
                    maxWidth="sm"
                  >
                    <form onSubmit={e => onSubmitNewFields(e, index)}>
                      <DialogTitle style={{ position: 'relative' }}>
                        SELECTIONS
                        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>

                          <Tooltip title='Close Dialog'>
                            <IconButton onClick={onCloseField}>
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </DialogTitle>
                      <DialogContent>
                        <Grid container spacing={8}>

                          <Grid item xs={6}>
                            <DialogContentText>
                              {newFields.length} selection(s)
                              </DialogContentText>
                          </Grid>

                          <Grid item xs={6}>
                            <Button style={{ float: 'right' }} onClick={() => onAddOrRemoveField()}>
                              <AddIcon></AddIcon>
                              Add Selection
                              </Button>

                          </Grid>
                          {newFields.map((f, index) =>
                            (
                              <>
                                <Grid item xs={5}>
                                  <TextField
                                    name={'selection ' + (index + 1)}
                                    label={"Selection " + (index + 1)}
                                    type='text'
                                    required
                                    onChange={e => onChangeField(e, index)}
                                    fullWidth
                                    value={f}
                                  />
                                </Grid>
                                <Grid item xs={1}>
                                  <IconButton onClick={() => onAddOrRemoveField(index)}>
                                    <RemoveIcon />
                                  </IconButton>
                                </Grid>
                              </>
                            )
                          )}
                        </Grid>

                      </DialogContent>
                      <DialogActions>
                        <Button color="primary" type='button' onClick={onCloseField}>
                          Close
                        </Button>
                        <Button color="primary" type='submit' disabled={disableApply}>
                          Apply
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                )
              }
            </Grid>
          )
        })

        } */}

            </Grid>
          </>}
    </Grid>

  )
}
export default withStyles(styles)(StepDetail)
