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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Editor } from "react-draft-wysiwyg";
import "../../common/react-draft-wysiwyg.css";
import * as dateFns from 'date-fns'
import { DialogActions, Button, DialogContent } from '@material-ui/core'

import { htmlToState, draftToRaw } from "../../common/Utils";

import styles from './Styles'

// Components 
import SelectCustom from '../../components/SelectCustom'
import AsyncSelect from '../../components/AsyncSelectCustom'

// API
import {
  REFRESH_TOKEN_URL,
  MAIL_TEMPLATES_URL
} from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import useFetchData from '../../CustomHook/useFetchData'
import StepDetail from './StepDetail'

const getSteps = ['Campaign Information', 'Selecting Contacts', 'Deals']

let lastSelectIndex = -1

function CreateEmailTemplate(props) {

  const [createTemplate, setCreateTemplate] = React.useState({
    name: '',
    subject: '',
    template: ''
  })
  const [editorState, setEditorState] = React.useState(htmlToState(""))


  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };
  let selectionRef = React.useRef(null)

  const { user, notification, submitRef } = props;
  const { classes } = props;

  const onPost = () => {

    apiPost(MAIL_TEMPLATES_URL, { ...createTemplate, template: draftToRaw(editorState) }, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              onPost()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          // setError(res.data)
        }
        else {
          notification('Successfully Created')
        }
      })

  }

  const handleCreateMailTemplate = (e) => {
    e.preventDefault()
    onPost()
  }


  return (
    <>
      <form onSubmit={handleCreateMailTemplate}>
        <DialogContent>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Grid container >
                <Grid item xs={2} style={{ position: 'relative' }}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                    required
                  >
                    Display name
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    name='name'
                    value={createTemplate.name}
                    onChange={e => {
                      setCreateTemplate({ ...createTemplate, name: e.target.value })
                    }}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container >
                <Grid item xs={2} style={{ position: 'relative' }}>
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
                <Grid item xs={10}>
                  <Input
                    name='subject'
                    value={createTemplate.subject}
                    onChange={e => {
                      setCreateTemplate({ ...createTemplate, subject: e.target.value })
                    }}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={2} style={{ position: 'relative' }}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                    required
                  >
                    Template
                  </InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{
                      minHeight: '400px'
                    }}

                  >
                  </Editor>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ paddingTop: '10px', border: '1px solid #F1F1F1', height: '100%' }}>
                    <p style={{ padding: '10px', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>System Variables</p>
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
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant='contained' color='primary'>Create</Button>
        </DialogActions>
      </form>

    </>
  )
}

export default withStyles(styles)(CreateEmailTemplate);