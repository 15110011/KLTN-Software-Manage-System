import * as React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MTableBody from 'material-table/dist/m-table-body';
import { TablePagination } from '@material-ui/core';
import useFetchData from '../../CustomHook/useFetchData';

import { apiGet, apiDelete } from '../../common/Request';
import { FOLLOW_UP_PLANS_URL } from '../../common/urls';
import CreateFollowUpPlan from '../CreateFollowUpPlan';
import CustomSnackbar from '../../components/CustomSnackbar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fixTable: {
    maxWidth: '90%',
  },
});

function FollowUpPlanList(props) {
  const { classes } = props;
  const [
    createFollowUpPlanDialog,
    setCreateFollowUpPlanDialog,
  ] = React.useState(false);
  const [completeNotice, setCompleteNotice] = React.useState(false);
  const [errNotice, setErrNotice] = React.useState(false);

  const handleCloseCreateFollowUpPlan = (e) => {
    setCreateFollowUpPlanDialog(false);
  };

  const notification = (m = 'Successfully Created') => {
    setCompleteNotice(m);
    setTimeout(() => {
      setCompleteNotice(false);
    }, 2000);
    tableRef.current.onQueryChange();
  };

  const setDeleteFollowUp = (data) => {
    const deleteData = [];
    const errorData = [];
    data.forEach((d) => {
      if (d.used === 0) {
        deleteData.push(d.id);
      } else {
        errorData.push(d);
      }
    });

    if (errorData.length) {
      setErrNotice(
        `${errorData
          .reduce((acc, d) => {
            acc += `${d.name}, `;
            return acc;
          }, '')
          .slice(0, -2)}${errorData.length == 1 ? ' is' : ' are'} in used`,
      );
      setTimeout(() => {
        setErrNotice(false);
      }, 2000);
      return;
    }

    apiDelete(
      `${FOLLOW_UP_PLANS_URL}/` + 'batchdelete',
      {
        follow_ups: deleteData,
      },
      true,
    ).then((res) => {
      if (res.data.code == BAD_REQUEST) {
        setErrNotice('Delete failed');
        setTimeout(() => {
          setErrNotice(false);
        }, 2000);
      } else {
        setCompleteNotice('Successfully Deleted');
        setTimeout(() => {
          setCompleteNotice(false);
        }, 2000);
        tableRef.current.onQueryChange();
      }
    });
  };

  const tableRef = React.useRef(null);
  const search = {};
  let activePage = 0;
  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      {errNotice && <CustomSnackbar isErr msg={errNotice} />}
      {createFollowUpPlanDialog && (
        <CreateFollowUpPlan
          notification={notification}
          createFollowUpPlanDialog={createFollowUpPlanDialog}
          handleCloseCreateFollowUpPlan={handleCloseCreateFollowUpPlan}
          onCreateSuccess={() => {
            tableRef.current.onQueryChange();
          }}
        />
      )}
      <Grid classes={{ container: classes.fixTable }} container spacing={8}>
        <Grid item xs={12}>
          <MaterialTable
            tableRef={tableRef}
            components={{
              Body: props => (
                <MTableBody
                  {...props}
                  onFilterChanged={(columnId, value) => {
                    if (columnId === 1) search.name = value;
                    if (columnId === 3) search.status = value;
                    props.onFilterChanged(columnId, value);
                  }}
                />
              ),
              Pagination: props => (
                <TablePagination
                  {...props}
                  page={activePage}
                  rowsPerPageOptions={[5, 10, 20]}
                  count={props.count}
                  onChangePage={(e, nextPage) => {
                    props.onChangePage(e, nextPage);
                    activePage = nextPage;
                  }}
                />
              ),
            }}
            columns={[
              {
                title: '#',
                field: 'numeral',
                type: 'numeric',
                cellStyle: { width: '50px' },
                filtering: false,
              },
              { title: 'Name', field: 'name' },
              { title: 'Number of steps', field: 'steps' },
              {
                title: 'Status',
                field: 'status',
                lookup: { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' },
              },
            ]}
            data={query => new Promise((resolve, reject) => {
              apiGet(
                `${FOLLOW_UP_PLANS_URL}?page=${activePage}&limit=${
                  query.pageSize
                }`,
                true,
              ).then((json) => {
                const data = json.data.data.map((plan, i) => ({
                  numeral: activePage * query.pageSize + i + 1,
                  name: plan.name,
                  steps: plan.steps.length,
                  id: plan.id,
                }));
                resolve({
                  data,
                  page: json.data.page,
                  totalCount: json.data.total,
                });
              });
            })
            }
            title="Follow Up Plan List"
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rows) => {
                  setDeleteFollowUp(rows);
                },
              },
              {
                icon: 'add',
                tooltip: 'Create Follow-up Plan',
                onClick: (event, rows) => {
                  setCreateFollowUpPlanDialog(true);
                  // setCreateProduct()
                },
                isFreeAction: true,
              },
            ]}
            options={{
              search: false,
              selection: true,
              filtering: true,
              paging: true,
            }}
            onRowClick={(e, rowData) => {
              props.history.push(`/follow-up-plans/${rowData.id}`);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FollowUpPlanList);
