import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductIcon from '@material-ui/icons/Archive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DetailIcon from '@material-ui/icons/Assignment'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import IconButton from '@material-ui/core/IconButton';
import CategoryIcon from '@material-ui/icons/Category';
import CustomSnackbar from '../../components/CustomSnackbar'

import styles from './CategoryDetailStyle'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function CategoryDetail(props) {

  const [value, setValue] = React.useState(0)

  const { classes } = props;

  const handleChange = (event, value) => {
    setValue(value)
  };


  return (
    <div lassName={classes.root}>
      <div className={classes.paper}>
        <Grid container spacing={8} style={{ margin: 'unset' }}>
          <div className={classes.wrapAvatar}>
            <div className={classes.productAvatar}>
              <CategoryIcon />
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
              <li><span style={{ color: '#616161' }}>Category</span></li>
              <li><p style={{ fontSize: '16px' }}>ABC</p></li>
            </ul>
          </div>
        </Grid>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Category Detail" />
            {/* <Tab label="Item Two" />
          <Tab label="Item Three" /> */}
          </Tabs>
        </AppBar>
        <div style={{ textAlign: 'left' }}>
          {value === 0 &&
            <TabContainer>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustomName} item xs={4}>
                      <InputLabel
                        required
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        Category Name
                  </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        // onChange={onChangeCreateCategory}
                        // value={createCategory.name}
                        // name="name"
                        // error={error[0].name}
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustomName} item xs={4}>
                      <InputLabel
                        required
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
                        required
                        // onChange={onChangeCreateCategory}
                        // value={createCategory.desc}
                        // name="desc"
                        // error={error[0].name}
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={24}>
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
                          // value={createCategory.status}
                          // onChange={onChangeCreateCategory}
                          // name="status"
                          displayEmpty
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
              </Grid>
            </TabContainer>}
        </div>
      </div>

    </div>
  )
}

export default withStyles(styles)(CategoryDetail);