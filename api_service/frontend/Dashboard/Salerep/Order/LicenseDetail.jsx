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
            <th scope="col">Duration</th>
            <th scope="col">Code</th>
            <th scope="col">Remain Time</th>
          </tr>
        </thead>
        <tbody>
          {
            allLicenses.length > 0 ? allLicenses.map((l, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{l.package.name}</td>
                  <td>{l.start_date}</td>
                  <td>{l.duration} month (s)</td>
                  <td>{l.code}</td>
                  <td>
                    {
                      dateFns.formatDistanceStrict(dateFns.addMonths(new Date(l.start_date), l.duration), new Date(), { unit: 'day', addSuffix: true })
                    }
                  </td>
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