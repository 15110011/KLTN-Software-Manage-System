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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as cn from 'classnames'

// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import TableHeader from 'material-table/dist/m-table-header'

// Components 
import FormPackage from './FormPackage/FormPackage';
import CustomSnackbar from '../../components/CustomSnackbar'


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
  const [updatingUnit, setUpdatingUnit] = React.useState(-1)
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })

  const [updateFeatureBtn, setUpdateFeatureBtn] = React.useState(false)
  const [error, setError] = React.useState({})

  const [createProduct, setCreateProduct] = React.useState({
    name: '',
    desc: '',
    status: 'ACTIVE',
    saleStarDate: '',
    supportStartDate: '',
    packages: [
      {
        name: '',
        prices:
          { '1': '' },
        discount: 0,
        features: [],
        numbers: []
      }
    ],
    features: []
  })

  const [createFeature, setCreateFeature] = React.useState({
    name: '',
    price: '',
    desc: '',
    number: ''
  })

  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  let notiTimeout = {}
  //Clear timer

  const notification = e => {
    setCompleteNotice('Successfully Added')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
  }

  React.useEffect(() => {
    // Cleanup
    return () => {
      Object.keys(notiTimeout).forEach(k => {
        clearTimeout(notiTimeout[k])
      })
    }
  })

  const isUserTyped = {
    "1": false, "6": false, "12": false, "999": false
  }
  const handleChangeSelect = (values, element, packageIndex) => {
    const packages = createProduct.packages.concat([])
    packages[packageIndex].numbers = values

    Object.keys(packages[packageIndex].prices).forEach(m => {
      if (!isUserTyped[m]) {
        packages[packageIndex].prices[m] = packages[packageIndex].numbers.reduce((acc, n) => {
          return acc += parseInt(n.price)
        }, 0) * parseInt(m)
      }
    })

    setCreateProduct({ ...createProduct, packages })

  }



  const handleDeleteFeature = (e, unitIndex) => {
    e.stopPropagation()
    let features = createProduct.features.concat([])
    features = features.slice(0, unitIndex)
      .concat(features.slice(unitIndex + 1))
    setCreateProduct({ ...createProduct, features })
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
  }

  const handleUpdateFeature = (e, rowData) => {
    setUpdatingUnit(rowData.tableData.id)
    setCreateFeature({
      name: rowData.fname,
      price: rowData.fprice,
      desc: rowData.fdesc,
    })
    setUpdateFeatureBtn(true)
  }

  const onClickUpdateFeature = (e) => {
    const features = createProduct.features.concat([])
    features[updatingUnit] = { ...features[updatingUnit], ...createFeature }
    setCreateProduct({ ...createProduct, features })
    toggleUpdateFeature()
  }


  const toggleUpdateFeature = e => {
    setUpdateFeatureBtn(!updateFeatureBtn)
  }

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
      const pricePerMonth = packages[packageIndex].numbers.reduce((acc, n) => {
        return acc += parseInt(n.price)
      }, 0)
      packages[packageIndex].prices = { ...packages[packageIndex].prices, [remainMonths[0].value]: pricePerMonth * parseInt(remainMonths[0].value) }
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
      if (e.target.value != curMonth) {

        packages[packageIndex].prices[e.target.value] = packages[packageIndex].prices[curMonth]
        delete packages[packageIndex].prices[curMonth]
      }
    }
    else if (e.target.name == 'value') {
      console.log(packageIndex)
      packages[packageIndex].prices[curMonth] = e.target.value
    }
    else {
      packages[packageIndex][e.target.name] = e.target.value

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
      features: [],
      numbers: []
    })
    setCreateProduct({ ...createProduct, packages })
  }

  const handleRemovePackageForm = (packageIndex) => {
    let packages = createProduct.packages.concat([])
    if (packages.length == 1) {
      return;
    } else {
      packages = packages.slice(0, packageIndex)
        .concat(packages.slice(packageIndex + 1))
      setCreateProduct({ ...createProduct, packages })
    }
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
    // if (buttonName == 'nextProduct') {
    //   return
    // }
    // else {
    // }
    apiPostProduct()
  }



  const apiPostProduct = () => {
    const cloneProduct = JSON.parse(JSON.stringify(createProduct))
    cloneProduct.packages = cloneProduct.packages.map(p => {
      p.numbers = p.numbers.map(n => n.number)
      return p
    })
    apiPost(PRODUCTS_URL, cloneProduct, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              this.props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostProduct()
              notification()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          notification()
        }
      })
  }

  const handleCreateFeature = (e) => {
    const features = createProduct.features.concat([])
    let err = {}
    if (createFeature.name == '') {
      err.fname = 'You must fill in feature name field'
    }
    if (createFeature.price == '') {
      err.fprice = 'You must fill in feature price field'
    }
    if (!Object.keys(err).length) {
      features.push({ ...createFeature, number: features.length + 1 })
      setCreateProduct({ ...createProduct, features })
    }
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
    setError({ ...err })
  }

  const onChangeCreateProduct = e => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice && <CustomSnackbar isErr msg={errNotice} />}
      <BreadcrumbsItem to='/products/add'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Paper className={classes.paper}>
          <form onSubmit={(e) => {
            onCreateProduct(e)
          }
          }>
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
                          value={createProduct.name}
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
                          Description
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
                          Status
                          </InputLabel>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth className={classes.formControl}>
                          <Select
                            value={createProduct.status}
                            onChange={onChangeCreateProduct}
                            displayEmpty
                            name="status"
                            className={classes.selectEmpty}
                          >
                            <MenuItem value="ACTIVE">
                              ACTIVE
                            </MenuItem>
                            <MenuItem value="INACTIVE">IN-ACTIVE</MenuItem>
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
                            error={error.fname}
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
                            error={error.fprice}
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
                    <Grid item xs={12}>
                      {
                        Object.keys(error).map(k => (<p className="text-danger">
                          {error[k]}
                        </p>
                        ))
                      }
                    </Grid>
                    <Grid item xs={12} className="d-flex justify-content-center">

                      {
                        updateFeatureBtn == false &&
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                          onClick={handleCreateFeature}
                        >
                          Add Feature
                      </Button>
                      }
                      {
                        updateFeatureBtn == true &&
                        <>
                          <Button
                            type="button"
                            variant="contained"
                            color="default"
                            onClick={toggleUpdateFeature}
                          >
                            cancel
                      </Button>
                          &nbsp;
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={onClickUpdateFeature}
                          >
                            Update
                      </Button>
                        </>
                      }
                    </Grid>
                  </Grid>

                  <Grid container spacing={40} className="mt-4">
                    <Grid item xs={12}>
                      <MaterialTable
                        // components={{ Header: TableHeader}}
                        columns={[
                          // { render: () => { return (<div>cac</div>) } },
                          { title: '#', field: 'numeral' },
                          { title: 'Feature Name', field: 'fname' },
                          { title: 'Feature Price', field: 'fprice', type: 'numeric' },
                          {
                            title: 'Feature Description',
                            field: 'fdesc',
                          },
                          { title: 'Action', field: 'action' }
                        ]}
                        data={
                          createProduct.features.map((f, index) => {
                            return ({
                              numeral: (index + 1),
                              fname: (f.name),
                              fprice: (f.price),
                              fdesc: (f.desc),
                              action:
                                <IconButton name="deleteFeature" onClick={(e) => handleDeleteFeature(e, index)} aria-label="Delete" className={classes.margin}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                            })
                          })
                        }
                        onRowClick={(e, rowData) => handleUpdateFeature(e, rowData)}
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
                        // onClickButton()
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
                    handleChangeSelect={handleChangeSelect}
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
            </p>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);