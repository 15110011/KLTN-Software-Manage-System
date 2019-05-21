import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { InputLabel } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import useFetchData from '../../CustomHook/useFetchData'

import CreateEmailTemplate from '../CreateEmailTemplate'
import styles from './Styles'
import CustomFilterRow from '../../components/CustomFilterRow'
import TablePagination from '@material-ui/core/TablePagination'
import CustomSnackbar from '../../components/CustomSnackbar'
import * as dateFns from 'date-fns'

// API
import { MAIL_TEMPLATES_URL, REFRESH_TOKEN_URL, PACKAGES_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function EmailTemplateList(props) {
  const [createEmailTemplateDialog, setCreateEmailTemplateDialog] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const { classes, user } = props;
  const search = {}
  const [activePage, setActivePage] = React.useState(0)
  const [rowPerPage, setRowPerPage] = React.useState(1)
  const [previewTemplate, setPreviewTemplate] = React.useState(null)



  const tableRef = React.useRef(null)



  const [mailTemplate, setEmailTemplateData, setEmailTemplateURL, forceUpdateEmailTemplate] = useFetchData(MAIL_TEMPLATES_URL, props.history, { data: [], total: 0 })
  const handleCloseCreateEmailTemplateDialog = e => {
    setCreateEmailTemplateDialog(false)
  }

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m)
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    tableRef.current.onQueryChange()
  }

  return (
    <div className={classes.root}>
      {createEmailTemplateDialog &&
        <Dialog open={true} onClose={() => setCreateEmailTemplateDialog(false)}
         fullWidth
          maxWidth="lg" 
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
          onClose={() => { setPreviewTemplate(null) }}
        >
          <DialogTitle>
            Preview
          </DialogTitle>
          <DialogContent dangerouslySetInnerHTML={{ __html: previewTemplate.template }}>

          </DialogContent>
        </Dialog>
      }

      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
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
              template
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