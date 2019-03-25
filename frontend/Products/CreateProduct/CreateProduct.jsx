import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/Add'
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 
import FormLicensePrice from './FormLicensePrice/FormLicensePrice'


import styles from './CreateProductStyle'

function CreateProduct(props) {
  const [createProduct, setCreateProduct] = React.useState({
    productName: '',
    description: '',
    active: 'ACTIVE',
    saleStarDate: '',
    supportStartDate: '',
    packages: []
  })
  const [addBtn, setAddBtn] = React.useState({
    add: '',
    labelWidth: 0
  })
  const [error, setError] = React.useState({})
  
  const [search, setSearch] = React.useState('')
  

  const handleChangeSearch = search => e => {
    setSearch(e.target.value);
  };

  let InputLabelRef = ''

  const handleChange = e => {
    setAddBtn({ [e.target.name]: e.target.value });
  }

  const { classes, theme } = props;

  const onCreateProduct = (e) => {
    e.preventDefault()
    apiPostProduct()
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

  const onChangeCreateProduct = e => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/products/add'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form onSubmit={onCreateProduct}>
              <div style={{ textAlign: 'left', padding: '40px' }}>
                <Typography variant="h5" gutterBottom>
                  Product Detail
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <Grid container className={"mt-3"}>
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
                          name="productName"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={"mt-3"}>
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
                          value={createProduct.description}
                          name="description"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={"mt-3"}>
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
                        <Input
                          fullWidth
                          required
                          onChange={onChangeCreateProduct}
                          value={createProduct.active}
                          name="active"
                          classes={{
                            underline: classes.cssUnderline,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container className={"mt-3"}>
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
                    <Grid container className={"mt-3"}>
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
                </Grid>
              </div>
              <MaterialTable
                columns={[
                  { title: 'Actions', field: 'actions' },
                  { title: 'Package Name', field: 'packageName' },
                  { title: 'Sell Price', field: 'sellPrice' },
                  {
                    title: 'Notes', field: 'notes',
                  },
                ]}
                data={[
                  {
                    actions:
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel
                          ref={ref => {
                            InputLabelRef = ref;
                          }}
                          htmlFor="outlined-age-simple"
                        >
                          Add
                      </InputLabel>
                        <Select
                          value={addBtn.add}
                          onChange={handleChange}
                          input={
                            <OutlinedInput
                              labelWidth={addBtn.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    ,
                    packageName:
                      <form className={classes.container} noValidate autoComplete="off">
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
                              <AddIcon className={classes.addIcon} />
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    ,
                    sellPrice:
                      <div style={{ display: 'inline-grid' }}>
                          <FormLicensePrice />
                        <Button variant="outlined" color="default" className={(classes.addFeatureButton, "mt-3")}>
                          License Price
                        </Button>
                      </div>
                    ,
                    notes:
                      <Input
                        fullWidth
                        placeholder="Notes"
                        className={classes.input}
                        inputProps={{
                          'aria-label': 'Description',
                        }}
                      />

                  },
                ]}
                title="Basic"
                options={{
                  toolbar: false,
                  paging: false,
                }}
              />
              <Grid container>
                <Grid item xs={12} className="d-flex justify-content-center mt-3">
                  <Button variant="contained" className={classes.button}>
                    CANCEL
                </Button>&nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    CREATE
                </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);