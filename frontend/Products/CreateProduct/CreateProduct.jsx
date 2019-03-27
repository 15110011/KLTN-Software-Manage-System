import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable from 'material-table'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as cn from 'classnames'
// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 
import FormPackage from './FormPackage/FormPackage';


import styles from './CreateProductStyle'

const MONTHS = [
  { value: '1', label: '1 Month' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '1 Year' },
  { value: '999', label: 'Lifetime' },
]

function CreateProduct(props) {
  const [createProductStep, setCreateProductStep] = React.useState(1)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const [error, setError] = React.useState({})

  const [createProduct, setCreateProduct] = React.useState({
    productName: '',
    description: '',
    active: 'ACTIVE',
    saleStarDate: '',
    supportStartDate: '',
    packages: [
      {
        name: '',
        prices:
          { '1': '' },
        discount: 0,
        features: []
      }
    ],
    features: []
  })

  const [createFeature, setCreateFeature] = React.useState({
    name: '',
    price: '',
    desc: ''
  })

  const { classes } = props;


  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  let InputLabelRef = ''

  const onLicenseTypeClick = (packageIndex) => {
    const packages = createProduct.packages.concat([])
    const remainMonths = MONTHS.reduce((acc, m) => {
      if (Object.keys(createProduct.packages[packageIndex].prices).findIndex(pr => pr == m.value) == -1) {
        acc.push({ value: m.value })
      }
      return acc
    }, [])
    if (remainMonths.length != 0) {
      packages[packageIndex].prices = { ...packages[packageIndex].prices, [remainMonths[0].value]: '' }
      setCreateProduct({ ...createProduct, packages })
    }

  }

  const onRemoveLicenseType = (packageIndex, month) => {

    const packages = createProduct.packages.concat([])

    delete packages[packageIndex].prices[month]
    setCreateProduct({ ...createProduct, packages })

  }

  const onChangeLicenseInput = (e, packageIndex, curMonth) => {
    const packages = createProduct.packages.concat([])
    if (e.target.name == 'month') {
      // if (!packages[packageIndex].prices[cur]) {
      //   packages[packageIndex].prices[e.target.value] = ''
      // }
      // else {
      if (e.target.value != curMonth) {
        packages[packageIndex].prices[e.target.value] = packages[packageIndex].prices[curMonth]
        delete packages[packageIndex].prices[curMonth]
      }    // }
    }
    else if (e.target.name == 'value') {
      packages[packageIndex].prices[curMonth] = e.target.value
    }
    // packages[packageIndex].prices[priceIndex][e.target.name] = e.target.value
    setCreateProduct({ ...createProduct, packages })
  }

  const handleAddPackageForm = () => {
    const packages = createProduct.packages.concat([])
    packages.push({
      name: '',
      prices:
        { '1': '' }
      ,
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

  const handleChange = e => {
    setAddBtn({ [e.target.name]: e.target.value });
  }

  const buttonRef = React.useRef(null)
  const onClickButton = () => {
    buttonRef.current.click()
  }

  const onChangeCreateFeature = e => {
    setCreateFeature({ ...createFeature, [e.target.name]: e.target.value })
  }

  const onCreateProduct = (e, buttonName) => {
    e.preventDefault()
    if (buttonName == 'nextProduct') {
      return
    }
    else {
      apiPostProduct()
    }
  }

  const apiPostProduct = () => {
    apiPost(PRODUCTS_URL, createProduct, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              this.props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostProduct()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          props.history.push('/products')
        }
      })
  }

  const handleCreateFeature = (e) => {
    const features = createProduct.features.concat([])
    features.push(createFeature)

    setCreateProduct({ ...CreateProduct, features })
  }

  const onChangeCreateProduct = e => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/products/add'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Paper className={classes.paper}>
          <form onSubmit={() => onCreateProduct(e, buttonName)}>
            <div style={{ textAlign: 'left', padding: '40px' }}>
              {
                createProductStep == 1 &&
                <Grid container spacing={40}>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      Product Detail
                      </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={40}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          required
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Product Name
                            </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          fullWidth
                          required
                          onChange={onChangeCreateProduct}
                          value={createProduct.productName}
                          name="name"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={40} >
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Product Description
                            </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          fullWidth
                          onChange={onChangeCreateProduct}
                          value={createProduct.desc}
                          name="desc"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={40}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          required
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Product Active
                          </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth className={classes.formControl}>
                          <Select
                            value={createProduct.active}
                            onChange={onChangeCreateProduct}
                            displayEmpty
                            name="Active"
                            className={classes.selectEmpty}
                          >
                            <MenuItem value="active">
                              ACTIVE
                            </MenuItem>
                            <MenuItem value="inactive">IN-ACTIVE</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={40}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          required
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Sales Start Date
                    </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          fullWidth
                          required
                          onChange={onChangeCreateProduct}
                          value={createProduct.saleStarDate}
                          name="saleStarDate"
                          type="date"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={40}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          required
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
                        >
                          Support Start Date
                            </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          fullWidth
                          required
                          onChange={onChangeCreateProduct}
                          value={createProduct.supportStartDate}
                          name="supportStartDate"
                          type="date"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="my-4">
                    <Divider />
                  </Grid>
                  <Grid container spacing={40}>
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom>
                        Feature Info
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={40}>
                        <Grid className={classes.inputCustom} item xs={4}>
                          <InputLabel
                            required
                            htmlFor="custom-css-standard-input"
                            classes={{
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            }}
                          >
                            Feature Name
                            </InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <Input
                            fullWidth
                            required
                            onChange={onChangeCreateFeature}
                            value={createFeature.name}
                            name="name"
                            classes={{
                              underline: classes.cssUnderline,
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={40}>
                        <Grid className={classes.inputCustom} item xs={4}>
                          <InputLabel
                            required
                            htmlFor="custom-css-standard-input"
                            classes={{
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            }}
                          >
                            Feature Price
                              </InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <Input
                            fullWidth
                            required
                            type="number"
                            onChange={onChangeCreateFeature}
                            value={createFeature.price}
                            name="price"
                            classes={{
                              underline: classes.cssUnderline,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={40}>
                        <Grid className={classes.inputCustom} item xs={4}>
                          <InputLabel
                            htmlFor="custom-css-standard-input"
                            classes={{
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            }}
                          >
                            Feature Description
                            </InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <Input
                            fullWidth
                            onChange={onChangeCreateFeature}
                            value={createFeature.desc}
                            name="desc"
                            classes={{
                              underline: classes.cssUnderline,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={12} className="d-flex justify-content-center">
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateFeature}
                      >
                        Add Feature
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={40} className="mt-4">
                    <Grid item xs={12}>
                      <MaterialTable
                        columns={[
                          { title: '#', field: 'numeral' },
                          { title: 'Feature Name', field: 'fname' },
                          { title: 'Feature Price', field: 'fprice', type: 'numeric' },
                          {
                            title: 'Feature Description',
                            field: 'fdesc',
                          },
                        ]}
                        data={
                          createProduct.features.map((f, index) => {
                            return ({
                              numeral: (index + 1),
                              fname: (f.name),
                              fprice: (f.price),
                              fdesc: (f.desc)
                            })
                          })
                        }
                        title="Basic"
                        options={{
                          toolbar: false,
                          paging: false,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="d-flex justify-content-center mt-4">
                    <Button
                      // disabled
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => {
                        setCreateProductStep(2)
                        onClickButton()
                      }}
                    >
                      Next
                        </Button>
                  </Grid>
                </Grid>
              }
              {
                createProductStep == 2 &&
                <Grid container spacing={40}>
                  <Grid container spacing={40}>
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom>
                        Package Info
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <FormPackage
                    handleProfileMenuOpen={handleProfileMenuOpen}
                    createProduct={createProduct}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    onRemoveLicenseType={onRemoveLicenseType}
                    handleAddPackageForm={handleAddPackageForm}
                    onLicenseTypeClick={onLicenseTypeClick}
                    onChangeLicenseInput={onChangeLicenseInput}
                    handleRemovePackageForm={handleRemovePackageForm}
                  />
                  <Grid container>
                    <Grid item xs={12} className={cn("justify-content-center", "mt-3", "d-flex")}>
                      <Button onClick={() => { setCreateProductStep(1) }} variant="contained" className={classes.button}>
                        BACK
                      </Button>&nbsp;&nbsp;
                      <Button
                        type="submit"
                        name="createProduct"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        CREATE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
              <input type="submit" name="nextProduct" className="d-none" ref={buttonRef}></input>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);