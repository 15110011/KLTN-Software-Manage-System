import * as React from 'react'
import { withStyles } from '@material-ui/core'
import * as dateFns from 'date-fns'

import Button from '@material-ui/core/Button'
import styles from '../SalerepStyles.js'
import { title } from '../../../components/material-dashboard-react.jsx';


function LicenseDetail(props) {

  const { classes, allLicenses, toggleDialog } = props
  console.log(allLicenses)
  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Package Name</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Code</th>
          </tr>
        </thead>
        <tbody>
          {
            allLicenses.length > 0 ? allLicenses.map((l, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{l.package.name}</td>
                  <td>{dateFns.format(dateFns.parseISO(l.start_date), 'dd-MM-yyyy')}</td>
                  <td>{l.code}</td>
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

export default withStyles(styles)(LicenseDetail)