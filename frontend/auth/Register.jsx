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
  const [error, setError] = React.useState({})
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
    let errors = {}
    if (user.password != user.confirmPassword) {
      errors.password = 'Password and confirm password is not match'
    }
    if (Object.keys(errors).length > 0) {
      setError(errors)
      return
    }
    apiPost(RegisterURL, user)
      .then(res => {
        if (res.data.code == BAD_REQUEST) {
          if (res.data.message) errors.message = res.data.message
        }
        else {
          setSuccess(true)
        }
        setError(errors)
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
          One more step to finish the registration, please click the confirmation link we sent to your email address  <strong class="alert-link">{user.email}</strong>
        </div>
      }
      <Paper className={classes.paper}>
        <Grid container style={{ height: '100%' }}>
          <Grid item md={6} className={classes.rightBorder}>
            <Typography component="h1" variant='h4' gutterBottom>
              {/* {status ? 'Admin' : 'Staff'} Login */}
              Get started absolutely free
            </Typography>
            {
              error.password && <p class="text-danger">{error.password}</p>
            }
            {
              error.message && <p className="text-danger">{error.message}</p>
            }
            <br />
            <form className={classes.form} onSubmit={submitRegister}>
              <Grid container>
                {step == 1 &&
                  <>
                    <Grid item md={9}>
                      <FormControl margin="normal" fullWidth required>
                        <InputLabel htmlFor="email">Username</InputLabel>
                        <Input
                          type="text"
                          name="username"
                          required
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
                          required
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
                          required
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
                    <Grid item xs={12}>
                      <Typography variant='subtitle2' style={{ lineHeight: '2.5', paddingTop: '16px' }}>
                        You can Login from <Link to='/login' style={{ textDecoration: 'underline', color: 'red' }}>here</Link>
                      </Typography>
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
                          required
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
                          required
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
                          required
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
                      // onClick={submitRegister}
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
            </form>
          </Grid>
          <Grid item xs={12} md={6} className={classes.loginBorder}>
            <img src={RegisterImage} alt='image' />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(Register);
