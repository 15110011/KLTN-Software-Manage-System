import * as React from 'react'

// Material 
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import KeyIcon from '@material-ui/icons/VpnKey';
import PhoneIcon from '@material-ui/icons/Phone'
import CompanyIcon from '@material-ui/icons/LocationCity';

// Components
import { Link } from 'react-router-dom';

// Style
import styles from './RegisterStyle';

// Image
import * as RegisterImage from '../assets/images/business.jpg';

import { apiPost } from "../common/Request";
import { RegisterURL } from "../common/urls";
import { BAD_REQUEST } from "../common/Code";

function Register(props) {
  const { classes } = props;
  const [step, setStep] = React.useState(1)
  const [success, setSuccess] = React.useState(false)
  const [user, setUser] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    profile: {
      is_manager: true,
      company_name: '',
      phone: '',
      manager: null
    }
  })
  const [error, setError] = React.useState({})


  React.useEffect(() => {
    // Effect
    const { initUrl } = props
    if (props.user.username) {
      props.history.push(initUrl);
    }
    // Cleanup
  })

  const submitRegister = (e) => {
    e.preventDefault()
    if (user.password != user.confirmPassword)
      return
    apiPost(RegisterURL, user)
      .then(res => {
        if (res.data.code == BAD_REQUEST) {
          setError({ ...res.data })
        }
        else {
          props.history.push('/login')
          // localStorage.setItem('token', res.data.access)
          // localStorage.setItem('refresh', res.data.refresh)
          // props.setUser(res.data);
          // props.setLogin(true)
          // setSuccess(true)
          // props.setUser(res.data);
          // props.setLogin(true)
        }
      })
  }

  const onChangeRegister = (e) => {
    if (e.target.name == 'company_name' || e.target.name == 'phone') {
      const { profile } = user
      setUser({ ...user, profile: { ...profile, [e.target.name]: e.target.value } })
    }
    else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }
  console.log('REGISTER')

  return (
    <div>
      {
        success && <div class="alert alert-primary" role="alert">
          Register successfully, please click the confirmation link we sent to your  <strong class="alert-link">{user.email}</strong>
        </div>
      }
      <Paper className={classes.paper}>
        <Grid container style={{ height: '100%' }}>
          <Grid item md={6} className={classes.rightBorder}>
            <Typography component="h1" variant='h4' gutterBottom>
              {/* {status ? 'Admin' : 'Staff'} Login */}
              Get started absolutely free
              </Typography>
            <br />
            <FormControl className={classes.form} onSubmit={submitRegister}>
              <Grid container>
                {step == 1 &&
                  <>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="email">Username</InputLabel>
                        <Input
                          type="text"
                          name="username"
                          value={user.username}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="password">Confirm Password</InputLabel>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={user.confirmPassword}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => setStep(2)}
                      >
                        Next
                    </Button>
                    </Grid>
                  </>
                }
                {step == 2 &&
                  <>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="company">Company Name</InputLabel>
                        <Input
                          type="text"
                          name="company_name"
                          value={user.profile.company_name}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <CompanyIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input
                          type="text"
                          name="phone"
                          value={user.profile.phone}
                          onChange={onChangeRegister}
                          startAdornment={
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitRegister}
                      >
                        Register
                      </Button>{' '}
                      <Button
                        type="button"
                        variant="contained"
                        color="default"
                        className={classes.submit}
                        onClick={() => setStep(1)}
                      >
                        Back
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='subtitle2' style={{ lineHeight: '2.5', paddingTop: '16px' }}>
                        Already a member? Let’s <Link to='/login' style={{ textDecoration: 'underline', color: 'red' }}>Login</Link> now
                      </Typography>
                    </Grid>
                  </>
                }
              </Grid>
            </FormControl>
          </Grid>
          <Grid item md={6} className={classes.loginBorder}>
            <img src={RegisterImage} alt='image' />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Register);
