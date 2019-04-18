import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import * as dateFns from 'date-fns'

import Button from '@material-ui/core/Button'
import MaterialTable from 'material-table'
import styles from './SalerepStyles.js'
import { title } from '../../components/material-dashboard-react.jsx';


function ContactDetail(props) {

  const { classes, contactHistories, contact, toggleDialog } = props


  return (
    <Dialog open={true} onClose={toggleDialog} classes={{ paper: classes.rootTransparent }}>
      <DialogContent style={{ overflowY: 'hidden' }} id='material-force-height'>
        <MaterialTable
          columns={[
            { title: 'Action', field: 'action' },
            { title: 'Contact', field: 'contactName' },
            { title: 'Date', field: 'created' },
          ]}
          data={
            contactHistories.map(h => {
              return ({
                action: h.action,
                contactName: contact.first_name + ' ' + contact.last_name,
                created: dateFns.format(h.created, 'DD-MM-YYYY')
              })
            })
          }
          title="Contact Histories"
          actions={[{
            icon: 'close',
            tooltip: 'Close Dialog',
            onClick: (event, row) => {
              toggleDialog()
            },
            isFreeAction: true
          }]}
          maxBodyHeight='600px'
          options={{
            filtering: false,
            sorting: false,
            search: false

          }}

        />
      </DialogContent>

    </Dialog>

 
}



export default withStyles(styles)(ContactDetail)