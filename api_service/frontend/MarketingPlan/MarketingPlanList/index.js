import * as React from 'react'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body'
import { TablePagination } from '@material-ui/core';

// API
import { MARKETING_PLANS_URL } from "../../common/urls";
import { BAD_REQUEST } from '../../common/Code'
import { apiGet, apiDelete } from '../../common/Request';


import styles from './MarketingPlanListStyle'
import CreateMarketingPlan from '../CreateMarketingPlan'
import CustomSnackbar from '../../components/CustomSnackbar'


function MarketingPlanList(props) {

  const [createMarketingPlanDialog, setCreateMarketingPlanDialog] = React.useState(false)
  const [errNotice, setErrNotice] = React.useState(false)
  const [completeNotice, setCompleteNotice] = React.useState(false)

  const handleCloseCreateMarketingPlanDialog = e => {
    setCreateMarketingPlanDialog(false)
  }

  const handleDeleteFeature = (e, unitIndex) => {
    e.stopPropagation()
    let features = createProduct.features.concat([])
    features = features.slice(0, unitIndex)
      .concat(features.slice(unitIndex + 1))
    setCreateProduct({ ...createProduct, features })
    setCreateFeature({
      name: '',
      price: '',
      desc: '',
      number: ''
    })
  }
  let notiTimeout = {}

  const setDeleteMarketingPlan = data => {
    let deleteData = []
    let errorData = []
    data.forEach(d => {
      if (d.can_remove) {
        deleteData.push(d.id)
      }
      else {
        errorData.push(d)
      }
    })

    if (errorData.length) {
      setErrNotice(errorData.reduce((acc, d) => {
        acc += d.name + ', '
        return acc
      }, '').slice(0, -2) + `${errorData.length == 1 ? ' is' : ' are'} in used`)
      notiTimeout.err = setTimeout(() => {
        setErrNotice(false)
      }, 2000);
      return
    }

    apiDelete(MARKETING_PLANS_URL + '/' + 'batchdelete', {
      marketing_plans: deleteData
    }, true).then(res => {
      if (res.data.code == BAD_REQUEST) {
        setErrNotice('Delete failed')
        notiTimeout.err = setTimeout(() => {
          setErrNotice(false)
        }, 2000);
      } else {
        setCompleteNotice('Successfully Deleted')
        notiTimeout.success = setTimeout(() => {
          setCompleteNotice(false)
        }, 2000);
        tableRef.current.onQueryChange()

        setDeleteContactConfirm(false)
      }
    })
  }

  const { classes } = props;
  const tableRef = React.useRef(null);
  const search = {}
  let activePage = 0

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m)
    setTimeout(() => {
      setCompleteNotice(false)
    }, 2000);
    tableRef.current.onQueryChange()
  }

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice && <CustomSnackbar isErr msg={errNotice} />}
      {
        createMarketingPlanDialog &&
        <CreateMarketingPlan
          notification={notification}
          isEditMarketingPlan={false}
          isCreateMarketingPlanDialog={true}
          createMarketingPlanDialog={createMarketingPlanDialog}
          handleCloseCreateMarketingPlanDialog={handleCloseCreateMarketingPlanDialog}
          setCreateMarketingPlanDialog={setCreateMarketingPlanDialog}
        />}
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            columns={[
              { title: '#', field: 'numeral', type: 'numeric', cellStyle: { width: '50px' }, filtering: false },
              { title: 'Name', field: 'name' },
              { title: 'Quantity In Used', field: 'used' },
              {
                title: 'Status',
                field: 'status',
              },
            ]}
            tableRef={tableRef}
            components={
              {
                Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                  if (columnId === 1) search.name = value
                  if (columnId === 3) search.status = value
                  props.onFilterChanged(columnId, value)
                }}
                />,
                Pagination: props => <TablePagination {...props}
                  page={activePage} rowsPerPageOptions={[5, 10, 20]}
                  count={props.count}
                  onChangePage={(e, nextPage) => {
                    props.onChangePage(e, nextPage)
                    activePage = nextPage
                  }}
                />
              }
            }
            data={(query) =>
              new Promise((resolve, reject) => {
                let searchString = `${search.name ? '&name=' + search.name : ''}`
                if (search.status && search.status.length === 1)
                  searchString += `${search.status ? '&status=' + search.status : ''}`
                apiGet(MARKETING_PLANS_URL + `?page=${activePage}&limit=${query.pageSize}` + searchString, true)
                  .then(json => {
                    const data = json.data.data.map((m, i) => ({
                      numeral: activePage * query.pageSize + i + 1,
                      name: m.name,
                      used: m.used,
                      status: m.status,
                      id: m.id,
                      can_remove: m.can_remove
                    }))
                    resolve({
                      data,
                      totalCount: json.data.total
                    })
                  })
              })
            }
            title="Marketing Plan"
            actions={[
              {
                icon: 'delete',
                tooltip: 'Remove',
                onClick: (event, rows) => {
                  setDeleteMarketingPlan(rows)
                },
              },
              {
                icon: 'add',
                tooltip: 'Create Marketing Plan',
                onClick: (event, rows) => {
                  setCreateMarketingPlanDialog(true)
                  // setCreateProduct()
                },
                isFreeAction: true
              }
            ]}
            options={{
              selection: true,
              filtering: true,
              paging: true,

            }}
            onRowClick={(e, rowData) => {
              props.history.push('/marketing-plans/' + rowData.id)
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MarketingPlanList);