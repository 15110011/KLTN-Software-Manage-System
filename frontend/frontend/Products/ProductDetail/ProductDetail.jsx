import * as React from 'react'
import ReactDOM from 'react-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import AppBar from '@material-ui/core/AppBar';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import IconButton from '@material-ui/core/IconButton';
import CustomSnackbar from '../../components/CustomSnackbar'
import * as numeral from 'numeral'
import * as NumberFormat from 'react-number-format';
import NumberFormatCustom from '../../components/NumberFormatCustom'

// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 
import SelectCustom from '../../../components/SelectCustom'
import FormLicensePrice from '../CreateProduct/FormLicensePrice/FormLicensePrice'
import FormFeature from '../CreateProduct/FormFeature/FormFeature'
import FormPackage from '../CreateProduct/FormPackage/FormPackage'

import styles from './ProductDetailStyle'

const MONTHS = [
  { value: '1', label: '1 Month' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '1 Year' },
  { value: '999', label: 'Lifetime' },
]


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function ProductDetail(props) {
  const { classes, theme } = props;
  const [value, setValue] = React.useState(0)
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const [packageDialog, setPackageDialog] = React.useState(false)

  const [featureDialog, setFeatureDialog] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [error, setError] = React.useState({})
  const [updatingUnit, setUpdatingUnit] = React.useState(-1)
  const [updateFeatureBtn, setUpdateFeatureBtn] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const [createPackage, setCreatePackage] = React.useState({
    name: '',
    prices:
      { '1': '' },
    discount: 0,
    features: [],
    numbers: []
  })
  const [productDetailData, setProductDetailData] = React.useState({
    name: '',
    desc: '',
    status: 'ACTIVE',
    start_sale_date: '',
    start_support_date: '',
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

  const handleChooseFeature = (packageIndex, feature, status) => {
    let clonePackage = productDetailData.packages.concat([])

    if (status) {
      clonePackage[packageIndex].features.push(feature)
      clonePackage[packageIndex].numbers.push(feature.number)
    } else {
      let featureIndex = clonePackage[packageIndex].features.findIndex(f=>{
        return f.id == feature.id})
      clonePackage[packageIndex].features = clonePackage[packageIndex].features.slice(0, featureIndex).concat(clonePackage[packageIndex].features.slice(featureIndex + 1))
      clonePackage[packageIndex].numbers = clonePackage[packageIndex].numbers.slice(0, featureIndex).concat(clonePackage[packageIndex].numbers.slice(featureIndex + 1))
      console.log(clonePackage[packageIndex].features ) 
    }
    setProductDetailData({ ...productDetailData, packages: clonePackage })
  }

  const [createFeature, setCreateFeature] = React.useState({
    name: '',
    price: '',
    desc: '',
    number: ''
  })


  const toggleUpdateFeature = e => {
    setUpdateFeatureBtn(!updateFeatureBtn)
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
    })
  }

  const updateNotification = () => {
    setCompleteNotice('Succesfully updated')
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000)
  }

  const onClickUpdateFeature = (e) => {
    handleCloseFeatureDialog()
    const features = productDetailData.features.concat([])
    features[updatingUnit] = { ...features[updatingUnit], ...createFeature }
    setProductDetailData({ ...productDetailData, features })
    toggleUpdateFeature()
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
  }



  const handleCreateFeature = (e) => {
    const features = productDetailData.features.concat([])
    let err = {}
    if (createFeature.name == '') {
      err.fname = 'You must fill in feature name field'
    }
    if (createFeature.price == '') {
      err.fprice = 'You must fill in feature price field'
    }
    if (!Object.keys(err).length) {
      let number = 1
      if (features[features.length - 1]) { number = features[features.length - 1].number + 1 }
      console.log(productDetailData)
      features.push({ ...createFeature, number })
      console.log({ ...productDetailData, features })

      setProductDetailData({ ...productDetailData, features })
    }
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
    setError({ ...err })
  }

  const handleDeleteFeature = (e, unitIndex) => {
    e.stopPropagation()
    let features = productDetailData.features.concat([])
    features = features.slice(0, unitIndex)
      .concat(features.slice(unitIndex + 1))
    setProductDetailData({ ...productDetailData, features })
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
  }

  React.useEffect(() => {
    getProductDetail()
  }, [])

  const getProductDetail = () => {
    const id = props.match.params.id
    apiGet(PRODUCTS_URL + "/" + id, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        setProductDetailData({ ...res.data })
      })
  }

  const handleOpenPackageDialog = () => {
    setPackageDialog(true)
  }

  const handleClosePackageDialog = () => {
    setPackageDialog(false)
  }

  const onChangeCreatePackage = (e) => {
    // let clonePackage = createProduct.packages.concat([])
    // clonePackage[packageIndex][e.target.name] = e.target.value
    setCreatePackage({ ...createPackage, [e.target.name]: e.target.value })
  }

  const handleCreatePackage = e => {
    const packages = productDetailData.packages.concat([])
    packages.push({
      name: createPackage.name,
      prices:
        { '1': '', '6': '', '12': '', '999999': '' }
      ,
      discount: 0,
      features: [],
      numbers: []
    })
    setProductDetailData({ ...productDetailData, packages })
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

  const handleSave = e => {
    console.log(1111)
    const id = props.match.params.id
    let { packages, features } = productDetailData
    packages.forEach(p => {
      p.numbers = p.numbers.map(n => n.number)
    })
    packages = packages.map(p => {
      const { product_, ...rest } = p

      return { ...rest }
    })
    apiPut(PRODUCTS_URL + '/' + id, { packages, features }, false, true)
      .then(res => {
        // setProductDetailData(res.data)
        getProductDetail()
      })
  }

  const handleSaveProductDetail = e => {
    e.preventDefault()
    const id = props.match.params.id
    let { features, packages, manager, ...productDetail } = productDetailData
    apiPatch(PRODUCTS_URL + '/' + id, productDetail, false, true)
      .then(res => {
        setProductDetailData(res.data)
        updateNotification()
      })
  }

  const onChangeCreateProduct = e => {
    setProductDetailData({ ...productDetailData, [e.target.name]: e.target.value })
  }

  const handleResetData = () => {
    const id = props.match.params.id
    const data = apiGet(PRODUCTS_URL + "/" + id, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST && window.location.pathname != '/register') {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          setError(res.data)
        }
        setProductDetailData({ ...res.data })
      })
  }

  const handleOpenFeatureDialog = () => {
    setFeatureDialog(true)
  }

  const handleCloseFeatureDialog = e => {
    setFeatureDialog(false)
  }
  const handleProfileMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const onChangeCreateFeature = e => {
    setCreateFeature({ ...createFeature, [e.target.name]: e.target.value })
  }

  let packages = {}

  const onRemoveLicenseType = (packageIndex, month) => {
    const packages = productDetailData.packages.concat([])
    delete packages[packageIndex].prices[month]
    setProductDetailData({ ...productDetailData, packages })
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

  const handleAddPackageForm = () => {
    const packages = productDetailData.packages.concat([])
    packages.push({
      name: '',
      prices:
        { '1': '' }
      ,
      discount: 0,
      features: [],
      numbers: []
    })
    setProductDetailData({ ...productDetailData, packages })
  }

  const onLicenseTypeClick = (packageIndex) => {
    const packages = productDetailData.packages.concat([])
    const remainMonths = MONTHS.reduce((acc, m) => {
      if (Object.keys(productDetailData.packages[packageIndex].prices).findIndex(pr => pr == m.value) == -1) {
        acc.push({ value: m.value })
      }
      return acc
    }, [])
    if (remainMonths.length != 0) {
      packages[packageIndex].prices = { ...packages[packageIndex].prices, [remainMonths[0].value]: '' }
      setProductDetailData({ ...productDetailData, packages })
    }
  }

  const onChangeLicenseInput = (e, packageIndex, curMonth) => {
    const packages = productDetailData.packages.concat([])
    if (e.target.name == 'month') {
      if (e.target.value != curMonth) {
        packages[packageIndex].prices[e.target.value] = packages[packageIndex].prices[curMonth]
        delete packages[packageIndex].prices[curMonth]
      }
    }
    else if (e.target.name == 'value') {
      packages[packageIndex].prices[curMonth] = e.target.value
    }
    else {
      packages[packageIndex][e.target.name] = e.target.value
    }
    setProductDetailData({ ...productDetailData, packages })
  }

  const onChangeLicenseInput2 = (e, packageIndex, curMonth) => {
    const packages = productDetailData.packages.concat([])
    packages[packageIndex].prices[curMonth] = e.target.value
    setProductDetailData({ ...productDetailData, packages })
  }

  const handleRemovePackageForm = (packageIndex) => {
    let packages = productDetailData.packages.concat([])
    if (packages.length == 1) {
      return;
    } else {
      packages = packages.slice(0, packageIndex)
        .concat(packages.slice(packageIndex + 1))
      setProductDetailData({ ...productDetailData, packages })
    }
  }

  const handleChangeSelect = (values, element, packageIndex) => {
    const packages = productDetailData.packages.concat([])
    packages[packageIndex].numbers = values
    setProductDetailData({ ...productDetailData, packages })
  }

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <BreadcrumbsItem to={`/products/ + ${productDetailData.id}`}>{productDetailData.name}</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <Grid container spacing={8} style={{ margin: 'unset' }}>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <ProductIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Product</span></li>
                  <li><p style={{ fontSize: '16px' }}>{productDetailData.name}</p></li>
                </ul>
              </div>
            </Grid>
            <AppBar position="static" className={classes.bgrMenuTab}>
              <Tabs value={value}
                onChange={(e, value) => {
                  setValue(value)
                }}
                classes={{ indicator: classes.tabSelected }}
              >

                <Tab label={<span><DetailIcon />&nbsp;Product Detail</span>} />
                <Tab label={<span><ProductIcon /> Features</span>} />
                <Tab label={<span><ProductIcon /> Packages</span>} />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left' }}>
              {value === 0 &&
                <TabContainer>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Product Info
                    </Typography>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Product Name
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        onChange={onChangeCreateProduct}
                        name="name"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={productDetailData.name}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
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
                    <Grid item xs={10}>
                      <Input
                        onChange={onChangeCreateProduct}
                        name="desc"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={productDetailData.desc}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Status
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={productDetailData.status}
                          onChange={onChangeCreateProduct}
                          displayEmpty
                          name="status"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="ACTIVE">
                            ACTIVE
                          </MenuItem>
                          <MenuItem value="INACTIVE">
                            INACTIVE
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {/* <Input
                        onChange={onChangeCreateProduct}
                        name="status"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={productDetailData.status} */}
                      {/* /> */}
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Sales Start Date
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        onChange={onChangeCreateProduct}
                        name="start_sale_date"
                        type="date"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={productDetailData.start_sale_date}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Support Start Date
                    </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                      <Input
                        onChange={onChangeCreateProduct}
                        name="start_support_date"
                        type="date"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={productDetailData.start_support_date}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <Grid container>
                    <Grid item xs={12} className="d-flex justify-content-center mt-3">
                      <Button onClick={handleResetData} variant="contained" className={classes.button}>
                        RESET
                      </Button>&nbsp;&nbsp;
                      <Button onClick={handleSaveProductDetail} variant="contained" color="primary" className={classes.button}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {
                value === 1 &&
                <TabContainer>
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
                          productDetailData.features.map((f, index) => {
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
                          })}
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
                        onRowClick={(e, rowData) => {
                          handleUpdateFeature(e, rowData)
                        }}
                        // onSelectionChange={onSelectionChange}
                        title="Features"
                        options={{
                          toolbar: true,
                          paging: false,
                          search: false
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} className="d-flex justify-content-center mt-3">
                      <Button onClick={handleResetData} variant="contained" className={classes.button}>
                        RESET
                      </Button>&nbsp;&nbsp;
                      <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {value === 2 &&
                <TabContainer>
                  <Grid item xs={12}>
                    <FormPackage
                      handleCreatePackage={handleCreatePackage}
                      createPackage={createPackage}
                      onChangeCreatePackage={onChangeCreatePackage}
                      packageDialog={packageDialog}
                      handleClosePackageDialog={handleClosePackageDialog}
                      handleOpenPackageDialog={handleOpenPackageDialog}
                      handleProfileMenuOpen={handleProfileMenuOpen}
                      createProduct={productDetailData}
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      onRemoveLicenseType={onRemoveLicenseType}
                      handleAddPackageForm={handleAddPackageForm}
                      onLicenseTypeClick={onLicenseTypeClick}
                      onChangeLicenseInput={onChangeLicenseInput}
                      handleRemovePackageForm={handleRemovePackageForm}
                      handleChangeSelect={handleChangeSelect}
                    />
                  </Grid>
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
                          productDetailData.packages.map((p, index) => {
                            return (
                              {
                                title: p.name, field: p.name,
                                render: rowData => {
                                  return (
                                    !rowData.isPrice
                                      ?
                                      <Checkbox
                                        color="primary"
                                        checked={p.features.findIndex(f=> f.id === rowData.f.id)!==-1}
                                        onChange={(e, stt) => handleChooseFeature(index, rowData.f, stt)}
                                        name="checkedFeature"
                                      />
                                      : <Grid container spacing={24}>
                                        <Grid className={classes.inputCustom} item xs={4}>
                                          <Input
                                            onChange={(e) => onChangeLicenseInput2(e, index, `${rowData.month}`)}
                                            value={productDetailData.packages[index].prices[`${rowData.month}`]}
                                            name="prices"
                                            inputComponent={NumberFormatCustom}
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
                        productDetailData.features.map((f, index) => {
                          return (
                            {
                              ...packages,
                              numeral: index + 1,
                              feature: f.name,
                              f
                            }
                          )
                        }).concat(
                          productDetailData.features.length > 0 && productDetailData.packages.length > 0 ?
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
                  <Grid container>
                    <Grid item xs={12} className="d-flex justify-content-center mt-3">
                      <Button onClick={handleResetData} variant="contained" className={classes.button}>
                        RESET
                      </Button>&nbsp;&nbsp;
                      <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </TabContainer>}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(ProductDetail);