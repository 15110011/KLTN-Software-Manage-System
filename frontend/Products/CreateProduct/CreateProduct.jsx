import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Breadcrumb from '../../components/Breadcrumb'
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import styles from './CreateProductStyle'

function CreateProduct(props) {
  const { classes, theme } = props;

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/products/add'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: 'left', padding: '40px' }}>
              <Typography variant="h5" gutterBottom>
                Product Detail
                </Typography>
              <Grid container className={"mt-3"}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Product Name:
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container className={"mt-3"}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Product Active:
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container className={"mt-3"}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Vendor Name:
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container className={"mt-3"}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Sales Start Date:
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    type="date"
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container className={"mt-3"}>
                <Grid className={classes.inputCustom} item xs={2}>
                  <InputLabel
                    htmlFor="custom-css-standard-input"
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Support Start Date:
                    </InputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Input
                    type="date"
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <MaterialTable
              columns={[
                { title: 'Action', field: 'action' },
                { title: 'Package Name', field: 'packageName' },
                { title: 'Sell Price', field: 'sellPrice' },
                {
                  title: 'Notes', field: 'notes',
                },
              ]}
              data={[
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
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
                <Button variant="contained" color="primary" className={classes.button}>
                  CREATE
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(CreateProduct);