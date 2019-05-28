import * as React from 'react'
import MaterialTable, { MTableCell } from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl'
import { Editor } from "react-draft-wysiwyg";
import Button from '@material-ui/core/Button'
import { InputLabel, Input } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import DoneIcon from '@material-ui/icons/Done'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import * as cn from 'classnames'

import useFetchData from '../../CustomHook/useFetchData'

import CreateEmailTemplate from '../CreateEmailTemplate'
import styles from './Styles'
import CustomFilterRow from '../../components/CustomFilterRow'
import TablePagination from '@material-ui/core/TablePagination'
import CustomSnackbar from '../../components/CustomSnackbar'
import * as dateFns from 'date-fns'

// API
import { MAIL_TEMPLATES_URL, REFRESH_TOKEN_URL, PACKAGES_URL } from "../../common/urls";
import { htmlToState, draftToRaw } from "../../common/Utils";
import { apiPost, apiGet, apiPatch } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function EmailTemplateList(props) {
  const [createEmailTemplateDialog, setCreateEmailTemplateDialog] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [editorState, setEditorState] = React.useState(htmlToState(""))
  const { classes, user } = props;
  const search = {}
  const [activePage, setActivePage] = React.useState(0)
  const [rowPerPage, setRowPerPage] = React.useState(1)
  const [error, setError] = React.useState(false)
  const [previewTemplate, setPreviewTemplate] = React.useState(null)

  const [updateTemplate, setUpdateTemplate] = React.useState({
    name: null,
    subject: null,
    template: null
  })



  const tableRef = React.useRef(null)
  const [mailTemplate, setEmailTemplateData, setEmailTemplateURL, forceUpdateEmailTemplate] = useFetchData(MAIL_TEMPLATES_URL, props.history, { data: [], total: 0 })

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  };

  const handleCloseCreateEmailTemplateDialog = e => {
    setCreateEmailTemplateDialog(false)
  }

  const onUpdate = template => {
    apiPatch(MAIL_TEMPLATES_URL + '/' + previewTemplate.id, template, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              onUpdate()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          // setError(res.data)
        }
        else {
          notification('Successfully Updated')
        }
      })
  }

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m)
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    forceUpdateEmailTemplate()
  }

  return (
    <div className={classes.root}>
      {createEmailTemplateDialog &&
        <Dialog open={true} onClose={() => setCreateEmailTemplateDialog(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Create new email template</DialogTitle>
          <CreateEmailTemplate
            user={user}
            notification={notification}
          />
        </Dialog>
      }


      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}

      {previewTemplate &&
        <Dialog
          open={true}
          onClose={() => {
            setPreviewTemplate(null)
            setUpdateTemplate({ name: null, subject: null, template: null })
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            className={cn({ [classes.editableContent]: !updateTemplate.name })}
          >
            {updateTemplate.name === null ?
              <div
                onClick={() => { setUpdateTemplate({ ...updateTemplate, name: previewTemplate.name }) }}>
                {previewTemplate.name}
              </div>
              :
              <>
                <TextField name='name' value={updateTemplate.name} onChange={(e) => {
                  setUpdateTemplate({ ...updateTemplate, name: e.target.value })
                }} error={error.name}
                  helperText={error.name}
                />
                <Tooltip title="Cancel">
                  <IconButton onClick={() => {
                    setUpdateTemplate({ ...updateTemplate, name: null })
                  }}
                    classes={{ root: classes.smallIconBtn }}
                  >
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Apply">
                  <IconButton onClick={() => {
                    if (!updateTemplate.name) {
                      setError({ ...error, name: 'This field may not be blank' })
                    }
                    else {
                      setPreviewTemplate({ ...previewTemplate, name: updateTemplate.name })
                      setUpdateTemplate({ ...updateTemplate, name: null })
                      onUpdate({ ...previewTemplate, name: updateTemplate.name })
                    }
                  }}

                    classes={{ root: classes.smallIconBtn }}
                  >
                    <DoneIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </>
            }
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={24}>
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
                  <Grid item xs={10}
                    className={cn({ [classes.editableContent]: updateTemplate.subject === null })}
                  >
                    {updateTemplate.subject !== null ?
                      <Grid container>
                        <Grid item xs={10}>
                          <TextField
                            name='subject'
                            value={updateTemplate.subject}
                            onChange={e => {
                              setUpdateTemplate({ ...updateTemplate, subject: e.target.value })
                            }}
                            required
                            fullWidth
                            error={error.subject}
                            helperText={error.subject}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Tooltip title="Cancel">
                            <IconButton onClick={() => {
                              setUpdateTemplate({ ...updateTemplate, subject: null })
                            }}
                              classes={{ root: classes.smallIconBtn }}
                            >
                              <CancelIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Apply">
                            <IconButton onClick={() => {
                              if (!updateTemplate.subject) {
                                setError({ ...error, subject: 'This field may not be blank' })
                              }
                              else {
                                setPreviewTemplate({ ...previewTemplate, subject: updateTemplate.subject })
                                setUpdateTemplate({ ...updateTemplate, subject: null })
                                onUpdate({ ...previewTemplate, subject: updateTemplate.subject })
                              }
                            }}

                              classes={{ root: classes.smallIconBtn }}
                            >
                              <DoneIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      :
                      <div onClick={() => { setUpdateTemplate({ ...updateTemplate, subject: previewTemplate.subject }) }}>
                        {
                          previewTemplate.subject
                        }
                      </div>
                    }
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
                      Template
                  </InputLabel>
                  </Grid>
                  <Grid item xs={10}
                    className={cn({ [classes.editableContent]: updateTemplate.template === null })}
                  >
                    {updateTemplate.template !== null ?
                      <Grid container>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}
                          className='d-flex justify-content-end pt-2'
                        >
                          <Tooltip title="Cancel">
                            <Button onClick={() => {
                              setUpdateTemplate({ ...updateTemplate, template: null })
                              // setEditorState(htmlToState())

                            }}
                              variant='contained'
                              classes={{ root: classes.smallIconBtn }}
                            >
                              Cancel
                            </Button>
                          </Tooltip>
                          &nbsp;
                          <Tooltip title="Apply">
                            <Button onClick={() => {
                              setPreviewTemplate({ ...previewTemplate, template: draftToRaw(editorState) })
                              setUpdateTemplate({ ...updateTemplate, template: null })
                              onUpdate({ ...previewTemplate, template: draftToRaw(editorState) })
                            }}
                              classes={{ root: classes.smallIconBtn }}
                              variant='contained'
                              color='primary'
                            >
                              Update
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      :
                      <div
                        dangerouslySetInnerHTML={{ __html: previewTemplate.template }}
                        onClick={() => {
                          setUpdateTemplate({ ...updateTemplate, template: previewTemplate.template })
                          setEditorState(htmlToState(previewTemplate.template))

                        }}>
                      </div>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      }

      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
            components={{
              Cell: props => {
                return (
                  props.columnDef.field == 'subject' ?
                    <Tooltip title={props.rowData.subject}>
                      <MTableCell {...props}>
                      </MTableCell>
                    </Tooltip> :
                    <MTableCell {...props}>
                    </MTableCell>

                )
              }
            }}
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              {
                title: 'Subject', field: 'subject',

                render: rowData => {
                  return (
                    // <Tooltip title={rowData.subject}>
                    rowData.subject.length > 20 ? rowData.subject.slice(0, 20) + '...' : rowData.subject
                    // </Tooltip>
                  )
                }
              },
              {
                title: 'Created',
                field: 'created',
                render: (rowData) => {
                  return dateFns.format(dateFns.parseISO(rowData.created), 'MM-dd-yyyy HH:mm')
                }
              },
            ]}
            data={mailTemplate.data.map((template, index) => ({
              numeral: index + 1,
              name: template.name,
              created: template.created,
              template,
              subject: template.subject
            }))}
            title="Email Templates"
            actions={[
              {
                icon: 'remove_red_eye',
                tooltip: 'View template',
                onClick: (event, row) => {
                  setPreviewTemplate(row.template)
                },
              },
              {
                icon: 'add',
                tooltip: 'Create Email Template',
                onClick: (event, rows) => {
                  setCreateEmailTemplateDialog(true)
                  // setCreateProduct()
                },
                isFreeAction: true
              }
            ]}
            options={{
              // selection: true,
              filtering: true,
              paging: true,
              actionsColumnIndex: -1

            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(EmailTemplateList);