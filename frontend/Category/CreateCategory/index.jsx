import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// API
import { PRODUCTS_URL, REFRESH_TOKEN_URL, PRODUCT_CATEGORIES_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

import styles from './CreateCategoryStyle'

function CreateCategory(props) {

  const { classes, handleCloseCreateCategoryDialog, createCategoryDialog, setCreateCategoryDialog, forceUpdateCategory } = props;

  const [createCategory, setCreateCategory] = React.useState({
    name: '',
    description: '',
    status: ''
  })

  const onChangeCreateCategory = e => {
    setCreateCategory({ ...createCategory, [e.target.name]: e.target.value })
  }

  const handleCreateCategory = e => {
    e.preventDefault()
    apiPost(PRODUCT_CATEGORIES_URL, createCategory, false, true).then(res => {
      if (res.data.code == "token_not_valid") {
        apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
          if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
            props.history.push('/logout')
          }
          else {
            localStorage.setItem("token", res.data.access)
            // notification()
          }
        })
      }
      else if (res.data.code == BAD_REQUEST) {
        setError(res.data)
      }
      else {
        forceUpdateCategory()
        // notification()
      }
    })
    setCreateCategoryDialog(false)
  }

  return (
    <div>
      <Dialog
        open={createCategoryDialog}
        onClose={handleCloseCreateCategoryDialog}
        classes={{ paper: classes.paperRoot }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ position: 'relative' }} id="customized-dialog-title" onClose={handleCloseCreateCategoryDialog}>
          Create Category
          <div className="d-flex justify-content-between">
            <IconButton style={{ position: 'absolute', top: '12px', right: '12px' }}
              aria-label="Close" onClick={handleCloseCreateCategoryDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </DialogTitle>
        <form onSubmit={handleCreateCategory}>
          <DialogContent>
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
                      onChange={onChangeCreateCategory}
                      value={createCategory.name}
                      name="name"
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
                      onChange={onChangeCreateCategory}
                      value={createCategory.description}
                      name="description"
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
                        value={createCategory.status}
                        onChange={onChangeCreateCategory}
                        name="status"
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
          </DialogContent>
          <DialogActions style={{ padding: '12px 12px' }}>
            <Button type="submit" variant="contained" color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(CreateCategory);