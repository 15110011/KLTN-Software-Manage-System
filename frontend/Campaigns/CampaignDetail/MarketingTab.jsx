import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './CampaignDetailStyle'

function MarketingTab(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              { title: 'Description', field: 'desc' },
              {
                title: 'Status',
                field: 'status',
              },
            ]}
            data={[
              { numeral: '1' },
              { name: 'aaa' },
              { desc: 'aa' },
              {
                status: (
                  <>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      aria-owns={Boolean(anchorEl) ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={handleMenuOpen}
                      color="default"
                    >
                      Actions
                      </Button>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)} >
                      <MenuItem onClick={() => {
                        // handleAddPackageForm()
                      }}>
                        Add
                        </MenuItem>
                      <MenuItem onClick={() => {
                        // handleRemovePackageForm(packageIndex) 
                      }}>Remove</MenuItem>
                    </Menu>
                  </>
                )
              },
            ]}
            title="Marketing List"
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
              paging: true
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MarketingTab);