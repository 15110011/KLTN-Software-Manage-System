import * as React from "react";
import {
  withStyles,
  Typography,
  MenuItem,
  Select,
  IconButton,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import MTableBody from "material-table/dist/m-table-body";
import MTableHeader from "material-table/dist/m-table-header";
import TablePagination from "@material-ui/core/TablePagination";
import MTableCell from "material-table/dist/m-table-cell";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import * as dateFns from "date-fns";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as cn from "classnames";
import stateHash from "../../../common/StateHash";
import {
  EVENTS_URL,
  CONTACT_MARKETING_URL,
  ORDER_URL,
  LIFETIME_LICENSE_URL,
  LICENSE_URL
} from "../../../common/urls";

import styles from "../SalerepStyles.js";
import { EVENTS_URL, GROUP_URL } from "../../../common/urls";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CircleIcon from "@material-ui/icons/Brightness1";
import CreateEventDialog from "../../../Events/CreateEventDialog";
import CardBody from "../../../components/Card/CardBody";
import CustomFilterRow from "../../../components/CustomFilterRow";

import USERCONTEXT from "../../../components/UserContext";
import FollowUpDetail from "./FollowUpDetail";
import { apiGet, apiPost, apiPatch } from "../../../common/Request";
import useFetchData from "../../../CustomHook/useFetchData";
import FollowUpDetail from "./FollowUpDetail";
import CustomSnackbar from "../../../components/CustomSnackbar";
// import TicketDetail from './TicketDetail'

const flSearch = { status: [] };

let activePage = 0;
const flOrder = [];

function FollowUpTable(props) {
  const {
    classes,
    forceActivities,
    tableRef,
    history,
    forceFollowUp,
    forceOrder,
    expanded,
    handleExpandClick,
    selectingRegion
  } = props;

  // const [viewType, setViewType] = React.useState('campaign')

  // const [createEventDialog, setCreateEventDialog] = React.useState(false)

  const [tableData, setTableData] = React.useState([]);

  const [moreRow, setMoreRow] = React.useState(null);
  const [deletingRow, setDeletingRow] = React.useState({});
  const [movingRow, setMovingRow] = React.useState({});
  const [successNoti, setSuccessNoti] = React.useState(false);

  const [moreDialog, setMoreDialog] = React.useState(false);

  // const [groups, setGroups, setUrl] = useFetchData(GROUP_URL, null, { data: [], total: 0 })
  // const [timeRanges, setTimeRanges] = React.useState([null, null, null, null, null, { from: null, to: null }])
  //Activity

  const notification = (m = "Successfully Added") => {
    setSuccessNoti(m);
    setTimeout(() => {
      setSuccessNoti(false);
    }, 2000);
  };
  const onRemoveContact = () => {
    apiPatch(
      ORDER_URL + "/" + deletingRow.id,
      { status: "FAILED" },
      false,
      true
    ).then(res => {
      forceActivities();
      forceFollowUp();
      setDeletingRow({});
      setMoreDialog(false);
      // if (followUps.data.length == 1) {
      //   setMoreRow(null)
      // }
      notification("Successfully Removed");
    });
  };

  const onConfirmDeal = e => {
    const promises = [];
    const currentPackages =
      movingRow.followup.step_details[
        movingRow.followup.step_details.length - 1
      ].information["Choose Packages"].result;
    promises.push(
      apiPatch(
        ORDER_URL + "/" + movingRow.id,
        {
          status: "COMPLETED",
          packages: Object.keys(currentPackages).reduce((acc, k) => {
            if (currentPackages[k].type != "") {
              acc.push(k);
            }
            return acc;
          }, [])
        },
        false,
        true
      )
    );
    Object.keys(currentPackages).forEach((k, index) => {
      Object.keys(currentPackages[k]).forEach(type => {
        if (type == 999999) {
          for (let i = 0; i < currentPackages[k][type].quantity; i += 1) {
            promises.push(
              apiPost(
                LIFETIME_LICENSE_URL,
                {
                  order: movingRow.id,
                  package: parseInt(k),
                  start_date: dateFns.format(new Date(), "yyyy-MM-dd")
                },
                false,
                true
              )
            );
          }
        } else {
          for (let i = 0; i < currentPackages[k][type].quantity; i += 1) {
            promises.push(
              apiPost(
                LICENSE_URL,
                {
                  duration: type,
                  order: movingRow.id,
                  package: parseInt(k),
                  start_date: dateFns.format(new Date(), "yyyy-MM-dd")
                },
                false,
                true
              )
            );
          }
        }
      });
    });
    Promise.all(promises).then(res => {
      forceFollowUp();
      forceOrder();
      setMovingRow({});
      notification("Successfully Created");
      setMoreDialog(false);
      setMoreRow(null);
      apiGet(ORDER_URL + "/" + res[0].data.id + "/invoice", true);
    });
  };

  return (
    <USERCONTEXT.Consumer>
      {({ user }) => (
        <div style={{ position: "relative" }}>
          {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
          <Dialog
            open={Object.keys(deletingRow).length != 0}
            onClose={() => {
              setDeletingRow({});
            }}
          >
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div>
                  This contact <b>({deletingRow.fname})</b> will be failed and
                  this action cannot be undone. Are you sure?
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setDeletingRow({});
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onRemoveContact();
                }}
              >
                Remove
              </Button>
            </DialogActions>
          </Dialog>
          {Object.keys(movingRow).length > 0 && (
            <Dialog
              open={true}
              onClose={() => setMovingRow({})}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                <h4>Confirm Action</h4>
              </DialogTitle>
              <DialogContent>
                This will become an order and this action cannot be undone. Are
                you sure?
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => setMovingRow({})}>
                  Cancel{" "}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onConfirmDeal}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {moreDialog && (
            <Dialog
              open={true}
              onClose={() => setMoreDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>Manage Contact</h4>
              </DialogTitle>
              <DialogContent>
                <FollowUpDetail
                  id={moreRow.id}
                  // updateTable={tableActivtyRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  user={user}
                  setMovingRow={setMovingRow}
                  setDeletingRow={setDeletingRow}
                  moreRow={moreRow}
                  followup={moreRow.followup}
                  updateTable={() => {
                    forceFollowUp();
                    // tableMarketingRef.current.onQueryChange()
                    // let cloneMoreRow = { ...moreRow }
                    // cloneMoreRow.histories.unshift(contact)
                    // setMoreRow(cloneMoreRow)
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded["followUp"]
            })}
            onClick={() => handleExpandClick("followUp")}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse collapsedHeight="100px" in={expanded["followUp"]}>
            <MaterialTable
              tableRef={tableRef}
              components={{
                Header: props => (
                  <MTableHeader
                    {...props}
                    onOrderChange={(orderBy, dir) => {
                      flOrder.forEach((order, index) => {
                        if (orderBy != index) {
                          flOrder[index] = null;
                        }
                      });
                      flOrder[orderBy] = dir;

                      props.onOrderChange(orderBy, dir);
                    }}
                  />
                ),
                Body: props => (
                  <MTableBody
                    {...props}
                    onFilterChanged={(columnId, value) => {
                      if (columnId == 1) {
                        flSearch.fname = value;
                      } else if (columnId == 2) {
                        flSearch.state = value;
                      } else if (columnId == 3) {
                        flSearch.campaign = value;
                      } else if (columnId == 4) {
                        flSearch.noSteps = value;
                      } else if (columnId == 5) {
                        flSearch.progress = value;
                      } else if (columnId == 6) {
                        flSearch.created = value;
                      } else if (columnId == 7) {
                        flSearch.modified = value;
                      } else if (columnId == 8) {
                        flSearch.status = value;
                      }
                      props.onFilterChanged(columnId, value);
                      //activePage = 0;
                    }}
                  />
                ),
                Toolbar: props => (
                  <>
                    <Card plain>
                      <CardHeader color="warning">
                        <h4
                          onClick={() =>
                            history.push("/dashboard/follow-up-detail")
                          }
                          style={{ cursor: "pointer" }}
                          className={classes.cardTitleWhite}
                        >
                          Follow-up
                        </h4>
                      </CardHeader>
                    </Card>
                  </>
                ),
                Pagination: props => (
                  <TablePagination
                    {...props}
                    page={activePage}
                    rowsPerPageOptions={[5, 10, 20]}
                    count={props.count}
                    onChangePage={(e, nextPage) => {
                      props.onChangePage(a, nextPage);
                      // setActivePage(nextPage)
                      activePage = nextPage;
                    }}
                  />
                ),
                Cell: props => (
                  <>
                    {props.columnDef.field == "status" && (
                      <Tooltip
                        title={`Last contact is ${
                          props.rowData.status
                        } days ago`}
                      >
                        <MTableCell {...props} />
                      </Tooltip>
                    )}

                    {props.columnDef.field !== "status" && (
                      <MTableCell {...props} />
                    )}
                  </>
                ),
                FilterRow: props => {
                  return <CustomFilterRow {...props} />;
                }
              }}
              columns={[
                {
                  title: "#",
                  field: "#",
                  headerStyle: { maxWidth: "0px" },
                  filtering: false,
                  sorting: false
                },
                {
                  title: "Full Name",
                  field: "fname",
                  cellStyle: { width: "20%" },
                  render: row => {
                    return (
                      <Link to={"/contacts/" + row.contact.id}>
                        {row.fname}
                      </Link>
                    );
                  }
                },
                {
                  title: "State",
                  field: "state"
                },
                {
                  title: "Campaign",
                  field: "campaignName"
                },
                {
                  title: "No. Steps",
                  field: "noSteps",
                  type: "numeric",
                  cellStyle: { width: "10px" }
                },
                {
                  title: "Progress",
                  field: "progress",
                  filtering: false,
                  type: "numeric",
                  render: rowData => {
                    if (rowData.progress < 50) {
                      return (
                        <span className="text-danger">
                          {rowData.progress.toFixed(2) + "%"}
                        </span>
                      );
                    }
                    return (
                      <span className="text-success">
                        {rowData.progress.toFixed(2) + "%"}
                      </span>
                    );
                  }
                },
                {
                  title: "Created",
                  field: "created",
                  render: row => {
                    return dateFns.format(
                      dateFns.parseISO(row.created),
                      "MM-dd-yyyy"
                    );
                  },
                  type: "date",
                  cellStyle: { width: "15%" }
                },
                {
                  title: "Last Contact",
                  field: "modified",
                  render: row => {
                    return dateFns.format(
                      dateFns.parseISO(row.modified),
                      "HH:mm MM-dd-yyyy"
                    );
                  },
                  type: "date",
                  cellStyle: { width: "15%" }
                },
                {
                  title: "Contact Frequency",
                  field: "status",
                  render: row => {
                    if (row.status < 5)
                      return (
                        <CircleIcon className="text-success" fontSize="small" />
                      );
                    else if (row.status >= 5 && row.status <= 15)
                      return (
                        <CircleIcon className="text-warning" fontSize="small" />
                      );
                    else
                      return (
                        <CircleIcon className="text-danger" fontSize="small" />
                      );
                  },
                  lookup: {
                    long: "Greater than 15 days",
                    med: "Between 5 and 15 days",
                    short: "Less than 5 days"
                  }
                }
              ]}
              data={query => {
                return new Promise((resolve, reject) => {
                  let searchString = `${
                    flSearch.fname ? "&contact_name=" + flSearch.fname : ""
                  }`;
                  searchString += `${
                    flSearch.email ? "&email=" + flSearch.email : ""
                  }`;
                  searchString += `${
                    flSearch.phone ? "&phone=" + flSearch.phone : ""
                  }`;
                  searchString += `${
                    flSearch.campaign ? "&campaign=" + flSearch.campaign : ""
                  }`;
                  searchString += `${
                    flSearch.noSteps ? "&no_steps=" + flSearch.noSteps : ""
                  }`;
                  searchString += `${
                    flSearch.created
                      ? `&created=${dateFns.format(
                          flSearch.created,
                          "yyyy-MM-dd"
                        )}`
                      : ""
                  }`;
                  searchString += `${
                    flSearch.modified
                      ? `&modified=${dateFns.format(
                          flSearch.modified,
                          "yyyy-MM-dd"
                        )}`
                      : ""
                  }`;
                  searchString += `${
                    flSearch.status.length
                      ? "&status_fl=" + flSearch.status
                      : ""
                  }`;
                  searchString += `${
                    flOrder[1] ? "&contact_order=" + flOrder[1] : ""
                  }`;
                  searchString += `${
                    flOrder[2] ? "&email_order=" + flOrder[2] : ""
                  }`;
                  searchString += `${
                    flOrder[3] ? "&campaign_order=" + flOrder[3] : ""
                  }`;
                  searchString += `${
                    flOrder[4] ? "&no_steps_order=" + flOrder[4] : ""
                  }`;
                  searchString += `${
                    flOrder[5] ? "&progress_order=" + flOrder[5] : ""
                  }`;
                  searchString += `${
                    flOrder[6] ? "&created_order=" + flOrder[6] : ""
                  }`;
                  searchString += `${
                    flOrder[7] ? "&modified_order=" + flOrder[7] : ""
                  }`;
                  searchString += `${
                    flOrder[8] ? "&status_order=" + flOrder[8] : ""
                  }`;

                  searchString += `${
                    selectingRegion ? `&selectingState=${selectingRegion}` : ""
                  }`;
                  apiGet(
                    ORDER_URL +
                      `?page=${activePage}&limit=${query.pageSize}` +
                      searchString +
                      query.search,
                    true
                  ).then(res => {
                    const data = res.data.data.map((d, index) => {
                      const noSteps = d.campaign.follow_up_plan.steps.length;
                      const progress =
                        (d.step_details.reduce((acc, s) => {
                          if (s.status == "COMPLETED") acc += 1;
                          return acc;
                        }, 0) /
                          noSteps) *
                        100;
                      return {
                        "#": query.pageSize * activePage + index + 1,
                        fname:
                          d.contacts.first_name + " " + d.contacts.last_name,
                        phone: d.contacts.phone,
                        mail: d.contacts.mail,
                        state: stateHash[d.contacts.state],
                        campaignName: d.campaign.name,
                        noSteps,
                        progress,
                        id: d.id,
                        packages: d.campaign.packages,
                        followup: d,
                        histories: d.history,
                        allHistories: d.all_histories,
                        contact: d.contacts,
                        created: d.created,
                        modified: d.modified,

                        status: dateFns.differenceInDays(
                          new Date(),
                          dateFns.parseISO(d.modified)
                        )
                      };
                    });
                    if (moreRow) {
                      setMoreRow(data[moreRow.tableData.id]);
                    }

                    //setTableData(data);
                    resolve({
                      data,
                      page: res.data.page,
                      totalCount: res.data.total
                    });
                  });
                });
              }}
              actions={[
                {
                  icon: "remove",
                  tooltip: "Mark this contact as failed",
                  onClick: (event, row) => {
                    setDeletingRow(row);
                  }
                },
                row => ({
                  icon: "done",
                  tooltip: "Confirm deal",
                  onClick: (event, row) => {
                    setMovingRow(row);
                  },
                  disabled: row.progress != 100
                }),
                {
                  icon: "more_vert",
                  tooltip: "More actions",
                  onClick: (event, row) => {
                    setMoreRow(row);
                    setMoreDialog(true);
                  }
                }
              ]}
              options={{
                search: false,
                filtering: true,
                paging: true,
                debounceInterval: 300,
                actionsColumnIndex: -1
              }}
            />
          </Collapse>
        </div>
      )}
    </USERCONTEXT.Consumer>
  );
}

export default withStyles(styles)(FollowUpTable);
