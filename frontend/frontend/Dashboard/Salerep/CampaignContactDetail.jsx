import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import * as dateFns from 'date-fns'

import Button from '@material-ui/core/Button'
import MaterialTable from 'material-table'
import styles from './SalerepStyles.js'
import { title } from '../../components/material-dashboard-react.jsx';
import stateHashes from '../../common/StateHash'


function CampaignContactDetail(props) {

  const { classes, allContacts, toggleDialog } = props
  return (
    // <Dialog open={true} onClose={toggleDialog} classes={{ paper: classes.rootTransparent }}>
    //   <DialogContent style={{ overflowY: 'hidden' }} id='material-force-height'>
    //     <MaterialTable
    //       columns={[
    //         { title: 'Action', field: 'action' },
    //         { title: 'Contact', field: 'contactName' },
    //         { title: 'Date', field: 'created' },
    //       ]}
    //       data={
    //         allContacts.map(h => {
    //           return ({
    //             action: h.action,
    //             contactName: contact.first_name + ' ' + contact.last_name,
    //             created: dateFns.format(dateFns.parseISO(h.created), 'dd-MM-yyyy')
    //           })
    //         })
    //       }
    //       title="Contact Histories"
    //       actions={[{
    //         icon: 'close',
    //         tooltip: 'Close Dialog',
    //         onClick: (event, row) => {
    //           toggleDialog()
    //         },
    //         isFreeAction: true
    //       }]}
    //       maxBodyHeight='600px'
    //       options={{
    //         filtering: false,
    //         sorting: false,
    //         search: false
    //       }}
    //     />
    //   </DialogContent>
    // </Dialog>
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">State</th>
            <th scope="col">Organization</th>
            {/* <th scope="col">Direction</th> */}
          </tr>
        </thead>
        <tbody>
          {
            allContacts.length > 0 ? allContacts.map((c, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{c.first_name + ' ' + c.last_name}</td>
                  <td>{c.mail}</td>
                  <td>{c.phone}</td>
                  <td>{stateHashes[c.state]}</td>
                  <td>{c.org}</td>
                  {/* <td>IN</td> */}
                </tr>
              )
            }) :
              <tr>
                <td colSpan="5" className="text-center" style={{ color: '#707070' }}>
                  No records to display
              </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default withStyles(styles)(CampaignContactDetail)