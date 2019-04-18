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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SelectCustom from '../../components/SelectCustom'
import styles from './CreateFollowUpPlanStyle'
import Tooltip from '@material-ui/core/Tooltip';


function StepDetail(props) {
  const {
    classes,
    createStep,
    onChangeCreateSteps,
    actions, handleChangeSelect,
    handleChangeStepCondition,
    error,
    handleAddConditions
  } = props
  const [createFieldDialog, setCreateFieldDialog] = React.useState(false)

  const handleOpenDialog = e => {
    setCreateFieldDialog(!createFieldDialog)
  }
  return (
    <div style={{ textAlign: 'left', padding: '40px' }}>
      <Grid container spacing={40}>
        <Grid className={classes.inputCustom} item xs={4}>
          <InputLabel
            required
            htmlFor="custom-css-standard-input"
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            className={error.steps ? classes.danger : null}
          >
            Action
            </InputLabel>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth className={classes.formControl}>
            {
              actions.actions && <SelectCustom
                options={actions.actions.map((g, i) => ({
                  label: `${g}`,
                  value: `${g}`,
                }))}
                handleChange={(values, element) => handleChangeSelect(values, element)}
                data={
                  createStep.actions &&
                  createStep.actions
                    .reduce((acc, g) => {
                      acc.push({ label: `${g.label}`, value: g.value })
                      return acc
                    }, [])
                }
                multi
                placeholder=""
                label=""
              />
            }
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={40}>
        <Grid className={classes.inputCustom} item xs={4}>
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
          />
        </Grid>
      </Grid>
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
            Fields
            </InputLabel>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={40}>
            <Grid item xs={5}>
              <Input
                fullWidth
                required
                onChange={handleChangeStepCondition}
                value={
                  Object.keys(createStep.conditions).length === 0 ? '' : createStep.conditions['field_name']
                }
                name="field_name"
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.formControl}>
                <Select
                  value={
                    Object.keys(createStep.conditions).length === 0 ? '' : createStep.conditions['field_type']
                  }
                  onChange={handleChangeStepCondition}
                  displayEmpty
                  name="field_type"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="text">
                    Text Field
                </MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="check_box">
                    Check Box
                </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Button
                onClick={handleAddConditions}
                variant="outlined"
                color="default"
              // className={(classes.addFeatureButton)}>
              >
                Add Conditions
              </Button>
            </Grid>
            {
              createStep.conditions['field_type'] === 'check_box' &&
              <Tooltip title="Add more fields">
                <Fab className={classes.fab} size="small" onClick={handleOpenDialog}>
                  <AddIcon color="action" />
                </Fab>
              </Tooltip>
            }
            {
              createFieldDialog && (
                <Dialog
                  open={createFieldDialog}
                  onClose={handleOpenDialog}
                  classes={{ paper: classes.paperRoot }}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle>
                    Add more fields you want to check
                  </DialogTitle>
                  <DialogContent>
                    <InputLabel
                      required
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Required Fields
                    </InputLabel>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary">
                      Cancel
                    </Button>
                    <Button color="primary">
                      Subscribe
                    </Button>
                  </DialogActions>
                </Dialog>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default withStyles(styles)(StepDetail)