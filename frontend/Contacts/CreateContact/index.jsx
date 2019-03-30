import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import MaterialTable from 'material-table'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import * as cn from 'classnames'
// API
import { CONTACT_URL, GROUP_URL, REFRESH_TOKEN_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 

import SelectCustom from '../../components/SelectCustom'

import styles from './CreateContactStyle'


function CreateContact(props) {

  const [createObj, setCreateObj] = React.useState({
    first_name: '',
    last_name: '',
    mail: '',
    phone: '',
    sex: 'OTHER',
    address: '',
    country: 'Vietnam',
    zipcode: 0,
    groups: []
  })

  const [error, setError] = React.useState({})


  React.useEffect(() => {
    // Effect
    if (props.groups.data.length) {
      const allContactsGroup = props.groups.data[0]
      const groups = [].concat([{ ...allContactsGroup, label: allContactsGroup.name, value: allContactsGroup.id }])
      setCreateObj({ ...createObj, groups })
    }
  }, [props.groups.data.length])


  const { classes, groups } = props

  //Event Handler

  const onChangeInput = e => {
    setCreateObj({ ...createObj, [e.target.name]: e.target.value })
  }

  const onPostData = () => {

    const cloneObj = JSON.parse(JSON.stringify(createObj))
    cloneObj.groups = cloneObj.groups.map(g => g.id)
    apiPost(CONTACT_URL, cloneObj, false, true).then(res => {
      if (res.data.code == 'token_not_valid') {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
            this.props.history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            onPostData()
          }
        })
      }
      else if (res.data.code == BAD_REQUEST) {
        const { code, ...rest } = res.data
        setError(rest)
      }
      else {
        props.onCreateSuccess(res.data, createObj.groups.map(g => g.id))
      }

    })
  }

  const onSubmit = e => {
    e.preventDefault()

    onPostData()
  }

  const handleChangeSelect = (values, element) => {

    if (element.action == 'remove-value' && element.removedValue.name == 'All Contacts') {
      return
    }
    else if (element.action == 'clear') {
      const remainGroups = [].concat([createObj.groups[0]])
      setCreateObj({ ...createObj, groups: remainGroups })
      return
    }
    setCreateObj({ ...createObj, groups: values })
  }

  return (
    <Dialog
      open={true}
      maxWidth='md'
      onClose={props.toggleDialog}
    >
      <DialogTitle>Create New Contact</DialogTitle>
      <form onSubmit={onSubmit}>
        <Divider></Divider>
        <DialogContent className='my-3'>
          <DialogContentText variant='title' component=''>Required Fields</DialogContentText>
          <Grid container spacing={8}>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                First Name:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.first_name}
                name="first_name"
                required
                error={error.first_name}
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Last Name:
              </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.last_name}
                name="last_name"
                required
                error={error.last_name}
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }} >
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Email:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.mail}
                name="mail"
                required
                type='email'
                error={error.mail}
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Phone:
              </InputLabel>
            </Grid>
            <Grid item xs={4}>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.phone}
                name="phone"
                required
                error={error.phone}
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }} >
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Sex:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Select
                value={createObj.sex}
                onChange={onChangeInput}
                name='sex'
                fullWidth
              >
                <MenuItem value='OTHER'>Other</MenuItem>
                <MenuItem value='MALE'>Male</MenuItem>
                <MenuItem value='FEMALE'>Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} className='my-1'>
              <Divider></Divider>
            </Grid>

          </Grid>
          <DialogContentText variant='title'>
            Optional Fields
          </DialogContentText>
          <Grid container spacing={8}>
            <Grid item xs={2} style={{ position: 'relative' }} >
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
              >
                Address:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.address}
                name="address"
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }}>
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
                value={createObj.country}
                name="country"
                disabled
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
              >
                Zipcode:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>
              <Input
                fullWidth
                onChange={onChangeInput}
                value={createObj.Zipcode}
                name="zipcode"
                type='number'
              />
            </Grid>

            <Grid item xs={12} className='my-1'>
              <Divider></Divider>
            </Grid>
          </Grid>

          <DialogContentText variant='title'>
            Add this contact to groups
          </DialogContentText>
          <DialogContentText variant='caption'>
            This contact will be added to "All Contacts" by default
          </DialogContentText>
          <Grid container spacing={8}>
            <Grid item xs={2} style={{ position: 'relative' }} >
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
              >
                Groups:
              </InputLabel>
            </Grid>
            <Grid item xs={4} className='pr-5'>

              <SelectCustom
                options={groups.data.map(g => ({
                  label: `${g.name}`,
                  value: g.id,
                  ...g
                }))}
                handleChange={(values, element) => handleChangeSelect(values, element)}
                data={
                  createObj.groups
                    .reduce((acc, g) => {
                      acc.push({ label: `${g.label}`, value: g.id, ...g })
                      return acc
                    }, [])
                }
                multi
                placeholder=""
                label=""
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='button'>Cancel</Button>
          <Button type='submit' color='primary'>Create Contact</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default withStyles(styles, { withTheme: true })(CreateContact);