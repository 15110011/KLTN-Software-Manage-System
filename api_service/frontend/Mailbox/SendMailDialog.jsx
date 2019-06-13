import * as React from "react";

import {
  withStyles,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Input,
  InputLabel,
  IconButton,
  FormControl,
  Grid
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import NoteIcon from "@material-ui/icons/Note";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import PreviewIcon from "@material-ui/icons/RemoveRedEye";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import * as dateFns from "date-fns";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";

import { Editor } from "react-draft-wysiwyg";
import Select from "@material-ui/core/Select";
import SelectCustom from "../components/SelectCustom";
import styles from "./MailboxStyles";
import { apiPost, apiPatch } from "../common/Request";
import CustomSnackbar from "../components/CustomSnackbar";

import {
  SEND_EMAIL,
  CONTACT_MARKETING_URL,
  REFRESH_TOKEN_URL,
  MAIL_TEMPLATES_URL
} from "../common/urls";
import { BAD_REQUEST } from "../common/Code";
import useFetchData from "../CustomHook/useFetchData";
import { htmlToState, draftToRaw } from "../common/Utils";
import "../common/react-draft-wysiwyg.css";

function SendMailDialog(props) {
  const {
    classes,
    sendTo,
    toggleDialog,
    user,
    onComplete,
    setMailDialog,
    setSuccessNoti,
    contact,
    productInfo
  } = props;
  const [mail, setMail] = React.useState({
    user_id: user.id,
    to: sendTo.mail,
    from: "theaqvteam@gmail.com",
    subject: "",
    message: ""
  });

  const [
    mailTemplate,
    setEmailTemplateData,
    setEmailTemplateURL,
    forceUpdateEmailTemplate
  ] = useFetchData(MAIL_TEMPLATES_URL, props.history, { data: [], total: 0 });

  const [selectingMailTemplate, setSelectingMailTemplate] = React.useState({
    name: "None",
    id: "-1"
  });

  const [previewTemplate, setPreviewTemplate] = React.useState(null);
  const [editorState, setEditorState] = React.useState(htmlToState(""));

  const [error, setError] = React.useState({});

  const onChangeInput = e => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  const packgesToHtml = () => {
    if (!productInfo) {
      return "";
    }
    let htmlText = ``;
    productInfo.packages.forEach(p => {
      htmlText += `
        <h4>${p.name}</h4>
        <ul>
    `;

      p.features.forEach(f => {
        htmlText += `<li>${f.name}</li>`;
      });
      htmlText += "</ul>";
    });
    return htmlText;
  };

  const onSendMail = () => {
    const data = {
      ...mail,
      message: draftToRaw(editorState)
    };
    data.message = data.message.replace("$contact_name$", contact.first_name);

    data.message = data.message.replace("$packages_info$", packgesToHtml());
    apiPost(SEND_EMAIL, { data }, false, false).then(res => {
      // notification()
      // setCreateCampaignDialog(false)
      onComplete(res.data);
    });
    setMailDialog(false);
    // notification('Successfully Sent')
    setSuccessNoti("Successfully Sent");
  };

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <>
      <Dialog
        open
        onClose={toggleDialog}
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.noOverFlowY }}
      >
        <DialogTitle>
          <div className="d-flex position-relative justify-content-between">
            Send Email
          </div>
        </DialogTitle>
        <DialogContent classes={{ root: classes.noOverFlowY }}>
          <Grid container spacing={8}>
            <Grid
              className={classes.inputCustom}
              item
              xs={2}
              style={{ paddingLeft: "24px" }}
            >
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                required
              >
                Subject
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <Input
                onChange={onChangeInput}
                name="subject"
                type="text"
                classes={{
                  underline: classes.cssUnderline
                }}
                value={mail.subject}
                required
                fullWidth
              />
            </Grid>
            <Grid
              className={classes.inputCustom}
              item
              xs={2}
              style={{ paddingLeft: "24px" }}
            >
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                required
              >
                To
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <Input
                onChange={onChangeInput}
                name="to"
                type="text"
                classes={{
                  underline: classes.cssUnderline
                }}
                value={mail.to}
                required
                fullWidth
              />
            </Grid>
            <Grid
              className={classes.inputCustom}
              item
              xs={2}
              style={{ paddingLeft: "24px" }}
            >
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
              >
                From
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <Input
                name="from"
                type="text"
                classes={{
                  underline: classes.cssUnderline
                }}
                value={mail.from}
                fullWidth
                disabled
              />
            </Grid>
            <Grid
              className={classes.inputCustom}
              item
              xs={2}
              style={{ paddingLeft: "24px" }}
            >
              <InputLabel
                htmlFor="custom-css-standard-input"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }}
                required
              >
                Content
              </InputLabel>
            </Grid>
            <Grid item xs={10} className="pt-3">
              {/* <Input
              onChange={onChangeInput}
              name="text"
              type="text"
              classes={{
                underline: classes.cssUnderline,
              }}
              value={user.text}
              fullWidth
            /> */}
              <Editor
                editorState={editorState}
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={onEditorStateChange}
              />
              <Grid container>
                <Grid item xs={11}>
                  <SelectCustom
                    handleChange={(value, element) => {
                      if (
                        (value && value.value == "-1") ||
                        element.action === "clear"
                      ) {
                        setSelectingMailTemplate({ name: "None", id: "-1" });
                        onEditorStateChange(htmlToState(""));
                        onChangeInput({
                          target: {
                            name: "subject",
                            value: ""
                          }
                        });
                      } else {
                        setSelectingMailTemplate(value.template);
                        onEditorStateChange(
                          htmlToState(value.template.template)
                        );
                        onChangeInput({
                          target: {
                            name: "subject",
                            value: value.template.subject
                          }
                        });
                      }
                    }}
                    name="email_template"
                    options={[
                      {
                        label: "None",
                        value: "-1",
                        template: { id: "-1", name: "None" }
                      }
                    ].concat(
                      mailTemplate.data.map(template => ({
                        label: template.name,
                        value: template.id,
                        template
                      }))
                    )}
                    data={{
                      label: selectingMailTemplate.name,
                      value: selectingMailTemplate.id
                    }}
                    fullWidth
                    single
                    label="Using template"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ marginRight: "20px" }}
            variant="contained"
            color="primary"
            onClick={onSendMail}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(SendMailDialog);
