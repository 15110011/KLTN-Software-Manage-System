import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'


// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 
import FormPackage from './FormPackage/FormPackage';


import styles from './CreateProductStyle'


function CreateProduct(props) {
  const [createProductStep, setCreateProductStep] = React.useState(1)

  const [createProduct, setCreateProduct] = React.useState({
    productName: '',
    description: '',
    active: 'ACTIVE',
    saleStarDate: '',
    supportStartDate: '',
    packages: [],
    prices: []
  })


  const [error, setError] = React.useState({})
  let InputLabelRef = ''

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
                  {
                    createProductStep == 1 &&
                    <>
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
                      <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                          Feature Info
                        </Typography>
                        <Grid container spacing={8}>
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
                                  Feature Name
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
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className="d-flex justify-content-center mt-4">
                        <Button
                          // disabled
                          type="button"
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={() => setCreateProductStep(2)}
                        >
                          Next
                        </Button>
                      </Grid>
                    </>
                  }
                  {
                    createProductStep == 2 &&
                    <>
                      <FormPackage />
                      <Grid container>
                        <Grid item xs={12} className="d-flex justify-content-center mt-3">
                          <Button onClick={() => { setCreateProductStep(1) }} variant="contained" className={classes.button}>
                            BACK
                      </Button>&nbsp;&nbsp;
                      <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            CREATE
                      </Button>
                        </Grid>
                      </Grid>
                    </>
                  }
                </Grid>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);