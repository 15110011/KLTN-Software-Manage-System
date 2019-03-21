import * as React from "react";

// Material 
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Divider } from "@material-ui/core";
import KeyIcon from '@material-ui/icons/VpnKey';

// Components
import { Link } from 'react-router-dom'

import { apiPost } from "../common/Request";
import { LoginURL } from "../common/urls";
import { BAD_REQUEST } from "../common/Code";

// Style
import styles from './LoginStyle';

// Image
import * as LoginImage from '../assets/images/image.jpg'

export default class Login extends React.Component {
  state = {
    loginDetail: {
      // login_type: window.location.pathname.substr(1).indexOf('admin') != -1 ? 'ADMIN' : 'STAFF',
      username: '',
      password: ''
    },
    // status: window.location.pathname.substr(1).indexOf('admin') != -1,
    error: {}
  };


  componentDidMount() {
    const { initUrl } = this.props
    if (this.props.user.username) {
      this.props.history.push(initUrl);
    }
  }

  componentDidUpdate() {
    const { initUrl } = this.props

    if (this.props.user.username) {
      this.props.history.push(initUrl);
    }
  }

  onChangeInput = e => {
    let { loginDetail, error } = this.state;
    loginDetail[e.target.name] = e.target.value;
    error[e.target.name] = undefined
    this.setState({ loginDetail, error });
  };

  getError = () => {
    let { loginDetail, error } = this.state;

    error = {}

    if (loginDetail.username == '') {
      error.username = 'Bắt buộc phải nhập'
    }

    if (loginDetail.password == '') {
      error.password = 'Bắt buộc phải nhập password'
    }
    this.setState({ error })
    return error
  }

  onLogin = e => {
    e.preventDefault();
    const { loginDetail, error } = this.state;
    const errObj = this.getError()
    if (Object.keys(errObj).length != 0)
      return


    apiPost(LoginURL, loginDetail)
      .then(res => {
        if (res.data.code == BAD_REQUEST) {
          error.all = 'Sai tên đăng nhập hoặc mật khẩu'
          this.setState({ error })
        }
        else {
          localStorage.setItem('token', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          this.props.setUser(res.data);
        }
      })
  };

  render() {
    const { loginDetail, status, error } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container style={{ height: '100%' }}>
            <Grid item md={6} className={classes.loginBorder}>
              <div>
                <Typography component="h1" variant="h4" gutterBottom>
                  Manage Your Business Account
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Don't miss your next opportunity. Sign in to stay updated on your professional world.
                </Typography>
              </div>
              <img src={LoginImage} alt='image' />
            </Grid>
            <Grid item md={6} className={classes.rightBorder}>
              <Typography component="h1" variant='h4' gutterBottom>
                {/* {status ? 'Admin' : 'Staff'} Login */}
                Login To Your Account
              </Typography>
              <Typography variant='title' gutterBottom>
                Enter your details to login.
              </Typography>
              <br />
              <form className={classes.form} onSubmit={this.onLogin}>
                <Grid container>
                  <Grid item md={9}>
                    <FormControl margin="normal" fullWidth error={error.all} required>
                      <InputLabel htmlFor="email" className={error.username ? classes.danger : null}>Username</InputLabel>
                      <Input
                        value={loginDetail.username}
                        onChange={this.onChangeInput}
                        name="username"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={9}>
                    <FormControl margin="normal" fullWidth error={error.all} required>
                      <InputLabel htmlFor="password" className={error.password ? classes.danger : null}>Password</InputLabel>
                      <Input
                        type="password"
                        name="password"
                        value={loginDetail.password}
                        onChange={this.onChangeInput}
                        startAdornment={
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Typography className={classes.danger} component='h3' >
                  {error.all ? error.all : ''}
                </Typography>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleLogin}
                >
                  Login
                </Button>{' '}
                <Button type='button' >
                  Forgot password?
                </Button>
                <br />
                <Typography variant='subtitle2' style={{ lineHeight: '2.5', paddingTop: '16px' }}>
                  By clicking login, you agree to our <span style={{ textDecoration: 'underline', color: 'red' }}>Terms & Conditions!</span><br />
                  Don't have an account? Register <Link to='/register' style={{ textDecoration: 'underline', color: 'red' }}>here</Link>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

