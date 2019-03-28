import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/PersonPin';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import FormLicensePrice from '../FormLicensePrice/FormLicensePrice'


import styles from './FormPackageStyle'

const MONTHS = [
  { value: '1', label: '1 Month' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '1 Year' },
  { value: '999', label: 'Lifetime' },
]

function FormPackage(props) {
  const {
    createProduct,
    classes,
    anchorEl,
    handleProfileMenuOpen,
    onRemoveLicenseType,
    handleAddPackageForm,
    setAnchorEl,
    onLicenseTypeClick,
    onChangeLicenseInput,
    handleRemovePackageForm
  } = props;

  return (
    <Grid item xs={12}>
      <MaterialTable
        columns={[
          { title: '', field: 'actions' },
          { title: 'Package Name', field: 'packageName' },
          { title: 'Sell Price', field: 'sellPrice' },
          {
            title: 'Notes', field: 'notes',
          },
        ]}
        data={
          createProduct.packages.map((p, packageIndex) => {
            return (
              {
                actions:
                  (
                    <>
                      <Button
                        variant="outlined"
                        className={classes.button}
                        aria-owns={Boolean(anchorEl) ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
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
                          handleAddPackageForm()
                        }}>
                          Add
                        </MenuItem>
                        <MenuItem onClick={() => { handleRemovePackageForm(packageIndex) }}>Remove</MenuItem>
                      </Menu>
                    </>
                  )
                ,
                packageName:
                  (<form className={classes.container} noValidate autoComplete="off">
                    <Grid container>
                      <Grid item xs={12} className="mb-3">
                        <Input
                          placeholder="Type package's name..."
                          fullWidth
                          className={classes.input}
                          inputProps={{
                            'aria-label': 'Package Name',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="outlined" color="default" className={classes.addFeatureButton}>
                          Add Feature
                                  {/* <AddIcon className={classes.addIcon} /> */}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>)
                ,
                sellPrice:
                  (<div style={{ display: 'inline-grid' }}>
                    {
                      Object.keys(p.prices).map((pkey, priceIndex) => {
                        let thisScopeIndex = priceIndex
                        return (
                          <>
                            <FormLicensePrice key={`priceIndex${thisScopeIndex}`}
                              onRemoveLicenseType={() => { onRemoveLicenseType(packageIndex, pkey) }}
                              price={{ value: p.prices[pkey], month: pkey }}
                              onInputChange={(e, curMonth) => onChangeLicenseInput(e, packageIndex, curMonth)}
                              months={
                                MONTHS.reduce((acc, m) => {
                                  if (Object.keys(p.prices).findIndex(pr => pr == m.value && pr != pkey) == -1) {
                                    acc.push(<MenuItem value={m.value}>{m.label}</MenuItem>)
                                  }
                                  return acc
                                }, [])
                              }
                            />

                          </>
                        )
                      })
                    }
                    <Button onClick={() => {
                      onLicenseTypeClick(packageIndex)
                    }} variant="outlined" color="default" className={(classes.addFeatureButton, "mt-3")}>
                      License Price
                            </Button>
                  </div>)
                ,
                notes:
                  (<Input
                    fullWidth
                    placeholder="Notes"
                    className={classes.input}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />)

              }
            )
          })
        }
        title="Basic"
        options={{
          toolbar: false,
          paging: false,
        }}
      />
    </Grid>
  )
}

export default withStyles(styles)(FormPackage);