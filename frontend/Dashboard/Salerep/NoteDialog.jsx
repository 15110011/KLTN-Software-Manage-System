import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles, Divider } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import * as dateFns from '@date-io/date-fns'

import { Editor } from "react-draft-wysiwyg";
import { htmlToState, draftToRaw } from "../../common/utils";
import "../../common/react-draft-wysiwyg.css";

import { apiPost, apiPatch } from '../../common/Request'
import { BAD_REQUEST } from '../../common/Code'
import { NOTES_URL, CAMPAIGNS_URL, REFRESH_TOKEN_URL } from '../../common/urls'
import useFetchData from '../../CustomHook/useFetchData'
import CustomSnackbar from '../../components/CustomSnackbar'


import Button from '@material-ui/core/Button'
import styles from './SalerepStyles.js'


function NoteDialog(props) {

  const { classes, toggleDialog, campaign, contact, history } = props

  const [note, setNote, setUrl, forceUpdate] =
    useFetchData(`${CAMPAIGNS_URL}/${campaign.id}/note?type=MARKETING&contact=${contact.id}`,
      history, { name: 'Default Title', content: '', contact: contact.id, campaign: campaign.id, _type: 'MARKETING' })
  const [titleStt, setTitleStt] = React.useState('VIEW')
  const [contentStt, setContentStt] = React.useState('VIEW')
  const [editorState, setEditorState] = React.useState(htmlToState(""))

  const [old, setOld] = React.useState({
    name: '',
    content: ''
  })

  const [successNoti, setSuccessNoti] = React.useState(false)
  const [error, setError] = React.useState(false)


  const onChangeInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    setNote({ ...note, content: draftToRaw(editorState) })
  }

  const updateNote = () => {

    const cloneErr = {}
    if (!note.id) {

      apiPost(NOTES_URL, note, false, true)
        .then(res => {
          if (res.data.code == "token_not_valid") {
            apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
              if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
                history.push('/logout')
              }
              else {
                localStorage.setItem("token", res.data.access)
                updateNote()
              }
            })
          }
          else if (res.data.code == BAD_REQUEST) {
            const { code, ...rest } = res.data
            cloneErr = rest
            cloneErr.all = 'Update Failed'
          }
          else {
            setSuccessNoti('Successfully Updated')
            setTimeout(() => {
              setSuccessNoti(false)
            }, 2000);
          }
          setError(cloneErr)
        })
    }
    else {
      apiPatch(NOTES_URL + '/' + note.id, note, false, true)
        .then(res => {
          if (res.data.code == "token_not_valid") {
            apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
              if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
                history.push('/logout')
              }
              else {
                localStorage.setItem("token", res.data.access)
                updateNote()
              }
            })
          }
          else if (res.data.code == BAD_REQUEST) {
            const { code, ...rest } = res.data
            cloneErr = rest
            cloneErr.all = 'Update Failed'
          }
          else {
            setSuccessNoti('Successfully Updated')
            setTimeout(() => {
              setSuccessNoti(false)
            }, 2000);
          }
          setError(cloneErr)
        })
    }
  }

  const onHandleUpdate = e => {
    e.preventDefault()

    updateNote()
  }

  return (
    <Dialog open={true} onClose={toggleDialog} fullWidth maxWidth='sm'>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      <form onSubmit={onHandleUpdate}>
        <DialogTitle style={{ position: 'relative' }}>
          {titleStt == 'VIEW' ?
            <Tooltip title={note.name}>
              <span>
                {note.name.length > 20 ? note.name.slice(0, 20) + '...' : note.name}
              </span>
            </Tooltip>
            :
            <TextField name='name' value={note.name} onChange={onChangeInput} error={error.name}
              helperText={error.name}
            />
          }

          {
            titleStt == 'VIEW' ?
              <Tooltip title="Edit note 's name">
                <IconButton onClick={() => {
                  setOld({ ...old, name: note.name })
                  setTitleStt('EDIT')
                }}
                  classes={{ root: classes.smallIconBtn }}
                >
                  <EditIcon fontSize='inherit'></EditIcon>
                </IconButton>
              </Tooltip>
              :
              <>
                <Tooltip title="Cancel">
                  <IconButton onClick={() => {
                    setNote({ ...note, name: old.name })
                    setTitleStt('VIEW')
                  }}
                    classes={{ root: classes.smallIconBtn }}
                  >
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Apply">
                  <IconButton onClick={() => {
                    if (!note.name) {
                      setError({ ...error, name: 'This field may not be blank' })
                    }
                    else {
                      setTitleStt('VIEW')
                    }
                  }}

                    classes={{ root: classes.smallIconBtn }}
                  >
                    <DoneIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </>
          }
          <Tooltip title="Close Dialog">
            <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }} onClick={toggleDialog}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </Tooltip>
        </DialogTitle>
        {contentStt == 'VIEW' ?
          <>
            <DialogContent style={{ wordBreak: 'break-word' }} classes={{ root: classes.noteContentRoot }}
              onClick={() => {
                setOld({ ...old, content: note.content })
                setEditorState(htmlToState(note.content))
                setContentStt('EDIT')
              }}
            >
              {note.content ?
                <DialogContentText dangerouslySetInnerHTML={{ __html: note.content }}>
                </DialogContentText>
                :
                <DialogContentText>
                  Let create new note
          </DialogContentText>
              }
            </DialogContent>
            <DialogActions>
              <Button variant='contained' type='submit'>Update note</Button>
            </DialogActions>
          </>
          :
          <>
            <DialogContent
              className='p-3'
            >
              <Editor
                editorState={editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{ minHeight: '330px' }}
              />
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={() => {
                setNote({ ...note, content: old.content })
                setContentStt('VIEW')
                setEditorState(htmlToState(""))
              }}>Cancel</Button>
              <Button variant='contained' color='primary'
                onClick={() => {
                  setContentStt('VIEW')
                  setEditorState(htmlToState(""))
                }}
              >Apply</Button>
            </DialogActions>
          </>
        }
      </form>
    </Dialog>
  )


}

export default withStyles(styles)(withRouter(NoteDialog))