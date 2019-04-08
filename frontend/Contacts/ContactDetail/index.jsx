import * as React from 'react'

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
import GroupIcon from '@material-ui/icons/Group'
import { Divider } from '@material-ui/core';


// Hooks
import useFetchData from '../../CustomHook/useFetchData'

// API
import { CONTACT_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 

import styles from './ContactDetailStyle'
import CustomSnackbar from '../../components/CustomSnackbar'
import Groups from './Groups'
import USERCONTEXT from '../../components/UserContext'

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
  const [error, setError] = React.useState({})
  const [successNoti, setSuccessNoti] = React.useState(false)



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

  const timer = {}

  //clear timer

  React.useEffect(() => {
    // Cleanup
    return () => {

      Object.keys(timer).forEach(k => {
        clearTimeout(timer[k])
      })
    }
  }, [])


  // Event handler

  const patchData = () => {

    let patchError = {}
    const { groups, ...patchDetail } = contactDetail

    apiPatch(CONTACT_URL + '/' + contactId, patchDetail, false, true)
      .then(res => {
        if (res.data.code == "token_not_valid") {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              patchData()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          const { code, ...rest } = res.data
          patchError = rest
        }
        else {
          setContactDetail(res.data)
          setSuccessNoti('Successfully Updated')
          timer.success = setTimeout(() => {
            setSuccessNoti(false)
          }, 2000);
        }
        setError(patchError)
      })
  }

  const handleSaveContactDetail = (e) => {
    e.preventDefault()
    patchData()
  }

  const onChangeInput = (e) => {
    setContactDetail({ ...contactDetail, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.root}>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti}></CustomSnackbar>}
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

                <Tab label={<span><PersonalIcon />&nbsp;Detail</span>} />
                <Tab label={<span><GroupIcon />&nbsp;Groups</span>} />
                <Tab label={<span><DetailIcon /> Notes </span>} />
              </Tabs>
            </AppBar>
            <USERCONTEXT.Consumer>
              {({ user }) => (
                <div style={{ textAlign: 'left' }}>
                  {value === 0 &&
                    <TabContainer>
                      <form onSubmit={handleSaveContactDetail}>

                        <Grid container spacing={16}>
                          <Grid item xs={12}>
                            {
                              Object.keys(error).map(k => {
                                return <p className="text-danger">{error[k]}</p>
                              })

                            }
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={16}>

                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                  required
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
                                  required
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                  required
                                >
                                  Last name
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="last_name"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.last_name}
                                  required
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                  required
                                >
                                  Phone
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="phone"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.phone}
                                  required
                                  fullWidth
                                  error={error.phone}
                                />
                              </Grid>
                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                  required
                                >
                                  Email
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="mail"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.mail}
                                  required
                                  type='email'
                                  fullWidth
                                />
                              </Grid>

                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={16}>
                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                >
                                  Address
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="address"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.address}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                >
                                  Zipcode
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="zipcode"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.zipcode}
                                  fullWidth
                                  error={error.zipcode}
                                />
                              </Grid>

                              <Grid item xs={3} style={{ position: 'relative' }}>
                                <InputLabel
                                  htmlFor="custom-css-standard-input"
                                  classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                  }}
                                >
                                  Country
                              </InputLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <Input
                                  onChange={onChangeInput}
                                  name="country"
                                  classes={{
                                    underline: classes.cssUnderline,
                                  }}
                                  value={contactDetail.country}
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item xs={12} className="d-flex justify-content-center mt-3">
                              <Button onClick={forceUpdate} variant="contained" className={classes.button}>
                                RESET
                            </Button>&nbsp;&nbsp;
                            <Button type='submit' variant="contained"
                                color="primary" className={classes.button}>
                                SAVE
                            </Button>
                            </Grid>
                          </Grid>
                        </Grid>

                      </form>
                    </TabContainer>
                  }
                  {value === 1 &&
                    <TabContainer>
                      <Groups history={props.history} user={user} />
                    </TabContainer>}
                  {value === 2 &&
                    <TabContainer>
                      NOTES
                  </TabContainer>}
                </div>)}
            </USERCONTEXT.Consumer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(ContactDetail);


