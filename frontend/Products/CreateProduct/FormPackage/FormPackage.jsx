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
  const [anchorEl, setAnchorEl] = React.useState(null)

  const [createProduct, setCreateProduct] = React.useState({
    productName: '',
    description: '',
    active: 'ACTIVE',
    saleStarDate: '',
    supportStartDate: '',
    packages: [
      {
        name: '',
        prices: [
          { month: '', value: '' }
        ],
        discount: 0,
        features: []
      }
    ],
    features: []
  })
  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  let InputLabelRef = ''
  const onLicenseTypeClick = (packageIndex) => {
    const packages = createProduct.packages.concat([])
    packages[packageIndex].prices.push({ month: '', value: '' })
    setCreateProduct({ ...createProduct, packages })
  }

  const onRemoveLicenseType = (packageIndex, priceIndex) => {
    const packages = createProduct.packages.concat([])
    packages[packageIndex].prices = packages[packageIndex].prices.slice(0, priceIndex)
      .concat(packages[packageIndex].prices.slice(priceIndex + 1))
    setCreateProduct({ ...createProduct, packages })
  }

  const onChangeLicenseInput = (e, packageIndex, priceIndex) => {
    const packages = createProduct.packages.concat([])
    packages[packageIndex].prices[priceIndex][e.target.name] = e.target.value
    setCreateProduct({ ...createProduct, packages })
  }

  const handleAddPackageForm = () => {
    const packages = createProduct.packages.concat([])
    packages.push({
      name: '',
      prices: [
        { month: '', value: '' }
      ],
      discount: 0,
      features: []
    })
    setCreateProduct({ ...createProduct, packages })
  }

  const handleRemovePackageForm = (packageIndex) => {
    let packages = createProduct.packages.concat([])
    packages = packages.slice(0, packageIndex)
    .concat(packages.slice(packageIndex + 1))
    setCreateProduct({ ...createProduct, packages })
  }

  const handleChangeSearch = search => e => {
    setSearch(e.target.value);
  };
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const { classes, theme } = props;
  const handleChange = e => {
    setAddBtn({ [e.target.name]: e.target.value });
  }
  return (
    <div>
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
                      p.prices.map((price, priceIndex) => {
                        let thisScopeIndex = priceIndex
                        return (
                          <>
                            <FormLicensePrice key={`priceIndex${thisScopeIndex}`}
                              onRemoveLicenseType={() => { onRemoveLicenseType(packageIndex, thisScopeIndex) }}
                              price={price}
                              onInputChange={(e) => onChangeLicenseInput(e, packageIndex, thisScopeIndex)}
                              months={
                                MONTHS.reduce((acc, m) => {
                                  if (p.prices.findIndex(pr => pr.month == m.value && pr.month != price.month) == -1) {
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
    </div>
  )
}

export default withStyles(styles)(FormPackage);