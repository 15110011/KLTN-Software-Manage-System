import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Components
import FormLicensePrice from '../FormLicensePrice/FormLicensePrice'
import SelectCustom from '../../../components/SelectCustom'


import styles from './FormPackageStyle'
import { element } from 'prop-types';

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
    onChangeCreatePackage,
    anchorEl,
    handleProfileMenuOpen,
    onRemoveLicenseType,
    handleAddPackageForm,
    setAnchorEl,
    onLicenseTypeClick,
    onChangeLicenseInput,
    handleRemovePackageForm,
    handleChangeSelect,
    setPackageDialog,
    packageDialog,
    handleClosePackageDialog,
    handleOpenPackageDialog,
    createPackage,
    handleCreatePackage
  } = props;
  return (
    <div className={classes.root}>
      <Dialog
        open={packageDialog}
        onClose={handleClosePackageDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogContent style={{ padding: '50px' }}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Typography variant="h6">
                Package Info
              </Typography>
              <Divider className="mt-2" />
              <br />
              <Input
                placeholder="Type package's name..."
                fullWidth
                className={classes.input}
                inputProps={{
                  'aria-label': 'Package Name',
                }}
                name='name'
                // value={createPackage.name}
                onChange={onChangeCreatePackage}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '0 10px' }}>
          <Button onClick={handleClosePackageDialog} color="default">
            cancel
            </Button>
          <Button onClick={handleCreatePackage} color="primary">
            Create
            </Button>
        </DialogActions>
      </Dialog>
    </div >
    {/* <Grid item xs={12}>
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
                          name='name'
                          value={p.name}
                          onChange={(e) => onChangeLicenseInput(e, packageIndex)}

                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectCustom
                          options={createProduct.features.map(f => ({ label: f.name + `(${numeral(f.price).format('0,0.00')} VND)`, value: f.number, ...f }))}
                          handleChange={(values, element) => handleChangeSelect(values, element, packageIndex)}
                          data={
                            createProduct.packages[packageIndex].numbers
                              .reduce((acc, p) => {
                                acc.push({ label: p.name, value: p.number, ...p })
                                return acc
                              }, [])
                          }
                          multi
                          placeholder=""
                          label="Features"
                        />
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
                    onChange={(e) => onChangeLicenseInput(e, packageIndex)}
                    name='note'
                    value={p.note}
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
    </Grid> */}
  )
}

export default withStyles(styles)(FormPackage);