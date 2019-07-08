import * as React from 'react'
import {
  withStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as cn from 'classnames';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import CategoryIcon from '@material-ui/icons/Category';

import { VectorMap } from 'react-jvectormap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import OrderTable from './Order/OrderTable';
import FollowUpTable from './FollowUp/FollowUpTable';
import CampaignsTable from './CampaignsTable';
import ActivitiesTable from './ActivitiesTable';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import TicketsTable from './TicketsTable';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import styles from './SalerepStyles.js';

import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardIcon from '../../components/Card/CardIcon';
import useFetchData from '../../CustomHook/useFetchData';
import SearchContact from './SearchContact'

import CustomSnackbar from '../../components/CustomSnackbar';
import { apiGet, apiPost } from '../../common/Request.js';
import { ORDER_CHART_URL, SEARCH_CONTACT } from '../../common/urls';

function SearchContact(props) {
  const { classes, handleSearchContact } = props
  const [searchContact, setSearchContact] = React.useState('')

  return (
    <Grid item xs={6}>
      <form onSubmit={e => {
        e.preventDefault()
        handleSearchContact(searchContact)
      }}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Contacts"
            value={searchContact}
            onChange={e => setSearchContact(e.target.value)}
            inputProps={{ 'aria-label': 'Search Contact' }}
          />
          <IconButton className={classes.iconButton} type="submit" aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    </Grid>
  )
}

export default withStyles(styles)(SearchContact);