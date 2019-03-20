import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { apiPost } from "../common/Request";
import { LoginURL } from "../common/urls";
import { BAD_REQUEST } from "../common/Code"

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#000'

  },
  danger: {
    color: '#f00',
    marginTop: '1rem',
    marginBottom: '1rem',

  }

});

export default class Login extends React.Component {
  state = {
    loginDetail: {
      // login_type: window.location.pathname.substr(1).indexOf('admin') != -1 ? 'ADMIN' : 'STAFF',
      login_type: 'ADMIN',
      username: '',
      password: ''
    },
    status: window.location.pathname.substr(1).indexOf('admin') != -1,
    error: {}
  };


  componentDidMount() {
    const {initUrl} = this.props
    if (this.props.user.user_type) {

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
          this.props.setUser(res.data);
        }
      })
  };

  render() {
    const { loginDetail, status, error } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.layout} style={{ marginTop: "10%" }}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {/* {status ? 'Admin' : 'Staff'} Login */}
            Login
          </Typography>
          <form className={classes.form} onSubmit={this.onLogin}>
            <FormControl margin="normal" fullWidth error={error.all} required>
              <InputLabel htmlFor="email" className={error.username ? classes.danger : null}>Username</InputLabel>
              <Input
                value={loginDetail.username}
                onChange={this.onChangeInput}
                name="username"
              />

            </FormControl>
            <FormControl margin="normal" fullWidth error={error.all} required>
              <InputLabel htmlFor="password" className={error.password ? classes.danger : null}>Password</InputLabel>
              <Input
                type="password"
                name="password"
                value={loginDetail.password}
                onChange={this.onChangeInput}
              />
            </FormControl>
            <Typography className={classes.danger} component='h3' >
              {error.all ? error.all : ''}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

