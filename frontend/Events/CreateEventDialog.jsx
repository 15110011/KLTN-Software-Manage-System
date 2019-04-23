import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Input, InputLabel } from '@material-ui/core'
import { IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Editor } from "react-draft-wysiwyg";
import "../common/react-draft-wysiwyg.css";
import SelectCustom from '../../components/SelectCustom'
import { htmlToState, draftToRaw } from "../common/utils";
import { EVENTS_URL, REFRESH_TOKEN_URL, GET_SALE_REPS_URL } from '../../common/urls';
import useFetchData from '../../CustomHook/useFetchData'
import FormControl from '@material-ui/core/FormControl';
import * as dateFns from '@date-io/date-fns'
import { apiPost } from '../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import CustomSnackbar from '../components/CustomSnackbar'
import styles from './EventStyles'


function CreateEventDialog(props) {

  const { classes, toggleDialog, assigned_to, targets, order, marketing, isNotOriginal, user,
    updateActivities
  } = props

  const [editorState, setEditorState] = React.useState(htmlToState(""))

  const [completeNotice, setCompleteNotice] = React.useState(false)

  const [saleRep, setSaleRep] = useFetchData(GET_SALE_REPS_URL, props.history, {})

  const [createEvent, setCreateEvent] = React.useState({
    name: '',
    assigned_to: assigned_to ? assigned_to : '',
    start_date: dateFns.format(Date.now(), 'YYYY-MM-DD'),
    end_date: dateFns.format(Date.now(), 'YYYY-MM-DD'),
    order: order ? order : '',
    marketing: marketing ? marketing.marketing_plan.id : '',
    content: '',
    contacts: targets.map(t => ({
      label: t.first_name + ' ' + t.last_name, value: t.id, ...t
    })),,
    priority: 0
  })


  const onChangeInput = e => {
    setCreateEvent({ ...createEvent, [e.target.name]: e.target.value })
  }

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  const notification = () => {
    setCompleteNotice('Successfully Added')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    updateActivities()
  }

  const handleChangeAssigneeSelect = (value, action) => {
    setCreateEvent({ ...createEvent, assigned_to: value[0].value })
  }

  const handleCreateEvents = e => {
    apiCreateEvent()
  }

  const apiCreateEvent = () => {
    apiPost(EVENTS_URL, {
      ...createEvent, content: draftToRaw(editorState),
      user: user.id, contacts: targets.map(t => t.id)
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
          notification()
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
        {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
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
              // data={
              //   createEvent.assigned_to
              //     .reduce((acc, u) => {
              //       acc.push({ label: `${u.user.username}`, value: u.user.id, ...u })
              //       return acc
              //     }, [])
              // }
              fullWidth
              multi
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
            <Input
              onChange={onChangeInput}
              name="start_date"
              type="date"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.start_date}
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
            <Input
              onChange={onChangeInput}
              name="end_date"
              type="date"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={createEvent.end_date}
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
              required
            >
              Target
          </InputLabel>
          </Grid>
          <Grid item xs={4} className='pr-5'>
            <SelectCustom
              // handleChange={(values, element) => handleChangeAssigneeSelect(values, element)}
              name="contacts"
              options={targets && targets.reduce((acc, u) => {
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
          <Grid item xs={12}>
            <Grid container spacing={40}>
              <Grid className={classes.inputCustom} style={{ 'marginTop': '2%' }} item xs={2}>
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
              <Grid item xs={10} spacing={40}>
                <Editor
                  editorState={editorState}
                  wrapperClassName="editor-wrapper"
                  editorClassName="editor"
                  onEditorStateChange={onEditorStateChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary">
          Cancel
        </Button>
        <Button color="primary"
          variant='contained'
          classes={{
            contained: classes.btnBlue
          }}
          onClick={handleCreateEvents}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default withStyles(styles)(CreateEventDialog)