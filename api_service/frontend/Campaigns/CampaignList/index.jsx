import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { InputLabel } from '@material-ui/core';
import useFetchData from '../../CustomHook/useFetchData'
import CreateCampaign from '../CreateCampaign'
import styles from './CampaignListStyle'
import CustomFilterRow from '../../components/CustomFilterRow'
import TablePagination from '@material-ui/core/TablePagination'
import CustomSnackbar from '../../components/CustomSnackbar'

// API
import { CAMPAIGNS_URL, REFRESH_TOKEN_URL, PACKAGES_URL } from "../../common/urls";
import { apiPost, apiGet } from '../../common/Request'
import { BAD_REQUEST } from "../../common/Code";

function CampaignList(props) {
  const [createCampaignDialog, setCreateCampaignDialog] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)
  const { classes, user } = props;
  const search = {}
  let activePage = 0
  const tableRef = React.useRef(null)
  // const [campaignData, setCampaignData, setCampaignURL, forceUpdateCampaign] = useFetchData(CAMPAIGNS_URL, props.history, { data: [], total: 0 })
  const handleCloseCreateCampaignDialog = e => {
    setCreateCampaignDialog(false)
  }

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m)
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    tableRef.current.onQueryChange()
  }

  return (
    <div className={classes.root}>
      {createCampaignDialog && <CreateCampaign
        handleCloseCreateCampaignDialog={handleCloseCreateCampaignDialog}
        createCampaignDialog={createCampaignDialog}
        setCreateCampaignDialog={setCreateCampaignDialog}
        user={user}
        notification={notification}
      />}

      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
            // components={{
            //   FilterRow: props => {
            //     return (
            //       <CustomFilterRow {{
            //         ...props, onFilterDateRange: (position, date, colId) => {
            //           search[position] = date
            //           tableRef.current.onQueryChange()
            //         }
            //       }} />)
            //   }
            // }}
            components={{
              Pagination: props => <TablePagination {...props}
                page={activePage} rowsPerPageOptions={[5, 10, 20]}
                count={props.count}
                onChangePage={(e, nextPage) => {
                  props.onChangePage(a, nextPage)
                  // setActivePage(nextPage)
                  activePage = nextPage
                }}
              />
            }}
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              {
                title: 'Description', field: 'description', filtering: false, render: rowData => {
                  return (
                    <span dangerouslySetInnerHTML={{ __html: rowData.description }}></span>
                  )
                }
              },
              {
                title: 'Status',
                field: 'status',
                lookup: { 'ACTIVE': 'ACTIVE', 'INACTIVE': 'INACTIVE' }
              },
            ]}
            data={(query) =>
              new Promise((resolve, reject) => {
                let searchString = `${search.name ? '&name=' + search.name : ''}`
                if (search.status && search.status.length === 1)
                  searchString += `${search.status ? '&status=' + search.status : ''}`
                if (search.from)
                  searchString += `${search.from ? '&from=' + search.from : ''}`
                apiGet(CAMPAIGNS_URL + `?page=${activePage}&limit=${query.pageSize}` + searchString, true)
                  .then(json => {
                    const data = json.data.data.map((campaign, index) => ({
                      numeral: activePage * query.pageSize + index + 1,
                      name: campaign.name,
                      description: campaign.desc,
                      status: campaign.status,
                    }))
                    resolve({
                      data,
                      // page: json.data.page,
                      totalCount: json.data.total
                    })
                  })
              })}
            title="Campaign List"
            actions={[
              {
                icon: 'done_all',
                tooltip: 'Do',
                onClick: (event, rows) => {
                  alert('You selected ' + rows.length + ' rows')
                },
              },
              {
                icon: 'add',
                tooltip: 'Create Campaign',
                onClick: (event, rows) => {
                  setCreateCampaignDialog(true)
                  // setCreateProduct()
                },
                isFreeAction: true
              }
            ]}
            options={{
              selection: true,
              filtering: true,
              paging: true
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CampaignList);