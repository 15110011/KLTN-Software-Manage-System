import * as React from 'react'

import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useFetchData from '../../CustomHook/useFetchData'
import { CONTACT_URL, GROUP_URL } from "../../common/urls";

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fixTable: {
    maxWidth: '90%',
  }
});
function ContactList(props) {
  const [contacts, setContacts, setContactURL, forceUpdateContact] = useFetchData(CONTACT_URL, props.history, { data: [], total: 0 })
  const [groups, setGroups, setGroupURL, forceUpdateGroup] = useFetchData(GROUP_URL, props.history, { data: [], total: 0 })
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: '#', type: 'numeric' },
              { title: 'Full name', field: 'fullName' },
              { title: 'Email', field: 'email' },
              {
                title: 'Phone',
                field: 'phone',
              },
            ]}
            data={contacts.data.map(
              (c, index) => ({
                '#': index + 1,
                fullName: c.first_name + ' ' + c.last_name,
                email: c.mail,
                phone: c.phone
              })
            )}
            title="Contacts List"
            actions={[
              {
                icon: 'done_all',
                tooltip: 'Do',
                onClick: (event, rows) => {
                  alert('You selected ' + rows.length + ' rows')
                },
              },
            ]}
            options={{
              selection: true,
              filtering: true,
              paging: false
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}


export default withStyles(styles)(ContactList);