import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable, { MTableBodyRow } from 'material-table'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SelectCustom from '../../components/SelectCustom'
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as cn from 'classnames'

// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL, PRODUCT_TYPES_URL, PRODUCT_CATEGORIES_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";
import useFetchData from '../../CustomHook/useFetchData'
import TableHeader from 'material-table/dist/m-table-header'

// Components 
import FormPackage from './FormPackage/FormPackage';
import CustomSnackbar from '../../components/CustomSnackbar'


import styles from './CreateProductStyle'
import FormFeature from './FormFeature/FormFeature';

const MONTHS = [
  { value: '1', label: '1 Month' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '1 Year' },
  { value: '999', label: 'Lifetime' },
]

function CreateProduct(props) {
  const { classes, createProductDialog, handleCloseCreateProductDialog } = props;
  const [createProductStep, setCreateProductStep] = React.useState(1)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [updatingUnit, setUpdatingUnit] = React.useState(-1)
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const [tabIndex, setTabIndex] = React.useState(0)

  const [updateFeatureBtn, setUpdateFeatureBtn] = React.useState(false)
  const [error, setError] = React.useState({})
  const [categoryData, setCategoryData, setURLCategory, forceUpdateCategory] = useFetchData(PRODUCT_CATEGORIES_URL, props.history, {})
  const [productTypeData, setProductTypeData, setURLProductType, forceUpdateProductType] = useFetchData(PRODUCT_TYPES_URL, props.history, {})

  const [createProduct, setCreateProduct] = React.useState({
    name: '',
    desc: '',
    status: '',
    start_sale_date: '',
    start_support_date: '',
    packages: [
      // {
      //   name: '',
      //   prices:
      //     { '1': '' },
      //   discount: 0,
      //   features: [],
      //   numbers: []
      // }
    ],
    features: [],
    product_type: '',
    category: ''
  })

  const [createPackage, setCreatePackage] = React.useState({
    name: '',
    prices:
      { '1': '' },
    discount: 0,
    features: [],
    numbers: []
  })

  const [createFeature, setCreateFeature] = React.useState({
    name: '',
    price: '',
    desc: '',
    number: ''
  })

  const [checkedFeature, setCheckedFeature] = React.useState(false)

  const [featureDialog, setFeatureDialog] = React.useState(false)
  const [packageDialog, setPackageDialog] = React.useState(false)

  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  const [createProductStatus, setCreateProductStatus] = React.useState(false)
  let notiTimeout = {}
  //Clear timer

  const handleOpenFeatureDialog = () => {
    setFeatureDialog(true)
  }

  const handleCloseFeatureDialog = e => {
    setFeatureDialog(false)
  }

  const handleOpenPackageDialog = () => {
    setPackageDialog(true)
  }

  const handleClosePackageDialog = e => {
    setPackageDialog(false)
  }

  const handleChooseFeature = (packageIndex, featureIndex, status) => {
    let clonePackage = createProduct.packages.concat([])

    if (status) {
      clonePackage[packageIndex].features.push({
        ...createProduct.features[featureIndex]
      })
      clonePackage[packageIndex].numbers.push(
        createProduct.features[featureIndex].number
      )
    } else {
      clonePackage[packageIndex].features = clonePackage.slice(0, featureIndex).concat(clonePackage.slice(featureIndex + 1))
      clonePackage[packageIndex].numbers = clonePackage.slice(0, featureIndex).concat(clonePackage.slice(featureIndex + 1))
    }
    setCreateProduct({ ...createProduct, packages: clonePackage })
  }

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

  const handleChangeCategoryAndType = (values, element) => {
    // const products = 
    createProduct[element.name] = values.value
    setCreateProduct({...createProduct})
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
    setFeatureDialog(true)
    setUpdatingUnit(rowData.tableData.id)
    setCreateFeature({
      name: rowData.fname,
      price: rowData.fprice,
      desc: rowData.fdesc,
    })
    setUpdateFeatureBtn(true)
  }

  const onClickUpdateFeature = (e) => {
    handleCloseFeatureDialog()
    const features = createProduct.features.concat([])
    features[updatingUnit] = { ...features[updatingUnit], ...createFeature }
    setCreateProduct({ ...createProduct, features })
    toggleUpdateFeature()
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
  }


  const toggleUpdateFeature = e => {
    setUpdateFeatureBtn(!updateFeatureBtn)
  }

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

  const onChangeCreatePackage = (e) => {
    // let clonePackage = createProduct.packages.concat([])
    // clonePackage[packageIndex][e.target.name] = e.target.value
    setCreatePackage({ ...createPackage, [e.target.name]: e.target.value })
  }

  const handleCreatePackage = e => {
    const packages = createProduct.packages.concat([])
    packages.push({
      name: createPackage.name,
      prices:
        { '1': '', '6': '', '12': '', '999999': '' }
      ,
      discount: 0,
      features: [],
      numbers: []
    })
    setCreateProduct({ ...createProduct, packages })
    handleClosePackageDialog()
    setCreatePackage({
      name: '',
      prices:
        { '1': '', '6': '', '12': '', '999999': '' }
      ,
      discount: 0,
      features: [],
      numbers: []
    })
  }

  const onChangeLicenseInput = (e, packageIndex, curMonth) => {
    const packages = createProduct.packages.concat([])
    packages[packageIndex].prices[curMonth] = e.target.value
    // packages[packageIndex].prices[priceIndex][e.target.name] = e.target.value
    setCreateProduct({ ...createProduct, packages })
  }

  const handleAddPackageForm = () => {
    const packages = createProduct.packages.concat([])
    packages.push({
      name: '',
      prices:
        { '1': '', '6': '', '12': '', '999999': '' }
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
    if (tabIndex == 0) {
      delete cloneProduct.features
      delete cloneProduct.packages
    } else if (tabIndex == 1) {
      delete cloneProduct.packages
    } else {
     
    }
    apiPost(PRODUCTS_URL, cloneProduct, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              apiPostProduct()
              notification()
              setCreateProductStatus(true)
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        else {
          notification()
          setCreateProduct(res.data)
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
    handleCloseFeatureDialog()
  }

  const onChangeCreateProduct = e => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value })
  }
  let packages = {}
  createProduct.packages.forEach((p, packageIndex) => {
    packages[p.name] = { ...p, packageIndex }
  })
  return (
    <div>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice && <CustomSnackbar isErr msg={errNotice} />}
      <BreadcrumbsItem to='/products/add'>Product Informations</BreadcrumbsItem>
      <Dialog
        open={createProductDialog}
        onClose={handleCloseCreateProductDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateProductDialog}>
          Create Product
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <IconButton aria-label="Close" onClick={handleCloseCreateProductDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <AppBar position="static">
            <Tabs value={tabIndex}
              onChange={(e, tabIndex) => {
                setTabIndex(tabIndex)
              }}
            >
              <Tab label="Product" />
              <Tab label="Features" />
              <Tab label="Packages" />
            </Tabs>
          </AppBar>
          <form onSubmit={onCreateProduct}>
            <div style={{ textAlign: 'left', padding: '40px' }}>
              {tabIndex === 0 &&
                <div>
                  <Grid container spacing={40}>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        Product Info
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
                            value={createProduct.start_sale_date}
                            name="start_sale_date"
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
                            Type
                            </InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <SelectCustom
                            options={Object.values(productTypeData).map((g, i) => ({
                              label: `${g.name}`,
                              value: `${g.id}`,
                            }))}
                            handleChange={(values, element) => handleChangeCategoryAndType(values, element)}
                          // data={
                          //   createProduct.actions
                          //     .reduce((acc, g) => {
                          //       acc.push({ label: `${g.label}`, value: g.value })
                          //       return acc
                          //     }, [])
                          // }
                          single
                          placeholder=""
                          label=""
                          name="product_type"
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
                            Category
                            </InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                          <SelectCustom
                            options={Object.values(categoryData).map((g, i) => ({
                              label: `${g.name}`,
                              value: `${g.id}`,
                            }))}
                            handleChange={(values, element) => handleChangeCategoryAndType(values, element)}
                            // data={
                            //   createStep.actions
                            //     .reduce((acc, g) => {
                            //       acc.push({ label: `${g.label}`, value: g.value })
                            //       return acc
                            //     }, [])
                            // }
                            single
                            name="category"
                            placeholder=""
                            label=""
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className="d-flex justify-content-center mt-4">
                      {
                        createProductStatus == false &&
                        <Button
                          type="submit"
                          name="createProduct"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          CREATE product
                    </Button>
                      }
                      {
                        createProductStatus == true &&
                        <Typography
                          component="p"
                          // disabled
                          className={classes.submit}
                          onClick={() => {
                            setTabIndex(1)
                            // onClickButton()
                          }}
                        >
                          Add more feature?
                    </Typography>
                      }
                    </Grid>
                  </Grid>
                </div>
              }
              {tabIndex === 1 &&
                <div>
                  <FormFeature
                    onChangeCreateFeature={onChangeCreateFeature}
                    createFeature={createFeature}
                    error={error}
                    handleCloseFeatureDialog={handleCloseFeatureDialog}
                    handleOpenFeatureDialog={handleOpenFeatureDialog}
                    featureDialog={featureDialog}
                    handleCreateFeature={handleCreateFeature}
                    updateFeatureBtn={updateFeatureBtn}
                    onClickUpdateFeature={onClickUpdateFeature}
                    handleUpdateFeature={handleUpdateFeature}
                  />
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
                        actions={[
                          {
                            icon: 'add',
                            tooltip: 'Add More Feature',
                            onClick: (event, rows) => {
                              setFeatureDialog(true)
                              setCreateFeature({
                                name: '',
                                price: '',
                                desc: '',
                                number: ''
                              })
                            },
                            isFreeAction: true
                          }
                        ]}
                        onRowClick={(e, rowData) => handleUpdateFeature(e, rowData)}
                        title="Feature Info"
                        options={{
                          search: false,
                          paging: false,
                        }}

                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} className="d-flex justify-content-center mt-4">
                      <Button onClick={() => { setTabIndex(0) }} variant="contained" className={classes.button}>
                        BACK
                      </Button>&nbsp;&nbsp;
                      {
                        createProduct.features.length > 0 ?
                          <Button
                            type="submit"
                            name="createProduct"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            CREATE product with features
                      </Button> : <Button
                            disabled
                            type="submit"
                            name="createProduct"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            You have to create features first
                      </Button>
                      }
                    </Grid>
                  </Grid>
                </div>
              }
              {tabIndex === 2 &&
                <div>
                  <Grid container spacing={40}>
                    <FormPackage
                      handleCreatePackage={handleCreatePackage}
                      createPackage={createPackage}
                      onChangeCreatePackage={onChangeCreatePackage}
                      packageDialog={packageDialog}
                      handleClosePackageDialog={handleClosePackageDialog}
                      handleOpenPackageDialog={handleOpenPackageDialog}
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
                    <Grid container spacing={40} className="mt-4">
                      <Grid item xs={12}>
                        <MaterialTable
                          components={{

                          }}
                          columns={
                            ([
                              { title: '#', field: 'numeral', headerStyle: { width: '50px' } },
                              {
                                title: 'Features', field: 'feature', render: rowData => {
                                  if (rowData.isPrice == true) {
                                    return (
                                      <div className="sum-row" style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(0, 0, 0, 0.54)' }}>{rowData.feature}</div>
                                    )
                                  }
                                  return (
                                    <div>{rowData.feature}</div>
                                  )
                                },
                                headerStyle: { width: '300px' }
                              }
                            ]).concat(
                              createProduct.packages.map((p, index) => {
                                return (
                                  {
                                    title: p.name, field: p.name,
                                    render: rowData => {
                                      return (
                                        !rowData.isPrice
                                          ?
                                          <Checkbox
                                            color="primary"
                                            checked={createProduct.packages[index].numbers.includes(createProduct.features[rowData.numeral - 1].number)}
                                            onChange={(e, stt) => handleChooseFeature(index, rowData.numeral - 1, stt)}
                                            name="checkedFeature"
                                          />
                                          : <Grid container spacing={24}>
                                            <Grid className={classes.inputCustom} item xs={4}>
                                              <Input
                                                onChange={(e) => onChangeLicenseInput(e, index, `${rowData.month}`)}
                                                value={createProduct.packages[index].prices[`${rowData.month}`]}
                                                name="prices"
                                                type="number"
                                                classes={{
                                                  underline: classes.cssUnderline,
                                                }}
                                              />
                                            </Grid>
                                          </Grid>
                                      )
                                    }
                                  }
                                )
                              }))
                          }
                          data={
                            createProduct.features.map((f, index) => {
                              return (
                                {
                                  ...packages,
                                  numeral: index + 1,
                                  feature: f.name,
                                }
                              )
                            }).concat(
                              createProduct.features.length > 0 && createProduct.packages.length > 0 ?
                                [
                                  {
                                    numberal: '',
                                    feature: '1 Month',
                                    isPrice: true,
                                    month: 1,
                                    ...packages,
                                  },
                                  {
                                    numberal: '',
                                    feature: '6 Months',
                                    isPrice: true,
                                    month: 6,
                                    ...packages,
                                  },
                                  {
                                    numberal: '',
                                    feature: '12 Months',
                                    isPrice: true,
                                    month: 12,
                                    ...packages,
                                  },
                                  {
                                    numberal: '',
                                    feature: 'Unlimited',
                                    isPrice: true,
                                    month: 999999,
                                    ...packages,
                                  },
                                ] : [])
                          }
                          title="Package Info"
                          actions={[
                            {
                              icon: 'add',
                              tooltip: 'Add Package',
                              onClick: (event, rows) => {
                                setPackageDialog(true)
                              },
                              isFreeAction: true
                            }
                          ]}
                          options={{
                            toolbar: true,
                            paging: false,
                            search: false,
                            sorting: false,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} className={cn("justify-content-center", "mt-3", "d-flex")}>
                        <Button onClick={() => { setTabIndex(1) }} variant="contained" className={classes.button}>
                          BACK
                      </Button>&nbsp;&nbsp;
                      {
                          createProduct.packages.length > 0 && createProduct.packages.findIndex(p => p.features.length == 0) == -1 ?
                            <Button
                              type="submit"
                              name="createProduct"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              CREATE product with packages
                      </Button> :
                            <Button
                              disabled
                              type="submit"
                              name="createProduct"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              You have to choose features for package
                            </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </div>}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);