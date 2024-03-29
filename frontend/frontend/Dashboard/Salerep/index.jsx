import * as React from 'react';

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

import stateHashes from '../../common/StateHash';
let dirty = false
function SalerepDashboard(props) {
  const { classes } = props;

  const vectorRef = React.useRef(null);
  const tableMarketingRef = React.useRef(null);
  const tableActivtyRef = React.useRef(null);

  const tableCampaignRef = React.useRef(null);
  const tableFollowUpRef = React.useRef(null);
  const tableOrderUpRef = React.useRef(null);

  const queryState = props.history.location.search.match('(state=)(.+)\\&*');

  const [selectingRegion, setSelectingRegion] = React.useState(
    queryState && queryState.length ? queryState[2] : false,
  );

  React.useEffect(
    () => {
      if (selectingRegion && dirty) {
        props.history.push({
          pathName: './',
          search: `?state=${selectingRegion}`,
        });
        dirty=false
      }
      else if(!selectingRegion && dirty){
        props.history.push({
          pathName: '/dashboard',
        });
        dirty=false
      }
    }
    , [selectingRegion])

  const [contacts, setContacts] = React.useState([])

  const mapChartRef = React.useRef(null);

  const [expanded, setExpanded] = React.useState({
    upcoming1: true,
    upcoming2: true,
    campaign: true,
    followUp: true,
    waitingList: true,
    order: true,
    map: true,
  });

  const [toggleExpand, setToggleExpand] = React.useState(true);
  const [floatingState, setFloatingState] = React.useState(false);

  const handleExpandAllClick = () => {
    setExpanded({
      upcoming1: true,
      upcoming2: true,
      campaign: true,
      followUp: true,
      waitingList: true,
      order: true,
      map: true,
    });
  };
  const handleCollapseAllClick = () => {
    setExpanded({
      upcoming1: false,
      upcoming2: false,
      campaign: false,
      followUp: false,
      waitingList: false,
      order: false,
      map: false,
    });
  };

  const [stateData, setStateData, setUrl, forceUpdate] = useFetchData(
    `${ORDER_CHART_URL}?chart_type=state&duration=month`,
    null,
    {
      data: [],
    },
  );

  const handleExpandClick = (type) => {
    setExpanded({
      ...expanded,
      [type]: !expanded[type],
    });
  };

  const forceCampaign = () => {
    tableCampaignRef.current.onQueryChange();
  };
  const forceMarketing = () => {
    tableMarketingRef.current.onQueryChange();
  };
  const forceActivities = () => {
    tableActivtyRef.current.onQueryChange();
  };

  const forceFollowUp = () => {
    tableFollowUpRef.current.onQueryChange();
  };
  const forceOrder = () => {
    tableOrderUpRef.current.onQueryChange();
  };

  const regionData = stateData.data.reduce((acc, d) => {
    acc[`US-${d.code}`] = d.amount;
    return acc;
  }, {});

  const totalAmount = stateData.data.reduce((acc, d) => {
    acc += d.amount;
    return acc;
  }, 0);
  const handleScroll = () => {
    if (
      vectorRef.current
      && window.pageYOffset
      >= vectorRef.current.refs.map.getBoundingClientRect().bottom
    ) {
      setFloatingState(true);
    } else {
      setFloatingState(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      handleScroll();
    });
    return window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchContact = (searchContact) => {
    apiGet(SEARCH_CONTACT + `?q=${searchContact}&start=0&end=10`)
      .then(res => {
        setContacts(res.data.contacts)
      })
  }

  return (
    <div className={classes.root}>
      <Grid container classes={{ container: classes.fixTable }}>
        <SearchContact handleSearchContact={handleSearchContact} />
        {/* <Grid item xs={6}>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Contacts"
              // value={searchContact}
              onChange={e => setSearchContact(e.target.value)}
              inputProps={{ 'aria-label': 'Search Contact' }}
            />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={handleSearchContact}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid> */}
        <Grid item xs={6} className={cn('text-right')}>
          <Button
            style={{ outline: 'none' }}
            variant="outlined"
            size="small"
            color="default"
            onClick={() => handleCollapseAllClick()}
          >
            <RemoveIcon fontSize="small" />
            {' '}
            Collapse All
          </Button>
          {' '}
          <Button
            style={{ outline: 'none' }}
            variant="outlined"
            size="small"
            color="default"
            onClick={() => handleExpandAllClick()}
          >
            <AddIcon fontSize="small" />
            {' '}
            Expand All
          </Button>
        </Grid>
        {
          contacts.length > 0 &&
          <ul className='p-3'>
            {
              contacts.map(data => {
                return (
                  <li>You are looking for &nbsp;
                  <Link to={`/contacts/${data.id}`}>
                      {data.first_name} {data.last_name}?
                  </Link>
                  </li>
                )
              })
            }
          </ul>
        }

        <Grid item xs={12}>
          <Paper className={cn({ 'shadow-none': !expanded.map })}>
            <Card className={cn({ 'shadow-none': !expanded.map })}>
              <CardHeader color="info">
                <h4 className={classes.cardChartTitle}>
                  Top 6 states with highest amount of orders
                </h4>
                <IconButton
                  className={cn(classes.expand_map, {
                    [classes.expandOpen]: expanded.map,
                  })}
                  onClick={() => handleExpandClick('map')}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardHeader>
              <Collapse in={expanded.map}>
                <CardBody>
                  <Grid container>
                    <Grid item xs={5}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell style={{ textAlign: 'right' }}>
                              Amount
                            </TableCell>
                            <TableCell>Percentage</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {stateData.data.reverse().map((d, index) => (
                            <TableRow>
                              <TableCell>{d.code}</TableCell>
                              <TableCell>{stateHashes[d.code]}</TableCell>
                              <TableCell style={{ textAlign: 'right' }}>
                                {d.amount}
                              </TableCell>
                              <TableCell>
                                {`${((d.amount * 100) / totalAmount).toFixed(
                                  2,
                                )}%`}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid item xs={7}>
                      <div style={{ witdh: '50%', height: '300px' }}>
                        <VectorMap
                          map="us_aea"
                          backgroundColor="transparent"
                          containerClassName="map"
                          ref={vectorRef}
                          containerStyle={{
                            width: '100%',
                            height: '100%',
                          }}
                          labels={{
                            regions: {
                              render: code => code.split('-')[1],
                              offsets: code => ({
                                CA: [-10, 10],
                                ID: [0, 40],
                                OK: [25, 0],
                                LA: [-20, 0],
                                FL: [45, 0],
                                KY: [10, 5],
                                VA: [15, 5],
                                MI: [30, 30],
                                AK: [50, -25],
                                HI: [25, 50],
                              }[code.split('-')[1]]),
                            },
                          }}
                          regionStyle={{
                            initial: {
                              fill: '#e4e4e4',
                              'fill-opacity': 0.9,
                              stroke: 'none',
                              'stroke-width': 0,
                              'stroke-opacity': 0,
                            },
                          }}
                          regionLabelStyle={{
                            initial: {
                              fill: '#fff',
                            },
                            hover: {
                              fill: 'black',
                            },
                            selected: {
                              fill: '#F4A582',
                            },
                          }}
                          selectedRegions={
                            selectingRegion ? [selectingRegion] : []
                          }
                          series={{
                            regions: [
                              {
                                values: regionData,
                                scale: ['#e8f5e9', '#1b5e20'],
                                normalizeFunction: 'polynomial',
                                legend: {
                                  // horizontal: true,
                                  // vertical: true,
                                  title: 'Amount Ranges',
                                },
                              },
                            ],
                          }}
                          containerClassName="map"
                          onRegionTipShow={(e, el, code) => {
                            el.html(
                              `${el.html()}: ${
                              regionData[code] ? regionData[code] : 0
                              }`,
                            );
                          }}
                          regionsSelectable
                          regionsSelectableOne
                          onRegionClick={(e, code) => {
                            dirty=true
                            if (code === selectingRegion) {
                              setSelectingRegion(false);
                            } else {
                              setSelectingRegion(code);
                            }
                          }}

                        />
                      </div>
                    </Grid>
                  </Grid>
                </CardBody>
              </Collapse>
            </Card>
          </Paper>
        </Grid>
        {floatingState && (
          <div
            className="shadow"
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              padding: '16px',
              zIndex: '99999',
              backgroundColor: 'white',
            }}
          >
            <strong>Selecting state</strong>
            {' '}
            {selectingRegion ? stateHashes[selectingRegion.split('-')[1]] : 'All'}
          </div>
        )}
        <Grid item xs={12} className="pt-2">
          <ActivitiesTable
            tableActivtyRef={tableActivtyRef}
            tableMarketingRef={tableMarketingRef}
            forceActivities={forceActivities}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <CampaignsTable
            forceActivities={forceActivities}
            history={props.history}
            tableRef={tableCampaignRef}
            tableFollowUpRef={tableFollowUpRef}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
        <Grid item xs={12}>
          <TicketsTable
            forceActivities={forceActivities}
            history={props.history}
            forceMarketing={forceMarketing}
            tableMarketingRef={tableMarketingRef}
            forceFollowUp={forceFollowUp}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            selectingRegion={selectingRegion && stateHashes[selectingRegion.split('-')[1]]}
          />
        </Grid>
        <Grid item xs={12}>
          <FollowUpTable
            forceActivities={forceActivities}
            history={props.history}
            tableRef={tableFollowUpRef}
            forceFollowUp={forceFollowUp}
            forceOrder={forceOrder}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            selectingRegion={selectingRegion && stateHashes[selectingRegion.split('-')[1]]}
          />
        </Grid>
        <Grid item xs={12}>
          <OrderTable
            forceActivities={forceActivities}
            history={props.history}
            tableRef={tableOrderUpRef}
            forceOrder={forceOrder}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            selectingRegion={selectingRegion && stateHashes[selectingRegion.split('-')[1]]}

          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(SalerepDashboard);
