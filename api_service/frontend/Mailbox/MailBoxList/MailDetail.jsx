import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BackIcon from "@material-ui/icons/ArrowBack";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import ReplyIcon from "@material-ui/icons/Reply";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Editor } from "react-draft-wysiwyg";
import "../../common/react-draft-wysiwyg.css";
import styles from "./MailBoxListStyle.js";
import SideBarMailBox from "./SideBarMailBox";
import SendMailComponent from "./SendMailComponent";
import { initMailWebsocket } from "../../common/Utils";
import * as dateFns from "date-fns";
import { Editor } from "react-draft-wysiwyg";
import { htmlToState, draftToRaw } from "../../common/Utils";

let oldMails = { data: [] };
let ws;
let dirty = 1;

function MailDetail(props) {
  const {
    classes,
    history,
    backToInbox,
    user,
    thread_ids,
    sendTo,
    onCall,
    onSendEmail,
    setSuccessNoti,
    contact,
    contactHistories,
    updateNote,
    forceUpdateData,
    activeStep,
    disabledAddConversation
  } = props;

  const [expanded, setExpanded] = React.useState(null);
  const [noExpand, setNoExpand] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [isReply, setIsReply] = React.useState([]);
  const [showReply, setShowReply] = React.useState(false);
  const [anchorElAdd, setAnchorElAdd] = React.useState(null);
  const [socket, setSocket] = React.useState(null);
  const [emails, setEmails] = React.useState({
    data: []
  });
  const [mailDialog, setMailDialog] = React.useState(false);
  const [contentStt, setContentStt] = React.useState("VIEW");
  const [editorState, setEditorState] = React.useState([]);
  const [old, setOld] = React.useState({
    name: "",
    content: ""
  });

  const [addNote, setAddNote] = React.useState([]);
  const [expandNote, setExpandNote] = React.useState([]);

  React.useEffect(() => {
    ws = initMailWebsocket(user.id);
    setSocket(ws);
    ws.onmessage = event => {
      let response = JSON.parse(event.data);
      console.log(response);
      if (response.type == "single") {
        let findIndex = thread_ids.findIndex(t => {
          return t.thread_id && t.thread_id === response.thread_id;
        });
        if (findIndex === -1) {
          oldMails = { data: [response.data[0], ...oldMails.data] };
        } else {
          oldMails.data[findIndex] = response.data[0];
        }
        let isReplies = oldMails.data.map(d => {
          if (Array.isArray(d)) {
            return d.map(_ => ({ stt: false }));
          } else {
            return { stt: false };
          }
        });
        setEmails(oldMails);
        setIsReply(isReplies);
        setNoExpand(
          oldMails.data.map(d => {
            if (Array.isArray(d)) {
              return d.map(_ => true);
            } else {
              return true;
            }
          })
        );
      } else {
        setEmails(response);
        oldMails = response;
        setIsReply(
          response.data.map(d => {
            if (Array.isArray(d)) {
              return d.map(_ => ({ stt: false }));
            } else {
              return { stt: false };
            }
          })
        );
        setNoExpand(
          response.data.map(d => {
            if (Array.isArray(d)) {
              return d.map(_ => true);
            } else {
              return true;
            }
          })
        );
        if (dirty == 1) {
          setEditorState(oldMails.data.map(_ => htmlToState("")));
          setOld(oldMails.data.map(o => ({ content: "" })));
          setAddNote(oldMails.data.map(n => ({ stt: false })));
          setExpandNote(oldMails.data.map(p => ({ stt: true })));
        }
        dirty += 1;
      }
    };
    ws.onopen = e => {
      ws.send(
        JSON.stringify({
          threads: thread_ids
        })
      );
    };
    return () => {
      ws.close();
    };
  }, [activeStep]);

  React.useEffect(() => {
    if (typeof forceUpdateData === "number" && forceUpdateData > 1) {
      ws.send(
        JSON.stringify({
          threads: thread_ids
        })
      );
    }
  }, [forceUpdateData]);

  const handleExpandNote = j => {
    let cloneExpandNote = [...expandNote];
    cloneExpandNote[j].stt = !cloneExpandNote[j].stt;
    setExpandNote(cloneExpandNote);
  };

  const onEditorStateChange = (i, editor) => {
    let cloneEditorChange = [...editorState];
    cloneEditorChange[i] = editor;
    setEditorState(cloneEditorChange);
  };

  const handleClick = event => {
    setAnchorElAdd(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAdd(null);
  };

  const handleCloseReply = (i, insideIndex) => {
    let cloneIsReply = [...isReply];
    cloneIsReply[i][insideIndex] = { stt: false };
    setIsReply(cloneIsReply);
  };

  const handleReply = (i, insideIndex) => {
    let cloneIsReply = [...isReply];
    cloneIsReply[i][insideIndex].stt = !cloneIsReply[i][insideIndex].stt;
    if (cloneIsReply[i][insideIndex].stt) {
      let replyingEmail = emails.data[i][insideIndex];
      cloneIsReply[i][insideIndex].threadId = thread_ids[i];
      cloneIsReply[i][insideIndex]["In-Reply-To"] =
        replyingEmail["Message-Id"][0];
      console.log(replyingEmail);
      cloneIsReply[i][insideIndex]["References"] = `${
        replyingEmail["References"].length
          ? replyingEmail["References"][0] + " "
          : ""
      }${replyingEmail["Message-Id"][0]}`;
      cloneIsReply[i][insideIndex]["subject"] = emails.data[
        i
      ][0].subject.reduce((acc, s) => {
        let res = acc;
        res += s;
        return res;
      }, "");
    }

    setIsReply(cloneIsReply);
  };

  const handleChange = panel => (event, expanded) => {
    // setExpanded(expanded ? panel : false);
    // setShowReply(!showReply)
    // setNoExpand(!noExpand)
  };

  const handleExpand = (i, insideIndex) => {
    let cloneNoExpand = [...noExpand];
    cloneNoExpand[i][insideIndex] = !cloneNoExpand[i][insideIndex];
    setNoExpand(cloneNoExpand);
  };

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  const handleSendEmail = () => {
    setMailDialog(true);
  };

  return (
    <div className={classes.root}>
      {mailDialog && (
        <SendMailDialog
          user={user}
          toggleDialog={() => {
            setMailDialog(!mailDialog);
          }}
          setSuccessNoti={setSuccessNoti}
        />
      )}
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={8}>
              {backToInbox && (
                <Grid item xs={12}>
                  <IconButton onClick={() => history.push("/inbox")}>
                    <BackIcon fontSize="small" />
                  </IconButton>
                </Grid>
              )}
            </Grid>
            <List>
              {noExpand[0] &&
                emails.data &&
                emails.data.map((t, j) => {
                  let result;
                  let date_created;
                  let message;

                  if (Array.isArray(t)) {
                    result = dateFns.isEqual(
                      dateFns.startOfDay(new Date()),
                      dateFns.startOfDay(new Date(t[0].date_created[0]))
                    );
                    date_created = new Date(t[0].date_created[0]);
                    message = t[0].message;
                  } else {
                    result = dateFns.isEqual(
                      dateFns.startOfDay(new Date()),
                      dateFns.startOfDay(new Date(t.date_created))
                    );
                    date_created = new Date(t.date_created);
                  }

                  let dateValue = "";
                  if (result) {
                    dateValue = dateFns.format(date_created, "HH:mm");
                  } else {
                    dateValue = dateFns.formatDistance(
                      date_created,
                      new Date()
                    );
                  }

                  return Array.isArray(t) ? (
                    <>
                      <ListItem key={j} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar className={classes.pinkAvatar}>
                            <EmailIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ExpansionPanel
                          style={{ margin: "unset" }}
                          classes={{ root: classes.expandCus }}
                          // expanded={expanded === 'panel2'}
                          onChange={e => handleChange(j, 0)}
                        >
                          <ExpansionPanelSummary
                            onClick={e => handleExpand(j, 0)}
                            classes={{
                              expanded: classes.expandSumCus,
                              content: classes.expandSumCus,
                              root: classes.expandSumRoot
                            }}
                          >
                            <ListItemText
                              primary={"The AQV Team"}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {`to ${contact.mail}`}
                                  </Typography>
                                  {noExpand[j] && noExpand[j][0] && (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: t[0].message
                                      }}
                                      className={classes.etcDot}
                                    />
                                  )}
                                </React.Fragment>
                              }
                            />
                            <ListItemText
                              secondary={
                                <div
                                  style={{
                                    fontSize: "12px",
                                    padding: "10px",
                                    textAlign: "right"
                                  }}
                                >
                                  <i>{dateValue}</i>
                                </div>
                              }
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing>
                              <Grid item xs={11}>
                                <Typography variant="span">
                                  <span
                                    className={classes.etcDot}
                                    dangerouslySetInnerHTML={{
                                      __html: message
                                    }}
                                  />
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  onClick={event => {
                                    handleReply(j, 0);
                                  }}
                                  style={{ outline: "none", float: "right" }}
                                >
                                  <ReplyIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                              <Grid item xs={12}>
                                {isReply[j] &&
                                  isReply[j][0] &&
                                  isReply[j][0].stt && (
                                    <SendMailComponent
                                      handleCloseReply={() =>
                                        handleCloseReply(j, 0)
                                      }
                                      user={user}
                                      sendTo={sendTo}
                                      data={isReply[j][0]}
                                    />
                                  )}
                              </Grid>
                              {t.slice(1).map((e, i) => {
                                i += 1;
                                if (e.from.length > 0) {
                                  var result = dateFns.isEqual(
                                    dateFns.startOfDay(new Date()),
                                    dateFns.startOfDay(new Date(e.date_created))
                                  );
                                  let dateValue = "";
                                  if (result) {
                                    dateValue = dateFns.format(
                                      new Date(e.date_created),
                                      "HH:mm"
                                    );
                                  } else {
                                    dateValue = dateFns.formatDistance(
                                      new Date(e.date_created),
                                      new Date()
                                    );
                                  }
                                  let name = "";
                                  let mail = "";
                                  let fromName = e.from[0].match(/(.+) (<.+>)/);
                                  name = fromName[1];
                                  mail = fromName[2];
                                  return (
                                    <ListItem
                                      key={i + "i"}
                                      alignItems="flex-start"
                                    >
                                      <ListItemAvatar>
                                        <Avatar className={classes.pinkAvatar}>
                                          <EmailIcon fontSize="small" />
                                        </Avatar>
                                      </ListItemAvatar>
                                      <ExpansionPanel
                                        style={{ margin: "unset" }}
                                        classes={{ root: classes.expandCus }}
                                        // expanded={expanded === 'panel2'}
                                        onChange={e => handleChange(j, i)}
                                      >
                                        <ExpansionPanelSummary
                                          onClick={e => handleExpand(j, i)}
                                          classes={{
                                            expanded: classes.expandSumCus,
                                            content: classes.expandSumCus,
                                            root: classes.expandSumRoot
                                          }}
                                        >
                                          <ListItemText
                                            primary={name}
                                            secondary={
                                              <React.Fragment>
                                                <Typography
                                                  component="span"
                                                  className={classes.inline}
                                                  color="textPrimary"
                                                >
                                                  {e.from &&
                                                  e.from !=
                                                    "The AQV Team <theaqvteam@gmail.com>"
                                                    ? "to me"
                                                    : mail}
                                                </Typography>
                                                {noExpand[j][i] && (
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: e.message
                                                    }}
                                                    className={classes.etcDot}
                                                  />
                                                )}
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemText
                                            secondary={
                                              <div
                                                style={{
                                                  fontSize: "12px",
                                                  padding: "10px",
                                                  textAlign: "right"
                                                }}
                                              >
                                                <i>{dateValue}</i>
                                              </div>
                                            }
                                          />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          <Grid container spacing>
                                            <Grid item xs={11}>
                                              <Typography variant="span">
                                                <span
                                                  className={classes.etcDot}
                                                  dangerouslySetInnerHTML={{
                                                    __html: e.message
                                                  }}
                                                />
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                              <IconButton
                                                onClick={event => {
                                                  handleReply(j, i);
                                                }}
                                                style={{
                                                  outline: "none",
                                                  float: "right"
                                                }}
                                              >
                                                <ReplyIcon fontSize="small" />
                                              </IconButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                              {isReply[j] &&
                                                isReply[j][i] &&
                                                isReply[j][i].stt && (
                                                  <SendMailComponent
                                                    handleCloseReply={() =>
                                                      handleCloseReply(j, i)
                                                    }
                                                    user={user}
                                                    sendTo={sendTo}
                                                    data={isReply[j][i]}
                                                  />
                                                )}
                                            </Grid>
                                          </Grid>
                                        </ExpansionPanelDetails>
                                      </ExpansionPanel>
                                    </ListItem>
                                  );
                                } else {
                                  var result = dateFns.isEqual(
                                    dateFns.startOfDay(new Date()),
                                    dateFns.startOfDay(
                                      new Date(e.date_created[0])
                                    )
                                  );
                                  let dateValue = "";
                                  if (result) {
                                    dateValue = dateFns.format(
                                      new Date(e.date_created[0]),
                                      "HH:mm"
                                    );
                                  } else {
                                    dateValue = dateFns.formatDistance(
                                      new Date(e.date_created[0]),
                                      new Date()
                                    );
                                  }
                                  return (
                                    <ListItem
                                      key={i + "i"}
                                      alignItems="flex-start"
                                    >
                                      <ListItemAvatar>
                                        <Avatar className={classes.pinkAvatar}>
                                          <EmailIcon fontSize="small" />
                                        </Avatar>
                                      </ListItemAvatar>
                                      <ExpansionPanel
                                        style={{ margin: "unset" }}
                                        classes={{ root: classes.expandCus }}
                                        // expanded={expanded === 'panel2'}
                                        onChange={e => handleChange(j, i)}
                                      >
                                        <ExpansionPanelSummary
                                          onClick={e => handleExpand(j, i)}
                                          classes={{
                                            expanded: classes.expandSumCus,
                                            content: classes.expandSumCus,
                                            root: classes.expandSumRoot
                                          }}
                                        >
                                          <ListItemText
                                            primary={"The AQV Team"}
                                            secondary={
                                              <React.Fragment>
                                                <Typography
                                                  component="span"
                                                  className={classes.inline}
                                                  color="textPrimary"
                                                >
                                                  {`to ${contact.mail}`}
                                                </Typography>
                                                {noExpand[j] && noExpand[j][i] && (
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: e.message
                                                    }}
                                                    className={classes.etcDot}
                                                  />
                                                )}
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemText
                                            secondary={
                                              <div
                                                style={{
                                                  fontSize: "12px",
                                                  padding: "10px",
                                                  textAlign: "right"
                                                }}
                                              >
                                                <i> {dateValue}</i>
                                              </div>
                                            }
                                          />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          <Grid container spacing>
                                            <Grid item xs={11}>
                                              <Typography variant="span">
                                                <span
                                                  className={classes.etcDot}
                                                  dangerouslySetInnerHTML={{
                                                    __html: e.message
                                                  }}
                                                />
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                              <IconButton
                                                onClick={event => {
                                                  handleReply(j, i);
                                                }}
                                                style={{
                                                  outline: "none",
                                                  float: "right"
                                                }}
                                              >
                                                <ReplyIcon fontSize="small" />
                                              </IconButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                              {isReply[j] &&
                                                isReply[j][i] &&
                                                isReply[j][i].stt && (
                                                  <SendMailComponent
                                                    handleCloseReply={() =>
                                                      handleCloseReply(j, i)
                                                    }
                                                    sendTo={sendTo}
                                                    user={user}
                                                    data={isReply[j][i]}
                                                  />
                                                )}
                                            </Grid>
                                          </Grid>
                                        </ExpansionPanelDetails>
                                      </ExpansionPanel>
                                    </ListItem>
                                  );
                                }
                              })}
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </ListItem>
                      <Divider />
                    </>
                  ) : (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar className={classes.greenAvatar}>
                            <PhoneIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ExpansionPanel
                          style={{ margin: "unset" }}
                          classes={{ root: classes.expandCus }}
                          // expanded={expanded === 'panel2'}
                          onChange={handleChange()}
                          // onClick={handleShowReply}
                        >
                          <ExpansionPanelSummary
                            onClick={e => handleExpandNote(j)}
                            classes={{
                              expanded: classes.expandSumCus,
                              content: classes.expandSumCus,
                              root: classes.expandSumRoot
                            }}
                          >
                            <ListItemText
                              primary={
                                contact.first_name + " " + contact.last_name
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {contact.phone}
                                  </Typography>
                                  {expandNote[j] && expandNote[j].stt && (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: t.note
                                      }}
                                      className={classes.etcDot}
                                    />
                                  )}
                                </React.Fragment>
                              }
                            />
                            <ListItemText
                              secondary={
                                <div
                                  style={{
                                    fontSize: "12px",
                                    padding: "10px",
                                    textAlign: "right"
                                  }}
                                >
                                  <i>{t.date_created}</i>
                                </div>
                              }
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing>
                              <Grid item xs={12}>
                                <Typography component="div">
                                  {
                                    <>
                                      {addNote[j] && !addNote[j].stt ? (
                                        <>
                                          <DialogContent
                                            style={{ wordBreak: "break-word" }}
                                            classes={{ root: classes.CusNote }}
                                            onClick={() => {
                                              let cloneEditor = [
                                                ...editorState
                                              ];
                                              cloneEditor[j] = htmlToState(
                                                t.note
                                              );
                                              setEditorState(cloneEditor);
                                              let cloneOld = [...old];
                                              cloneOld[j] = t.note;
                                              setOld(cloneOld);
                                              let cloneAddNote = [...addNote];
                                              cloneAddNote[j] = { stt: true };
                                              setAddNote(cloneAddNote);
                                              // setContentStt('EDIT')
                                            }}
                                          >
                                            {t.note ? (
                                              <DialogContentText
                                                dangerouslySetInnerHTML={{
                                                  __html: t.note
                                                }}
                                              />
                                            ) : (
                                              <DialogContentText>
                                                Let create new note
                                              </DialogContentText>
                                            )}
                                          </DialogContent>
                                        </>
                                      ) : (
                                        <>
                                          <DialogContent className="p-3">
                                            <Editor
                                              editorState={editorState[j]}
                                              wrapperClassName="editor-wrapper"
                                              editorClassName="editor"
                                              onEditorStateChange={editor =>
                                                onEditorStateChange(j, editor)
                                              }
                                              editorStyle={{
                                                minHeight: "330px"
                                              }}
                                            />
                                          </DialogContent>
                                          <DialogActions>
                                            <Button
                                              variant="contained"
                                              onClick={() => {
                                                setContentStt("VIEW");
                                                let cloneEditorState = [
                                                  ...editorState
                                                ];
                                                cloneEditorState[
                                                  j
                                                ] = htmlToState("");
                                                setEditorState(
                                                  cloneEditorState
                                                );
                                                let cloneAddNote = [...addNote];
                                                cloneAddNote[j] = {
                                                  stt: false
                                                };
                                                setAddNote(cloneAddNote);
                                              }}
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={() => {
                                                // setContentStt('VIEW')
                                                updateNote(
                                                  j,
                                                  draftToRaw(editorState[j])
                                                );
                                                let cloneEmails = [
                                                  ...emails.data
                                                ];
                                                cloneEmails[
                                                  j
                                                ].note = draftToRaw(
                                                  editorState[j]
                                                );
                                                setEmails({
                                                  data: cloneEmails
                                                });
                                                let cloneEditorState = [
                                                  ...editorState
                                                ];
                                                cloneEditorState[
                                                  j
                                                ] = htmlToState("");
                                                setEditorState(
                                                  cloneEditorState
                                                );
                                                let cloneAddNote = [...addNote];
                                                cloneAddNote[j] = {
                                                  stt: false
                                                };
                                                // handleExpandNote(j)
                                                setAddNote(cloneAddNote);
                                              }}
                                            >
                                              Apply
                                            </Button>
                                          </DialogActions>
                                        </>
                                      )}
                                    </>
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
            <Grid container spacing={8}>
              {/* <Grid item xs={12}>
                {
                  isReply &&
                  <SendMailComponent />
                }
              </Grid> */}
              <Grid item xs={12}>
                {/* {
                  !isReply &&
                  <SendMailComponent />
                } */}
                <Button
                  onClick={handleClick}
                  style={{ margin: "15px 0 0 25px" }}
                  variant="outlined"
                  color="default"
                  className={classes.button}
                  disabled={disabledAddConversation}
                >
                  &nbsp; Add conversation
                </Button>
                <Menu
                  anchorEl={anchorElAdd}
                  anchorOrigin={{ vertical: "top", horizontal: "between" }}
                  transformOrigin={{ vertical: "top", horizontal: "between" }}
                  open={Boolean(anchorElAdd)}
                  onClose={() => setAnchorElAdd(null)}
                >
                  <MenuItem onClick={() => onSendEmail()}>Send Mail</MenuItem>
                  <MenuItem onClick={() => onCall()}>Call</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(MailDetail);
