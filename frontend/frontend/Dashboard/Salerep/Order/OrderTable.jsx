import * as React from "react";
import {
  withStyles,
  Typography,
  MenuItem,
  Select,
  IconButton,
  Grid
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import MaterialTable from "material-table";
import MTableBody from "material-table/dist/m-table-body";
import MTableHeader from "material-table/dist/m-table-header";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import * as dateFns from "date-fns";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as cn from "classnames";
import {
  EVENTS_URL,
  CONTACT_MARKETING_URL,
  ORDER_URL
} from "../../../common/urls";
import * as dateFns from 'date-fns'
import stateHash from '../../../common/StateHash'
import styles from "../SalerepStyles.js";
import { EVENTS_URL, GROUP_URL } from "../../../common/urls";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CreateEventDialog from "../../../Events/CreateEventDialog";
import CardBody from "../../../components/Card/CardBody";
// import CustomFItlerRow from '../../../components/CustomFilterRow'

import USERCONTEXT from "../../../components/UserContext";
import { apiGet, apiPost } from "../../../common/Request";
import useFetchData from "../../../CustomHook/useFetchData";
import OrderDetail from "./OrderDetail";

let flSearch = {};

let activePage = 0;

function OrderTable(props) {
  const {
    classes,
    forceActivities,
    tableRef,
    history,
    expanded,
    handleExpandClick,
    selectingRegion
  } = props;

  // const [viewType, setViewType] = React.useState('campaign')

  // const [createEventDialog, setCreateEventDialog] = React.useState(false)

  const [openDialog, setOpenDialog] = React.useState(false);

  const [moreRow, setMoreRow] = React.useState(null);
  const [deletingRow, setDeletingRow] = React.useState(null);
  const [movingRow, setMovingRow] = React.useState(null);

  const [moreDialog, setMoreDialog] = React.useState(false);

  // const [groups, setGroups, setUrl] = useFetchData(GROUP_URL, null, { data: [], total: 0 })
  // const [timeRanges, setTimeRanges] = React.useState([null, null, null, null, null, { from: null, to: null }])
  //Activity

  const flOrder = [];

  const onNotiSuccess = msg => {
    setNotiSuccess(msg);
    setTimeout(() => {
      setNotiSuccess(false);
    }, 2000);
  };

  return (
    <USERCONTEXT.Consumer>
      {({ user }) => (
        <div style={{ position: "relative" }}>
          {moreDialog && (
            <Dialog
              open={true}
              onClose={() => setMoreDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>Manage Orders</h4>
              </DialogTitle>
              <DialogContent>
                <OrderDetail
                  moreRow={moreRow}
                  setDeletingRow={setDeletingRow}
                  setMovingRow={setMovingRow}
                  onNotiSuccess={onNotiSuccess}
                  userId={user.id}
                  user={user}
                />
              </DialogContent>
            </Dialog>
          )}
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded["order"]
            })}
            onClick={() => handleExpandClick("order")}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse collapsedHeight="100px" in={expanded["order"]}>
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
                        flSearch.noSteps = value;
                      } else if (columnId == 4) {
                        flSearch.status = value;
                      } else if (columnId == 5) {
                        flSearch.created = value;
                      }
                      activePage = 0;
                      props.onFilterChanged(columnId, value);
                    }}
                  />
                ),
                Toolbar: props => (
                  <>
                    <Card plain>
                      <CardHeader color="rose">
                        <h4
                          onClick={() =>
                            history.push("/dashboard/order-detail")
                          }
                          style={{ cursor: "pointer" }}
                          className={classes.cardTitleWhite}
                        >
                          Order
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
                )
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
                  title: "Full Name", field: "full_name",
                  render: (row) => {
                    return (<Link to={"/contacts/" + row.contacts.id}>{row.full_name}</Link>)
                  },
                },
                {
                  title: "State",
                  field: "state"
                },
                {
                  title: "No.packages",
                  field: "numberOfPackages",
                  cellStyle: { width: '5%' }
                },
                {
                  title: "Licenses Status",
                  field: "status",
                  render: rowData => {
                    if (rowData.licenseStatus == "EXPIRING")
                      return (
                        <div className="text-warning">
                          Some licenses are expiring soon
                        </div>
                      );
                    else if (rowData.licenseStatus == "EXPIRED")
                      return (
                        <div className="text-danger">
                          Some licenses are expired
                        </div>
                      );
                    else if (rowData.licenseStatus == "GOOD")
                      return (
                        <div className="text-success">
                          All licenses are working fine
                        </div>
                      );
                    else if (rowData.allLifetimeLicenses.length) {
                      return (
                        <div className="text-success">
                          All licenses are working fine
                        </div>
                      );
                    }
                  }
                },

                {
                  title: "Created",
                  field: "created",
                  render: (row) => {
                    return dateFns.format(dateFns.parseISO(row.created), 'HH:mm MM-dd-yyyy')
                  },
                  headerStyle: { width: '15%' }
                },
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
                    flOrder[1] ? "&contact_order=" + flOrder[1] : ""
                    }`;
                  searchString += `${
                    flOrder[2] ? "&state_order=" + flOrder[2] : ""
                    }`;
                  searchString += `${
                    flOrder[3] ? "&no_steps_order=" + flOrder[3] : ""
                    }`;
                  searchString += `${
                    flOrder[4] ? "&status_order=" + flOrder[4] : ""
                    }`;
                  searchString += `${
                    flOrder[5] ? "&created_order=" + flOrder[5] : ""
                    }`;
                  searchString += `${
                    selectingRegion ? `&selectingState=${selectingRegion}` : ""
                    }`;
                  apiGet(
                    ORDER_URL +
                    `?status=COMPLETED&page=${activePage}&limit=${
                    query.pageSize
                    }` +
                    searchString +
                    query.search,
                    true
                  ).then(res => {
                    const data = res.data.data.map((d, index) => {
                      const data = { expiring: 0, expired: 0 };
                      const licenseStatus = d.licenses.reduce(
                        (acc, license, licenseIndex) => {
                          const licenseTime = dateFns.addMonths(
                            new Date(license.start_date),
                            license.duration
                          );
                          const timeLeft =
                            licenseTime - dateFns.addDays(new Date(), 10);
                          const tenDays = 864000000;
                          if (timeLeft < 0) {
                            const time = -timeLeft;
                            if (time > tenDays) {
                              data.expired += 1;
                            }
                            if (
                              time > 0 &&
                              time < tenDays &&
                              data.expired == 0
                            ) {
                              data.expiring += 1;
                            }
                          }
                          if (data.expired) {
                            return "EXPIRED";
                          } else if (data.expiring) {
                            return "EXPIRING";
                          }

                          return "GOOD";
                        },
                        ""
                      );
                      return {
                        "#": query.pageSize * activePage + index + 1,
                        full_name:
                          d.contacts.first_name + " " + d.contacts.last_name,
                        phone: d.contacts.phone,
                        email: d.contacts.mail,
                        state: stateHash[d.contacts.state],
                        created: d.created,
                        numberOfPackages: d.packages.length,
                        packages: d.packages,
                        status: d.status,
                        licenseStatus,
                        contacts: d.contacts,
                        allLicenses: d.licenses,
                        allLifetimeLicenses: d.lifetime_licenses,
                        id: d.id
                      };
                    });
                    resolve({
                      data,
                      page: res.data.page,
                      totalCount: res.data.total
                    });
                  });
                });
              }}
              actions={[
                // {
                //   icon: 'remove',
                //   tooltip: 'Fail this Contact',
                //   onClick: (event, row) => {
                //     setDeletingRow(row)
                //   },
                // },
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

export default withStyles(styles)(OrderTable);
