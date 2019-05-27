import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styles from './CreateUserStyle'

import { apiPost } from "../../common/Request";
import { RegisterURL } from "../../common/urls";
import { BAD_REQUEST } from "../../common/Code";

function CreateUser(props) {
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    profile: {
      company_name: 'abc',
      is_manager: true,
      phone: '',
    }
  })
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState({})
  const { classes } = props;

  const onSubmit = e => {
    e.preventDefault()
    // let errors = {}
    // if (user.password != user.confirmPassword) {
    //   errors.password = 'Password and confirm password is not match'
    // }
    // if (Object.keys(errors).length > 0) {
    //   setError(errors)
    //   return
    // }
    apiPost(RegisterURL, user)
      .then(res => {
        if (res.data.code == BAD_REQUEST) {
          if (res.data.message) error.message = res.data.message
        }
        else {
          setSuccess(true)
        }
        setError(error)
      })
  }

  const onchangeCreateUser = e => {
    const { profile } = user
    if (e.target.name == 'is_manager') {
      setUser({ ...user, profile: { ...profile, is_manager: true } })
    } else if (e.target.name == 'is_sale_rep') {
      setUser({ ...user, profile: { ...profile, is_manager: false } })

    } else if (e.target.name == 'phone') {
      setUser({ ...user, profile: { ...profile, [e.target.name]: e.target.value } })
    }
    else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <Dialog
      open={props.createUserDialog}
      onClose={props.handleCloseDialog}
      classes={{ paper: classes.paperRoot }}
      maxWidth='md'
    >
      <DialogTitle id="alert-dialog-title">CREATE USER</DialogTitle>
      <form onSubmit={onSubmit}>
        <Divider></Divider>
        <DialogContent className='p-5'>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Grid container spcing={24}>
                <Grid item xs={5} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Username
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Input
                    fullWidth
                    type="text"
                    onChange={onchangeCreateUser}
                    value={user.username}
                    name="username"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spcing={24}>
                <Grid item xs={5} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Password
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Input
                    fullWidth
                    type="password"
                    onChange={onchangeCreateUser}
                    value={user.password}
                    name="password"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spcing={24}>
                <Grid item xs={5} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Email
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Input
                    fullWidth
                    type="mail"
                    onChange={onchangeCreateUser}
                    value={user.email}
                    name="email"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spcing={24}>
                <Grid item xs={5} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Phone
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <Input
                    fullWidth
                    type="text"
                    onChange={onchangeCreateUser}
                    value={user.phone}
                    name="phone"
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spcing={24}>
                <Grid item xs={5} style={{ position: 'relative' }}>
                  <InputLabel
                    classes={{
                      root: classes.cssLabel
                    }}
                    required
                  >
                    Role
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onchangeCreateUser}
                        checked={user.profile.is_manager}
                        name="is_manager"
                        color="primary"
                      />
                    }
                    label="Is Manager"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onchangeCreateUser}
                        checked={!user.profile.is_manager}
                        name="is_sale_rep"
                        color="primary"
                      />
                    }
                    label="Is SaleRep"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '0 40px' }}>
          <Button variant="contained" onClick={props.handleCloseDialog} color="default">
            Cancel
            </Button>
          <Button variant="contained" type="submit" color="primary">
            Create
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default withStyles(styles)(CreateUser);