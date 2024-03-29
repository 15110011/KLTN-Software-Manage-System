import * as React from "react";
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import MTableBody from "material-table/dist/m-table-body";
import MTableHeader from "material-table/dist/m-table-header";
import TablePagination from "@material-ui/core/TablePagination";
import CircleIcon from "@material-ui/icons/Brightness1";
import MTableCell from "material-table/dist/m-table-cell";
import MTableFilterRow from "material-table/dist/m-table-filter-row";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as cn from "classnames";
import * as dateFns from "date-fns";
import styles from "./SalerepStyles.js";
import { EVENTS_URL, CONTACT_MARKETING_URL } from "../../common/urls";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TicketDetail from "./TicketDetail";
import { apiGet, apiPost, apiPatch } from "../../common/Request";
import CustomSnackbar from "../../components/CustomSnackbar";
import USERCONTEXT from "../../components/UserContext";
import stateHash from "../../common/StateHash";
import CustomFilterRow from "../../components/CustomFilterRow";

const search = {};
let activePage = 0;
const order = [];

function TicketsTable(props) {
  const {
    classes,
    tableMarketingRef,
    forceActivities,
    forceMarketing,
    history,
    forceFollowUp,
    expanded,
    handleExpandClick,
    selectingRegion
  } = props;

  const [deletingRow, setDeletingRow] = React.useState({});
  const [movingRow, setMovingRow] = React.useState({});
  const [moreRow, setMoreRow] = React.useState({});
  const [successNoti, setSuccessNoti] = React.useState(false);

  const [laterDialog, setLaterDialog] = React.useState(false);
  const [moreDialog, setMoreDialog] = React.useState(false);

  // Marketing
  const marketingSearch = {};

  const getMoreRow = id => {
    apiGet(`${CONTACT_MARKETING_URL}/${id}`, true).then(res => {
      const c = res.data;
      setMoreRow({
        full_name: c.contact.full_name,
        mail: c.contact.mail,
        phone: c.contact.phone,
        campaignName: c.campaign.name,
        id: c.id,
        contact: c.contact,
        campaign: c.campaign,
        histories: c.histories,
        marketing: c
      });
    });
  };

  const onRemoveContact = () => {
    apiPatch(
      `${CONTACT_MARKETING_URL}/${deletingRow.id}`,
      { status: "FAILED" },
      false,
      true
    ).then(res => {
      forceMarketing();
      forceActivities();
      setDeletingRow({});
      setMoreDialog(null);
      notification("Successfully Removed");
    });
  };

  const onMoveToFollowUp = () => {
    apiPatch(
      `${CONTACT_MARKETING_URL}/${movingRow.id}`,
      { status: "COMPLETED" },
      false,
      true
    ).then(res => {
      forceMarketing();
      forceActivities();
      forceFollowUp();
      setMoreDialog(null);
      notification("Successfully Moved");
      setMovingRow({});
    });
  };

  const notification = (m = "Successfully Added") => {
    setSuccessNoti(m);
    setTimeout(() => {
      setSuccessNoti(false);
    }, 2000);
  };

  return (
    <USERCONTEXT.Consumer>
      {({ user }) => (
        <div style={{ position: "relative" }}>
          {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
          {moreDialog && (
            <Dialog
              open
              onClose={() => setMoreDialog(false)}
              maxWidth="lg"
              fullWidth
            >
              <DialogTitle>
                <h4>Manage Contact</h4>
              </DialogTitle>
              <DialogContent>
                <TicketDetail
                  histories={moreRow.histories}
                  allHistories={moreRow.histories}
                  campaign={moreRow.campaign}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={contact => {
                    if (tableMarketingRef.current) {
                      tableMarketingRef.current.onQueryChange();
                    }
                    // let cloneMoreRow = { ...moreRow }
                    // cloneMoreRow.histories.unshift(contact)
                    const c = contact;
                    setMoreRow({
                      full_name: c.contact.full_name,
                      mail: c.contact.mail,
                      phone: c.contact.phone,
                      campaignName: c.campaign.name,
                      id: c.id,
                      contact: c.contact,
                      campaign: c.campaign,
                      histories: c.histories,
                      marketing: c,
                      thread_ids: c.thread_ids
                    });
                  }}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  user={user}
                  setMovingRow={setMovingRow}
                  setDeletingRow={setDeletingRow}
                  getMoreRow={getMoreRow}
                  moreRow={moreRow}
                />
              </DialogContent>
            </Dialog>
          )}
          <Dialog
            open={Object.keys(movingRow).length != 0}
            onClose={() => {
              setMovingRow({});
            }}
          >
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div>
                  Move contact <b>({movingRow.full_name})</b> to follow-up phase
                  . This action cannot be undone. Are you sure?
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setMovingRow({});
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onMoveToFollowUp();
                }}
              >
                Move
              </Button>
            </DialogActions>
          </Dialog>
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
                  Remove contact <b>({deletingRow.full_name})</b> from campaign{" "}
                  <b>({deletingRow.campaignName})</b>. This action cannot be
                  undone. Are you sure?
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
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded.waitingList
            })}
            onClick={() => handleExpandClick("waitingList")}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse collapsedHeight="100px" in={expanded.waitingList}>
            <div className={classes.tableCus}>
              <MaterialTable
                tableRef={tableMarketingRef}
                components={{
                  Toolbar: props => (
                    <Card plain>
                      <CardHeader color="primary">
                        <h4
                          onClick={() =>
                            history.push("/dashboard/ticket-detail")
                          }
                          style={{ cursor: "pointer" }}
                          className={classes.cardTitleWhite}
                        >
                          Waiting List
                        </h4>
                      </CardHeader>
                    </Card>
                  ),
                  Header: props => (
                    <MTableHeader
                      {...props}
                      onOrderChange={(orderBy, dir) => {
                        order.forEach((orderType, index) => {
                          if (orderBy != index) {
                            order[index] = null;
                          }
                        });
                        order[orderBy] = dir;

                        props.onOrderChange(orderBy, dir);
                      }}
                    />
                  ),
                  Body: props => (
                    <MTableBody
                      {...props}
                      onFilterChanged={(columnId, value, position) => {
                        if (columnId == 1) {
                          search.full_name = value;
                        } else if (columnId == 2) {
                          search.state = value;
                        } else if (columnId == 4) {
                          search.created = value;
                        } else if (columnId == 3) {
                          search.campaign = value;
                        } else if (columnId == 5) {
                          search.modified = value;
                        } else if (columnId == 6) {
                          search.status = value;
                        }
                        activePage = 0;
                        props.onFilterChanged(columnId, value);
                      }}
                    />
                  ),
                  FilterRow: props => {
                    return <CustomFilterRow {...props} />;
                  },
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
                  )
                }}
                columns={[
                  {
                    title: "#",
                    field: "#",
                    filtering: false,
                    headerStyle: { width: "5%" },
                    sorting: false,
                    filtering: false
                  },
                  {
                    title: "Full name",
                    field: "full_name",
                    headerStyle: { width: "20%" },
                    render: row => (
                      <Link to={`/contacts/${row.contact.id}`}>
                        {row.full_name}
                      </Link>
                    )
                  },
                  { title: "State", field: "state" },
                  {
                    title: "Campaign",
                    field: "campaignName"
                  },
                  {
                    title: "Created",
                    field: "created",
                    render: row =>
                      dateFns.format(
                        dateFns.parseISO(row.created),
                        "MM-dd-yyyy"
                      ),
                    headerStyle: { width: "15%" },
                    type: "date"
                  },
                  {
                    title: "Last contact",
                    field: "modified",
                    render: row => {
                      return dateFns.format(
                        dateFns.parseISO(row.modified),
                        "HH:mm MM-dd-yyyy"
                      );
                    },
                    headerStyle: { width: "15%" },
                    type: "date"
                  },
                  {
                    title: "Contact Frequency",
                    field: "status",
                    render: row => {
                      if (row.status < 5)
                        return (
                          <CircleIcon
                            className="text-success"
                            fontSize="small"
                          />
                        );
                      else if (row.status >= 5 && row.status <= 15)
                        return (
                          <CircleIcon
                            className="text-warning"
                            fontSize="small"
                          />
                        );
                      else
                        return (
                          <CircleIcon
                            className="text-danger"
                            fontSize="small"
                          />
                        );
                    },
                    lookup: {
                      long: "Greater than 15 days",
                      med: "Between 5 and 15 days",
                      short: "Less than 5 days"
                    }
                  }
                ]}
                data={query =>
                  new Promise((resolve, reject) => {
                    let searchString = `${
                      search.full_name
                        ? `&contact_name=${search.full_name}`
                        : ""
                    }`;
                    searchString += `${
                      search.email ? `&email=${search.email}` : ""
                    }`;
                    searchString += `${
                      search.phone ? `&phone=${search.phone}` : ""
                    }`;
                    searchString += `${
                      search.state ? `&state=${search.state}` : ""
                    }`;
                    searchString += `${
                      search.created
                        ? `&created=${dateFns.format(
                            search.created,
                            "yyyy-MM-dd"
                          )}`
                        : ""
                    }`;
                    searchString += `${
                      search.modified
                        ? `&modified=${dateFns.format(
                            search.modified,
                            "yyyy-MM-dd"
                          )}`
                        : ""
                    }`;
                    searchString += `${
                      search.campaign ? `&campaign=${search.campaign}` : ""
                    }`;
                    searchString += `${
                      search.status ? `&status=${search.status}` : ""
                    }`;
                    searchString += `${
                      order[1] ? `&contact_name_order=${order[1]}` : ""
                    }`;
                    searchString += `${
                      order[2] ? `&state_order=${order[2]}` : ""
                    }`;
                    searchString += `${
                      order[3] ? `&campaign_order=${order[3]}` : ""
                    }`;
                    searchString += `${
                      order[4] ? `&created_order=${order[4]}` : ""
                    }`;
                    searchString += `${
                      order[5] ? `&modified_order=${order[5]}` : ""
                    }`;
                    searchString += `${
                      order[6] ? `&status_order=${order[6]}` : ""
                    }`;
                    searchString += `${
                      selectingRegion
                        ? `&selectingState=${selectingRegion}`
                        : ""
                    }`;
                    apiGet(
                      `${CONTACT_MARKETING_URL}?page=${activePage}&limit=${
                        query.pageSize
                      }${searchString}`,
                      true
                    ).then(res => {
                      const data = [];
                      res.data.data.forEach((c, index) => {
                        data.push({
                          "#": activePage * query.pageSize + index + 1,
                          full_name: c.contact.full_name,
                          mail: c.contact.mail,
                          phone: c.contact.phone,
                          state: stateHash[c.contact.state],
                          campaignName: c.campaign.name,
                          id: c.id,
                          contact: c.contact,
                          campaign: c.campaign,
                          histories: c.histories,
                          marketing: c,
                          thread_ids: c.thread_ids,
                          created: c.created,
                          modified: c.modified,
                          status: dateFns.differenceInDays(
                            new Date(),
                            dateFns.parseISO(c.modified)
                          )
                        });
                      });
                      resolve({
                        data,
                        page: res.data.page,
                        totalCount: res.data.total
                      });
                    });
                  })
                }
                actions={[
                  {
                    icon: "remove",
                    tooltip: "Remove contact out of this campaign",
                    onClick: (event, row) => {
                      setDeletingRow(row);
                      // forceActivities()
                    }
                  },
                  {
                    icon: "swap_horiz",
                    tooltip: "Move to Follow-up",
                    onClick: (event, row) => {
                      setMovingRow(row);
                    }
                  },
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
                  paging: true,
                  filtering: true,
                  actionsColumnIndex: -1,
                  debounceInterval: 300
                }}
              />
            </div>
          </Collapse>
        </div>
      )}
    </USERCONTEXT.Consumer>
  );
}

export default withStyles(styles)(TicketsTable);
