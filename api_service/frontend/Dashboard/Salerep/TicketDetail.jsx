import * as React from "react";

import { Link, withRouter } from "react-router-dom";

import { withStyles, Typography, Paper } from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";
import SwapIcon from "@material-ui/icons/SwapHoriz";
import RemoveIcon from "@material-ui/icons/Remove";
import EmailIcon from "@material-ui/icons/Email";
import NoteIcon from "@material-ui/icons/Note";
import TimerIcon from "@material-ui/icons/AccessAlarm";
import * as dateFns from "date-fns";
import { Input, InputLabel } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import { apiPost, apiPatch } from "../../common/Request";
import CustomSnackbar from "../../components/CustomSnackbar";
import CreateEventDialog from "../../Events/CreateEventDialog";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import {
  EVENTS_URL,
  CONTACT_URL,
  PACKAGES_URL,
  CONTACT_MARKETING_URL
} from "../../common/urls";
import MailDetail from "../../Mailbox/MailBoxList/MailDetail";

import styles from "./SalerepStyles.js";
import NoteDetail from "./NoteDetail";
import ContactDetail from "./ContactDetail";
import SendMailDialog from "../../Mailbox/SendMailDialog";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

function TicketDetail(props) {
  const {
    classes,
    campaign,
    contact,
    histories,
    allHistories,
    id,
    updateTable,
    marketing,
    user,
    setDeletingRow,
    setMovingRow,
    updateActivities,
    getMoreRow,
    moreRow
  } = props;

  React.useEffect(() => {
    setForceUpdateData(forceUpdateData + 1);
  }, [moreRow]);

  const [contactHistories, setContactHistories] = React.useState({
    "Send Email ": 0,
    "Send Email Manually": 0,
    "Call Client": 0
  });
  const [selectTabActivity, setSelectTabActivity] = React.useState({
    type: "notes"
  });

  const [noteDialog, setNoteDialog] = React.useState(false);
  const [laterDialog, setLaterDialog] = React.useState(false);
  const [mailDialog, setMailDialog] = React.useState(false);
  const [backToInbox, setBackToInbox] = React.useState(false);
  const [forceUpdateData, setForceUpdateData] = React.useState(0);

  const [contactDetail, setContactDetail] = React.useState(false);
  const [successNoti, setSuccessNoti] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const handleChangeSelectTabActivity = e => {
    setSelectTabActivity({ [e.target.name]: e.target.value });
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  React.useEffect(() => {
    // Effect
    const cloneHistoriesInfo = {
      "Send Email": 0,
      "Call Client": 0,
      "Send Email Manually": 0
    };
    histories.forEach(h => {
      cloneHistoriesInfo[h.action] += 1;
    });

    setContactHistories(cloneHistoriesInfo);
  }, [histories.length]);

  const onCall = () => {
    apiPost(
      CONTACT_MARKETING_URL + "/" + id + "/history",
      { action: "Call Client" },
      false,
      true
    ).then(res => {
      // updateTable(res.data)
      // setContactHistories({ ...contactHistories, 'Call Client': contactHistories['Call Client'] + 1 })
      setSuccessNoti("Successfully Called");
      setTimeout(() => {
        setSuccessNoti(false);
      }, 2000);
      // getMoreRow(id)
    });
    apiPatch(
      CONTACT_MARKETING_URL + "/" + id,
      {
        thread_ids: [
          ...moreRow.thread_ids,
          {
            type: "Call Client",
            note: "",
            date_created: dateFns.format(new Date(), "yyyy-MM-dd HH:mm")
          }
        ]
      },
      false,
      true
    ).then(res => {
      updateTable(res.data);
    });
  };

  const notification = (m = "Successfully Added") => {
    setSuccessNoti(m);
    setTimeout(() => {
      setSuccessNoti(false);
    }, 2000);
  };

  const onSendEmail = () => {
    setMailDialog(true);
  };

  const updateMailMetric = () => {
    apiPost(
      CONTACT_MARKETING_URL + "/" + id + "/history",
      { action: "Send Email Manually" },
      false,
      true
    ).then(res => {
      updateTable();
      setContactHistories({
        ...contactHistories,
        "Send Email Manually": contactHistories["Send Email Manually"] + 1
      });
      setSuccessNoti("Successfully Sent Email");
      setTimeout(() => {
        setSuccessNoti(false);
      }, 2000);
    });
  };

  const updateData = newThreadId => {
    apiPatch(
      CONTACT_MARKETING_URL + "/" + id,
      {
        thread_ids: [
          ...moreRow.thread_ids,
          {
            thread_id: newThreadId["thread_id"],
            type: "Send Email Manually",
            note: ""
          }
        ]
      },
      false,
      true
    ).then(res => {
      setSuccessNoti(`Send email successfully`);
      updateTable(res.data);
      setTimeout(() => {
        setSuccessNoti(false);
      }, 2000);
    });
  };

  const updateNote = (i, note) => {
    let cloneData = [...moreRow.thread_ids];
    cloneData[i].note = note;
    apiPatch(
      CONTACT_MARKETING_URL + "/" + id,
      { thread_ids: cloneData },
      false,
      true
    ).then(res => {
      updateTable(res.data);
    });
  };

  return (
    <>
      {mailDialog && (
        <SendMailDialog
          user={user}
          sendTo={contact}
          toggleDialog={() => {
            setMailDialog(!mailDialog);
          }}
          updateMailMetric={updateMailMetric}
          setMailDialog={setMailDialog}
          notification={notification}
          setSuccessNoti={setSuccessNoti}
          onComplete={updateData}
          contact={contact}
          productInfo={moreRow.campaign.product}
        />
      )}
      {successNoti && <CustomSnackbar isSuccess msg={successNoti} />}
      {error.all && <CustomSnackbar isErr msg={error.all} />}
      {/* {contactDetail && <ContactDetail toggleDialog={() => {
        setContactDetail(false)
      }}
        contact={contact}
        contactHistories={histories}
      ></ContactDetail>} */}

      {laterDialog && (
        <CreateEventDialog
          toggleDialog={() => {
            setLaterDialog(!laterDialog);
          }}
          type_="campaign"
          targets={[contact]}
          marketing={marketing}
          updateActivities={updateActivities}
          contactOptions={[contact]}
          user={user}
          notification={notification}
          setLaterDialog={setLaterDialog}
        />
      )}
      {/* {noteDialog && <NoteDialog toggleDialog={() => {
        setNoteDialog(false)
      }}
        campaign={campaign}
        contact={contact}
      ></NoteDialog>} */}
      <Grid style={{ padding: "10px 40px" }} container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="title">{contact.first_name}</Typography>
          <DialogActions style={{ float: "left", marginLeft: "-4px" }}>
            {/* <Tooltip title="Call client">
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnGreen
                }}
                onClick={() => {
                  onCall()
                }}
              >
                <PhoneIcon fontSize="small" />
              </Button>
            </Tooltip>

            <Tooltip title="Send mail">
              <Button
                variant='contained'
                classes={{
                  contained: classes.btnPink
                }}
                onClick={() => {
                  onSendEmail()
                }}
              >
                <EmailIcon fontSize="small" />
              </Button>
            </Tooltip> */}
            <Tooltip title="Schedule">
              <Button
                variant="contained"
                classes={{
                  contained: classes.btnYellow
                }}
                onClick={() => {
                  setLaterDialog(!laterDialog);
                }}
              >
                <TimerIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Move to Follow-up">
              <Button
                variant="contained"
                classes={{
                  contained: classes.btnPurple
                }}
                onClick={() => {
                  setMovingRow({
                    id: id,
                    full_name: marketing.contact.full_name
                  });
                }}
              >
                <SwapIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="Remove contact out of this campaign">
              <Button
                variant="contained"
                classes={{
                  contained: classes.btnRed
                }}
                onClick={() => {
                  setDeletingRow({
                    id: id,
                    full_name: marketing.contact.full_name,
                    campaignName: marketing.campaign.name
                  });
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
            </Tooltip>
          </DialogActions>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Contact info
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Full name
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {contact.first_name + " " + contact.last_name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Email
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {contact.mail}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Phone
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {contact.phone}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={12}>
          Campaign info
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Name
        </Grid>
        <Grid item xs={4}>
          <DialogContentText className={classes.inputCustom}>
            {campaign.name}
          </DialogContentText>
        </Grid>
        <Grid className={classes.inputCustom} item xs={2}>
          Packages
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={8}>
            {campaign.packages.map(p => {
              return (
                <Grid item xs={12} key={p.id}>
                  <DialogContentText>
                    <Link to={"packages/" + p.id}>{p.name}</Link>
                  </DialogContentText>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} className="pt-3">
          <Paper style={{ padding: "20px" }}>
            <MailDetail
              backToInbox={backToInbox}
              user={user}
              onCall={onCall}
              onSendEmail={onSendEmail}
              sendTo={contact}
              setSuccessNoti={setSuccessNoti}
              contact={contact}
              contactHistories={allHistories}
              thread_ids={moreRow.thread_ids}
              forceUpdateData={forceUpdateData}
              updateNote={updateNote}
          productInfo={moreRow.campaign.product}
            />
          </Paper>
        </Grid>
        <Grid className={classes.inputHeaderCustom} item xs={9}>
          Activity
        </Grid>
        <Grid className="d-flex justify-content-end" item xs={3}>
          <FormControl className={classes.formControl}>
            <Select
              value={selectTabActivity.type}
              onChange={handleChangeSelectTabActivity}
              inputProps={{
                name: "type"
              }}
            >
              <MenuItem value="history">History</MenuItem>
              <MenuItem value="notes">Notes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabsIndicator
              }}
            >
              <Tab
                disableRipple
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected
                }}
                label="All"
              />
              <Tab
                disableRipple
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected
                }}
                label="Personal"
              />
            </Tabs>
            {selectTabActivity.type == "history" && (
              <>
                {value === 0 && (
                  <TabContainer>
                    <ContactDetail
                      contact={contact}
                      contactHistories={allHistories}
                    />
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <ContactDetail
                      contact={contact}
                      contactHistories={histories}
                    />
                  </TabContainer>
                )}
              </>
            )}
            {selectTabActivity.type == "notes" && (
              <>
                {value === 0 && (
                  <TabContainer>
                    <NoteDetail
                      type="all"
                      campaign={campaign}
                      contact={contact}
                    />
                  </TabContainer>
                )}
                {value === 1 && (
                  <TabContainer>
                    <NoteDetail campaign={campaign} contact={contact} />
                  </TabContainer>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default withStyles(styles)(withRouter(TicketDetail));
