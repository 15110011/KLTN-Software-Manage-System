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
import { apiPost, apiGet, apiPatch } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

// Components 

import SelectCustom from '../../components/SelectCustom'

import styles from './AddToGroup'


function AddToGroup(props) {

  const [selectingGroups, setSelectingGroups] = React.useState([])
  const [error, setError] = React.useState({})



  const { classes, groups, toggleDialog, selectingContacts, selectingGroup } = props

  //event handler
  const handleChangeSelect = (values, e) => {
    setSelectingGroups(values)
  }

  const onPatch = () => {

    apiPatch(GROUP_URL + '/addcontacts', {
      groups: selectingGroups.map(g => g.id)
      , contacts: selectingContacts.map(c => c.id)
    }, false, true)
      .then(res => {
        if (res.data.code == 'token_not_valid') {
          apiPost(REFRESH_TOKEN_URL, { refresh: localStorage.getItem('refresh') }).then(res => {
            if (res.data.code == "token_not_valid" || res.data.code == BAD_REQUEST) {
              props.history.push('/logout')
            }
            else {
              localStorage.setItem("token", res.data.access)
              onPatch()
            }
          })
        }
        else if (res.data.code == BAD_REQUEST) {
          const { code, ...rest } = res.data
          setError(rest)
        }
        else {
          props.onSuccess()
        }
      })
  }

  const onSubmit = e => {
    e.preventDefault()
    onPatch()
  }

  return (
    <Dialog
      open={true}
      onClose={() => { toggleDialog() }}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.paperRoot }}
    >
      <DialogTitle>ADD {selectingContacts.length} CONTACT(s)</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent style={{ overflowY: 'unset' }}>
          <Grid container spacing={8} className='m-3'>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Contacts:
              </InputLabel>
            </Grid>
            <Grid item xs={9} className='pr-5'>
              <SelectCustom
                options={selectingContacts.reduce((acc, c) => {
                  acc.push(
                    {
                      label: `${c.fullName}`,
                      value: c.id,
                      ...c
                    }
                  )
                  return acc
                }, [])}
                data={
                  selectingContacts
                    .reduce((acc, c) => {
                      acc.push({ label: `${c.fullName}`, value: c.id, ...c })
                      return acc
                    }, [])
                }
                fullWidth
                multi
                disabled
              />
            </Grid>
            <Grid item xs={2} style={{ position: 'relative' }}>
              <InputLabel
                classes={{
                  root: classes.cssLabel
                }}
                required
              >
                Groups:
                </InputLabel>
            </Grid>
            <Grid item xs={9} className='pr-5'>
              <SelectCustom
                options={groups.data.reduce((acc, g) => {
                  if (g.id != selectingGroup) {
                    acc.push(
                      {
                        label: `${g.name}`,
                        value: g.id,
                        ...g
                      }
                    )
                  }
                  return acc
                }, [])}
                handleChange={(values, element) => handleChangeSelect(values, element)}
                data={
                  selectingGroups
                    .reduce((acc, g) => {
                      acc.push({ label: `${g.label}`, value: g.id, ...g })
                      return acc
                    }, [])
                }
                fullWidth
                multi
                placeholder=""
                label=""
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='button' onClick={toggleDialog}>Cancel</Button>
          <Button type='submit' color='primary'>Add</Button>
        </DialogActions>
      </form>

    </Dialog>
  )
}


export default withStyles(styles, { withTheme: true })(AddToGroup);