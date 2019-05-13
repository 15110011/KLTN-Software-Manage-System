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
import { CONTACT_URL, REFRESH_TOKEN_URL, GROUP_URL } from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 

import styles from './ContactDetailStyle'
import CustomSnackbar from '../../components/CustomSnackbar'
import Groups from './Groups'
import USERCONTEXT from '../../components/UserContext'
import stateHashes from '../../common/StateHash'
import cities from '../../common/States'
import SelectCustom from '../../components/SelectCustom'

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
      groups: []
    })
  const { classes } = props

  const [groups, setGroups, setGroupURL, forceUpdateGroup] = useFetchData(GROUP_URL, props.history, { data: [], total: 0 })
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

    let cloneDetail = { ...contactDetail }

    cloneDetail.groups = cloneDetail.groups.map(g => g.id)
    apiPatch(CONTACT_URL + '/' + contactId, cloneDetail, false, true)
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
          // setContactDetail(res.data)
          forceUpdate() 
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


  const handleChangeSelectAddress = (value, element) => {
    const cloneContactDetail = { ...contactDetail }
    if (value) {
      cloneContactDetail[element.name] = value.value
    }
    else {
      cloneContactDetail[element.name] = ''
    }
    if (element.name == 'state') {
      cloneContactDetail.city = ''
    }
    setContactDetail({ ...cloneContactDetail })
  }

  const handleChangeSelect = (values, element) => {
    if (element.action == 'remove-value' && element.removedValue.name == 'All Contacts') {
      return
    }
    else if (element.action == 'pop-value') {
      if (values.length == 0) {
        return
      }
    }
    else if (element.action == 'clear') {
      const remainGroups = [].concat([contactDetail.groups[0]])
      setContactDetail({ ...contactDetail, groups: remainGroups })
      return
    }

    setContactDetail({ ...contactDetail, groups: values })
  }




  return (
    <div className={classes.root}>
      {successNoti && <CustomSnackbar isSuccess msg={successNoti}></CustomSnackbar>}

      <BreadcrumbsItem to={`/contacts/ + ${contactDetail.id}`}>{contactDetail.full_name}</BreadcrumbsItem>
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

                          <Grid item xs={12}>
                            <Typography variant='title'>
                              Required Fields
                            </Typography>
                          </Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                              required
                            >
                              First Name
                            </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.first_name}
                              name="first_name"
                              required
                              error={error.first_name}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                              required
                            >
                              Last Name
                            </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.last_name}
                              name="last_name"
                              required
                              error={error.last_name}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                              required
                            >
                              Email
                            </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.mail}
                              name="mail"
                              required
                              type='email'
                              error={error.mail}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                              required
                            >
                              Phone
                            </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.phone}
                              name="phone"
                              required
                              error={error.phone}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                              required
                            >
                              Sex
                           </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Select
                              value={contactDetail.sex}
                              onChange={onChangeInput}
                              name='sex'
                              fullWidth
                            >
                              <MenuItem value='OTHER'>Other</MenuItem>
                              <MenuItem value='MALE'>Male</MenuItem>
                              <MenuItem value='FEMALE'>Female</MenuItem>
                            </Select>
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              Groups
                            </InputLabel>
                          </Grid>
                          <Grid item xs={4}>

                            <SelectCustom
                              options={groups.data.map(g => ({
                                label: `${g.name}`,
                                value: g.id,
                                ...g
                              }))}
                              handleChange={(values, element) => handleChangeSelect(values, element)}
                              data={
                                contactDetail.groups
                                  .reduce((acc, g) => {
                                    acc.push({ label: `${g.name}`, value: g.id, ...g })
                                    return acc
                                  }, [])
                              }
                              multi
                              placeholder=""
                              label=""
                            />
                          </Grid>
                          <Grid item xs={12} className='my-1'>
                            <Divider></Divider>
                          </Grid>

                          <Grid item xs={12} variant='title'>
                            <Typography variant='title'>
                              Optional Fields
                            </Typography>
                          </Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              Address:
                              </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.address}
                              name="address"
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              State:
              </InputLabel>
                          </Grid>
                          <Grid item xs={4} >
                            <SelectCustom
                              options={
                                Object.keys(stateHashes).map(k => {
                                  return {
                                    label: stateHashes[k],
                                    value: k
                                  }
                                })
                              }
                              handleChange={handleChangeSelectAddress}
                              value={contactDetail.state}
                              name="state"
                              fullWidth
                              single
                              data={{
                                label: stateHashes[contactDetail.state],
                                value: contactDetail.state
                              }}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }} >
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              City:
              </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <SelectCustom
                              options={
                                contactDetail.state ?
                                  cities[stateHashes[contactDetail.state]].reduce((acc, c) => {
                                    acc.push({
                                      label: c,
                                      value: c
                                    })
                                    return acc
                                  }, [])
                                  : []
                              }
                              handleChange={handleChangeSelectAddress}
                              value={contactDetail.city}
                              name="city"
                              fullWidth
                              single
                              data={{
                                label: contactDetail.city,
                                value: contactDetail.city
                              }}
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              Country:
              </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.country}
                              name="country"
                              disabled
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              Zipcode:
              </InputLabel>
                          </Grid>
                          <Grid item xs={4}>
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.zipcode}
                              name="zipcode"
                              type='number'
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={1} style={{ position: 'relative' }}>
                            <InputLabel
                              classes={{
                                root: classes.cssLabel
                              }}
                            >
                              Organization:
              </InputLabel>
                          </Grid>
                          <Grid item xs={4} >
                            <Input
                              fullWidth
                              onChange={onChangeInput}
                              value={contactDetail.org}
                              name="org"
                            />
                          </Grid>

                          <Grid item xs={1}></Grid>
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


