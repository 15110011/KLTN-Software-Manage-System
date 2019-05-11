import * as React from 'react'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import * as dateFns from 'date-fns'

import Button from '@material-ui/core/Button'
import MaterialTable from 'material-table'
import styles from '../SalerepStyles.js'
import { title } from '../../components/material-dashboard-react.jsx';


function AllContactDetail(props) {

  const { classes, contactHistories, contact, toggleDialog } = props
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
    //         contactHistories.map(h => {
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
            <th scope="col">Date time</th>
            <th scope="col">Action</th>
            <th scope="col">Contact</th>
            <th scope="col">Campaign</th>

            {/* <th scope="col">Direction</th> */}
          </tr>
        </thead>
        <tbody>
          {
            contactHistories.length > 0 ? contactHistories.map((h, index) => {
              return (
                <tr key={index}>
                  <td>{dateFns.format(dateFns.parseISO(h.created), 'MM/dd/yyyy HH:mm')}</td>
                  <td>{h.action}</td>
                  <td>{contact.first_name + ' ' + contact.last_name}</td>
                  <td>
                    <Link to={`campaigns/${h.campaign.id}`}>
                      {h.campaign.name}
                    </Link>
                  </td>
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

export default withStyles(styles)(AllContactDetail)