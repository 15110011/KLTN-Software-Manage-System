import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Input, InputLabel } from '@material-ui/core'
import { IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';
import * as DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button'
import { Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Editor } from "react-draft-wysiwyg";
import "../common/react-draft-wysiwyg.css";
import SelectCustom from '../../components/SelectCustom'
import { htmlToState, draftToRaw } from "../common/utils";
import { EVENTS_URL, REFRESH_TOKEN_URL, GET_SALE_REPS_URL, ASSIGNED_CAMPAIGNS_URL } from '../common/urls';
import useFetchData from '../../CustomHook/useFetchData'
import FormControl from '@material-ui/core/FormControl';
import * as dateFns from 'date-fns'
import { apiPost, apiGet } from '../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import CustomSnackbar from '../components/CustomSnackbar'
import AsyncSelect from '../components/AsyncSelectCustom'
import styles from './EventStyles'


function CreateEventDialog(props) {

  const { classes, toggleDialog, assigned_to, targets, order, marketing, isNotOriginal, user,
    updateActivities, type_, contactOptions, mustBeCampaign, mustBePersonal,
    setLaterDialog,
    notification
  } = props

  const [editorState, setEditorState] = React.useState(htmlToState(""))
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())

  const [createEvent, setCreateEvent] = React.useState({
    name: '',
    assigned_to: assigned_to ? assigned_to : { label: '', value: '' },
    start_date: dateFns.format(Date.now(), 'yyyy-MM-dd'),
    end_date: dateFns.format(Date.now(), 'yyyy-MM-dd'),
    order: order ? order.id : '',
    marketing: marketing ? marketing.marketing_plan.id : '',
    content: '',
    contacts: targets ? targets.map(t => ({
      label: t.first_name + ' ' + t.last_name, value: t.id, ...t
    })) : [],
    priority: 0,
    type_: mustBeCampaign ? 'campaign' : type_
  })

  const fetchAssignedCampaignSuggestion = (input) => {
    if (input != '') {
      return apiGet(ASSIGNED_CAMPAIGNS_URL + "?suggest=" + input, true).then(res => {
        return res.data.suggestion.map(s => ({ label: s.name, value: s.id, s }))
      })
    }
  }

  const handleChangeAssignedCampaignSelect = (result, action) => {
    if (action.action == 'input-change') { }
    else if (action.action == 'select-option') {
      const { value, label, ...realResult } = result

      setCreateEvent({ ...createEvent, campaign: result })
    }

    else if (action.action == 'remove-value' || action.action == 'clear') {
      setCreateEvent({ ...createEvent, campaign: {} })
    }
  }

  const onChangeInput = e => {
    setCreateEvent({ ...createEvent, [e.target.name]: e.target.value })
  }

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  // const notification = () => {
  //   setCompleteNotice('Successfully Added')
  //   setTimeout(() => {
  //     setCompleteNotice(false)
  //   }, 2000);
  //   updateActivities()
  // }

  const handleChangeAssigneeSelect = (value, action) => {
    setCreateEvent({ ...createEvent, assigned_to: value })
  }

  const handleChangeTargetSelect = (value, action) => {
    setCreateEvent({ ...createEvent, contacts: value })
  }

  const handleCreateEvents = e => {
    apiCreateEvent()
    setLaterDialog(false)
  }

  const apiCreateEvent = () => {
    apiPost(EVENTS_URL, {
      ...createEvent, content: draftToRaw(editorState),
      user: user.id,
      contacts: createEvent.contacts.map(t => t.id),
      assigned_to: createEvent.assigned_to.value,
      campaign: createEvent.campaign ? createEvent.campaign.value : '',
      start_date: dateFns.format(startDate, 'yyyy-MM-dd hh:mm'),
      end_date: dateFns.format(endDate, 'yyyy-MM-dd hh:mm'),
    }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          // setError(res.data)
        }
        else {
          notification('Successfully Created')
          // setCreateCampaign({ ...createCampaign, contacts: res.data })
        }
      })
  }

  return (
    <Dialog
      open={true}
      onClose={toggleDialog}
      fullWidth maxWidth='md'
    >
      <DialogTitle style={{ position: 'relative' }}>Create Event
        <Tooltip title="Close Dialog">
          <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }} onClick={toggleDialog}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
         
          <Grid container spacing={8}>
            <Grid className={classes.inputCustom} item xs={2}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                required
              >
                Subject
                    </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Input
                onChange={onChangeInput}
                name="name"
                type="text"
                classes={{
                  underline: classes.cssUnderline,
                }}
                value={createEvent.name}
                required
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                required
              >
                Assigned to
                    </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <SelectCustom
                handleChange={(values, element) => handleChangeAssigneeSelect(values, element)}
                name="assigned_to"
                options={(user.sale_reps && user.profile.is_manager) ? user.sale_reps.reduce((acc, u) => {
                  acc.push(
                    {
                      label: `${u.user.username}`,
                      value: u.user.id,
                      ...u
                    }
                  )
                  return acc
                }, [])
                  : [{ label: user.username, value: user.id, ...user }]
                }
                data={{ label: `${createEvent.assigned_to.username}`, value: createEvent.assigned_to.id, ...createEvent.assigned_to }}
                fullWidth
                single
              />
            </Grid>
            <Grid className={classes.inputCustom} item xs={2}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                required
              >
                Start date
                    </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <DateTimePicker
                onChange={setStartDate}
                name="startDate"
                minDate={new Date()}
                format="MM/dd/yyyy hh:mm a" ƒ
                value={startDate}
                required
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                required
              >
                End date
                    </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <DateTimePicker
                onChange={setEndDate}
                name="endDate"
                minDate={new Date()}
                format="MM/dd/yyyy hh:mm a" ƒ
                value={endDate}
                required
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputCustom} item xs={2}>
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Target
          </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              {
                createEvent.type_ == 'campaign' ?
                  <SelectCustom
                    handleChange={(values, element) => handleChangeTargetSelect(values, element)}
                    name="contacts"
                    options={contactOptions && contactOptions.reduce((acc, u) => {
                      acc.push(
                        {
                          label: `${u.full_name}`,
                          value: u.id,
                          ...u
                        }
                      )
                      return acc
                    }, [])}
                    data={
                      createEvent.contacts
                        .reduce((acc, u) => {
                          acc.push({ label: `${u.full_name}`, value: u.id, ...u })
                          return acc
                        }, [])
                    }
                    fullWidth
                    multi
                  />
                  :
                  <Input disabled value="Me" fullWidth></Input>
              }
            </Grid>
            <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                required
              >
                Priority
          </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.formControl} margin='dense'>
                <Select
                  value={createEvent.priority}
                  onChange={onChangeInput}
                  name="priority"
                >
                  <MenuItem value={0}>
                    Low
                </MenuItem>
                  <MenuItem value={1}>
                    Medium
                </MenuItem>
                  <MenuItem value={2}>
                    High
                </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {!mustBeCampaign && !mustBePersonal &&
              <>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                    required
                  >
                    Event type
          </InputLabel>
                </Grid>
                <Grid item xs={4} className='pr-5'>
                  <FormControl fullWidth className={classes.formControl} margin='dense'>
                    <Select
                      value={createEvent.type_}
                      onChange={onChangeInput}
                      name="type_"
                    >
                      <MenuItem value='personal'>
                        Personal
                </MenuItem>
                      <MenuItem value='campaign'>
                        Campaign
                </MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
              </>
            }

            {createEvent.type_ == 'campaign' ?
              <>
                {!mustBeCampaign ?
                  <>
                    <Grid className={classes.inputCustom} item xs={2} style={{ paddingLeft: '24px' }}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                        required
                      >
                        Campaign name
                    </InputLabel>
                    </Grid>
                    <Grid item xs={4}>

                      <AsyncSelect
                        handleChange={(values, element) => handleChangeAssignedCampaignSelect(values, element)}
                        onChangeSelect={(values, element) => handleChangeAssignedCampaignSelect(values, element)}
                        data={
                          createEvent.campaign && { label: `${createEvent.campaign.name}`, value: createEvent.campaign.id, ...createEvent.campaign }
                        }
                        single
                        placeholder=""
                        label=""
                        loadOptions={fetchAssignedCampaignSuggestion}
                      />
                    </Grid>
                  </>
                  :
                  <>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                        required
                      >
                        Campaign name
                    </InputLabel>
                    </Grid>
                    <Grid item xs={4} className='pr-5'>
                      <AsyncSelect
                        handleChange={(values, element) => handleChangeAssignedCampaignSelect(values, element)}
                        onChangeSelect={(values, element) => handleChangeAssignedCampaignSelect(values, element)}
                        data={
                          createEvent.campaign && { label: `${createEvent.campaign.name}`, value: createEvent.campaign.id, ...createEvent.campaign }
                        }
                        single
                        placeholder=""
                        label=""
                        loadOptions={fetchAssignedCampaignSuggestion}
                      />
                    </Grid>
                  </>
                }

              </>
              :
              <Grid item xs={6}></Grid>
            }

            {(mustBeCampaign || mustBePersonal) &&
              <Grid item xs={6}></Grid>
            }

            <Grid className={classes.inputCustom} style={{ 'marginTop': '1%' }} item xs={2}>
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
            <Grid item xs={10} style={{ 'marginTop': '2%' }}>
              <Editor
                editorState={editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={onEditorStateChange}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button color="primary">
          Cancel
        </Button>
        <Button color="primary"
          variant='contained'
          // classes={{
          //   contained: classes.btnBlue
          // }}
          onClick={handleCreateEvents}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default withStyles(styles)(CreateEventDialog)