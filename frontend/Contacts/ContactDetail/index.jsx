import * as React from 'react'
import ReactDOM from 'react-dom';

import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonalIcon from '@material-ui/icons/PersonOutlined'
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
import IconButton from '@material-ui/core/IconButton';
import CustomSnackbar from '../../components/CustomSnackbar'

// Hooks
import useFetchData from '../../CustomHook/useFetchData'

// API
import { CONTACT_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 

import styles from './ContactDetailStyle'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function ContactDetail(props) {

  const contactId = props.match.params.id

  const [value, setValue] = React.useState(0)

  const [contactDetail, setContactDetail, setUrl, forceUpdate] =
    useFetchData(CONTACT_URL + '/' + contactId, props.history, {
      first_name: '',
      last_name: '',
      phone: '',
      mail: '',
      address: '',
      zipcode: '',
      country: '',
    })
  const { classes } = props

  // Event handler

  const handleSaveContactDetail = () => {
    console.log('askfjlasl');

  }

  const onChangeInput = (e) => {
    setContactDetail({ ...contactDetail, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.root}>
      <BreadcrumbsItem to={`/contacts/ + ${contactId}`}>{contactDetail.full_name}</BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={8} style={{ margin: 'unset' }}>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <PersonalIcon />
                </div>
                <ul style={{ listStyleType: 'none', paddingLeft: '10px', textAlign: 'left' }}>
                  <li><span style={{ color: '#616161' }}>Contact</span></li>
                  <li><p style={{ fontSize: '16px' }}>{contactDetail.full_name}</p></li>
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

                <Tab label={<span><PersonalIcon />&nbsp;Contact Detail</span>} />
                <Tab label={<span><DetailIcon /> Notes </span>} />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: 'left' }}>
              {value === 0 &&
                <TabContainer>
                  <Grid container>
                    <Grid item xs={3}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        }}
                      >
                        First name
                      </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        onChange={onChangeInput}
                        name="first_name"
                        classes={{
                          underline: classes.cssUnderline,
                        }}
                        value={contactDetail.first_name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12} className="d-flex justify-content-center mt-3">
                        <Button onClick={forceUpdate} variant="contained" className={classes.button}>
                          RESET
                        </Button>&nbsp;&nbsp;
                        <Button onClick={handleSaveContactDetail} variant="contained" color="primary" className={classes.button}>
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </TabContainer>
              }
              {value === 1 &&
                <TabContainer>
                  NOTES
                </TabContainer>}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(ContactDetail);


