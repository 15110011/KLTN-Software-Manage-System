import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Breadcrumb from '../../components/Breadcrumb'
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import styles from '../ProductContainerStyle'

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

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to='/products/:id'>ABC</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <ProductIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Product</span></li>
                  <li><p style={{ fontSize: '16px' }}>Product ABC</p></li>
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
                <Tab label={<span><ProductIcon /> Tab 2</span>} />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left' }}>
              {value === 0 &&
                <TabContainer>
                  <Grid container>
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
                  <Grid container className={'mt-3'}>
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
                  <Grid container className={'mt-3'}>
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
                  <Grid container className={'mt-3'}>
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
                  <br />
                  <br />
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
                      </Button>
                      <Button variant="contained" color="primary" className={classes.button}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {value === 1 && <TabContainer>Item Two</TabContainer>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(ProductDetail);