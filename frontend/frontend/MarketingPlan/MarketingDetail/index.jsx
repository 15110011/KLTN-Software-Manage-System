import * as React from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProductIcon from "@material-ui/icons/Archive";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import DetailIcon from "@material-ui/icons/Assignment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CategoryIcon from "@material-ui/icons/Category";
import PreviewIcon from "@material-ui/icons/RemoveRedEye";
import CustomSnackbar from "../../components/CustomSnackbar";

import stateHashes from "../../common/StateHash";
import SelectCustom from "../../components/SelectCustom";
import styles from "./MarketingDetailStyle";
// Hooks
import useFetchData from "../../CustomHook/useFetchData";
import {
  MARKETING_PLANS_URL,
  MARKETING_PLANS_CONDITIONS_URL,
  REFRESH_TOKEN_URL,
  MAIL_TEMPLATES_URL
} from "../../common/urls";
import { apiPost, apiPatch } from "../../common/Request";
import { BAD_REQUEST } from "../../common/Code";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function MarketingPlanDetail(props) {
  const [completeNotice, setCompleteNotice] = React.useState(false);
  const marketingPlanId = props.match.params.id;
  const [marketingPlanConditions, setMarketingPlanConditions] = useFetchData(
    MARKETING_PLANS_CONDITIONS_URL,
    props.history,
    {}
  );
  const [
    marketingPlanDetail,
    setMarketingPlanDetail,
    setUrl,
    forceUpdate
  ] = useFetchData(MARKETING_PLANS_URL + "/" + marketingPlanId, props.history, {
    name: "",
    condition: {
      must: []
    },
    actions: [],
    manager: ""
  });

  const [previewTemplate, setPreviewTemplate] = React.useState(null);

  const [
    mailTemplate,
    setEmailTemplateData,
    setEmailTemplateURL,
    forceUpdateEmailTemplate
  ] = useFetchData(MAIL_TEMPLATES_URL, props.history, { data: [], total: 0 });

  const [titleStt, setTitleStt] = React.useState("VIEW");
  const [value, setValue] = React.useState(0);
  const [cloneDetail, setCloneDetail] = React.useState({});

  const { classes } = props;

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeSelectAddress = (value, element, index) => {
    const cloneUpdateMarketingPlan = { ...marketingPlanDetail };
    if (value) {
      cloneUpdateMarketingPlan.condition.must[index][element.name] =
        value.value;
    } else {
      cloneUpdateMarketingPlan.condition.must[index][element.name] = "";
    }
    setMarketingPlanDetail({ ...cloneUpdateMarketingPlan });
  };

  const onChangeUpdateMarketingPlan = (e, index, conditionType) => {
    if (e.target.name == "name") {
      setMarketingPlanDetail({
        ...marketingPlanDetail,
        [e.target.name]: e.target.value
      });
    } else {
      if (conditionType == "must") {
        const must = marketingPlanDetail.condition.must.concat([]);
        must[index][e.target.name] = e.target.value;
        setMarketingPlanDetail({
          ...marketingPlanDetail,
          condition: { ...marketingPlanDetail.condition, must }
        });
      } else {
        const at_least = marketingPlanDetail.condition.at_least.concat([]);
        at_least[index][e.target.name] = e.target.value;
        setMarketingPlanDetail({
          ...marketingPlanDetail,
          condition: { ...marketingPlanDetail.condition, at_least }
        });
      }
    }
  };

  const handleChangeActionTypeSelect = (value, action) => {
    setMarketingPlanDetail({
      ...marketingPlanDetail,
      actions: value.map(v => v.value)
    });
  };

  const notification = () => {
    setCompleteNotice("Successfully Updated");
    setTimeout(() => {
      setCompleteNotice(false);
    }, 2000);
  };

  const handleSavePlanDetail = () => {
    const { can_remove, ...rest } = marketingPlanDetail;
    apiPatch(
      MARKETING_PLANS_URL + "/" + marketingPlanId,
      { ...rest },
      false,
      true
    ).then(json => {
      if (json.data) return notification();
    });
  };

  const onChangeCloneInput = e => {
    setCloneDetail({ ...cloneDetail, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (cloneDetail.name == marketingPlanDetail.name && cloneDetail.name != "")
      handleSavePlanDetail();
  }, [marketingPlanDetail.name]);

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <BreadcrumbsItem to={`/marketing-plans/ + ${marketingPlanId}`}>
        {marketingPlanDetail.name}
      </BreadcrumbsItem>
      {previewTemplate && (
        <Dialog
          open
          onClose={() => {
            setPreviewTemplate(null);
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <div>{previewTemplate.name}</div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2} style={{ position: "relative" }}>
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
                    <div>{previewTemplate.subject}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2} style={{ position: "relative" }}>
                    <InputLabel
                      htmlFor="custom-css-standard-input"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused
                      }}
                      required
                    >
                      Template
                    </InputLabel>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing="8">
                      <Grid item xs={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: previewTemplate.template
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div
                          style={{
                            paddingTop: "10px",
                            border: "1px solid #F1F1F1",
                            height: "100%"
                          }}
                        >
                          <p
                            style={{
                              padding: "10px",
                              fontSize: "20px",
                              fontStyle: "italic",
                              fontWeight: "bold"
                            }}
                          >
                            System Variables
                          </p>
                          <ul>
                            <li style={{ listStyleType: "circle" }}>
                              $contact_name$: Your customer name
                            </li>
                          </ul>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
      <div className={classes.paper}>
        <Grid container spacing={8} style={{ margin: "unset" }}>
          <div className={classes.wrapAvatar}>
            <div className={classes.productAvatar}>
              <CategoryIcon />
            </div>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "10px",
                textAlign: "left"
              }}
            >
              <li>
                <span style={{ color: "#616161" }}>Marketing Plan</span>
              </li>
              {titleStt == "VIEW" && (
                <li>
                  <p style={{ fontSize: "16px" }}>
                    {marketingPlanDetail.name}
                    {marketingPlanDetail.can_remove && (
                      <IconButton
                        onClick={() => {
                          setCloneDetail({ ...marketingPlanDetail });
                          setTitleStt("EDIT");
                        }}
                      >
                        <EditIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    )}
                  </p>
                </li>
              )}
              {titleStt == "EDIT" && (
                <li>
                  <TextField
                    name="name"
                    onChange={onChangeCloneInput}
                    value={cloneDetail.name}
                    style={{ fontSize: "16px" }}
                  />
                  <Tooltip title="Discard Change">
                    <IconButton onClick={() => setTitleStt("VIEW")}>
                      <CloseIcon style={{ fontSize: "18px" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Apply Change">
                    <IconButton
                      onClick={() => {
                        setMarketingPlanDetail({
                          ...marketingPlanDetail,
                          name: cloneDetail.name
                        });
                        setTitleStt("VIEW");
                      }}
                    >
                      <DoneIcon style={{ fontSize: "18px" }} />
                    </IconButton>
                  </Tooltip>
                </li>
              )}
            </ul>
          </div>
        </Grid>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Detail" />
            {/* <Tab label="Item Two" />
          <Tab label="Item Three" /> */}
          </Tabs>
        </AppBar>
        <div style={{ textAlign: "left" }}>
          {value === 0 && (
            <TabContainer>
              {!marketingPlanDetail.can_remove && (
                <div className="alert alert-danger">
                  This plan is being used or used
                </div>
              )}
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustomName} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused
                        }}
                      >
                        Marketing Plan Name
                      </InputLabel>
                    </Grid>
                    <Grid item xs={8}>
                      <Input
                        fullWidth
                        required
                        onChange={onChangeUpdateMarketingPlan}
                        value={marketingPlanDetail.name}
                        name="name"
                        classes={{
                          underline: classes.cssUnderline
                        }}
                        disabled={!marketingPlanDetail.can_remove}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={24}>
                    <Grid className={classes.inputCustom} item xs={2}>
                      <InputLabel
                        htmlFor="custom-css-standard-input"
                        classes={{
                          root: classes.cssLabel,
                          focused: classes.cssFocused
                        }}
                      >
                        Automatical Actions
                      </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                      <SelectCustom
                        handleChange={(values, element) =>
                          handleChangeActionTypeSelect(values, element)
                        }
                        name="actions"
                        options={[
                          "Send Email",
                          "Call Client",
                          "Send Email Manually"
                        ].reduce((acc, a) => {
                          acc.push({
                            label: a,
                            value: a
                          });
                          return acc;
                        }, [])}
                        data={marketingPlanDetail.actions.reduce((acc, a) => {
                          acc.push({ label: a, value: a });
                          return acc;
                        }, [])}
                        fullWidth
                        multi
                        disabled={!marketingPlanDetail.can_remove}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {marketingPlanDetail.mail_template && (
                        <SelectCustom
                          handleChange={(value, element) => {
                            let targetIdx = mailTemplate.data.findIndex(
                              t => t.id == value.value
                            );
                            if (targetIdx !== -1) {
                              const clone = { ...marketingPlanDetail };
                              clone.mail_template =
                                mailTemplate.data[targetIdx];
                              setMarketingPlanDetail(clone);
                            }
                          }}
                          name="email_template"
                          options={mailTemplate.data.map(template => ({
                            label: template.name,
                            value: template.id
                          }))}
                          data={{
                            label: marketingPlanDetail.mail_template.name,
                            value: marketingPlanDetail.mail_template.id
                          }}
                          fullWidth
                          single
                          disabled={!marketingPlanDetail.can_remove}
                        />
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          setPreviewTemplate(marketingPlanDetail.mail_template);
                        }}
                      >
                        <PreviewIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={24}>
                    <Grid item xs={2}>
                      <Grid className={classes.inputCustom} item xs={4}>
                        <InputLabel
                          htmlFor="custom-css-standard-input"
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused
                          }}
                        >
                          Conditions
                        </InputLabel>
                      </Grid>
                    </Grid>
                    <Grid item xs={10}>
                      <Grid item xs={10}>
                        {marketingPlanDetail.condition.must.map((m, i) => {
                          return (
                            <Grid key={i} container spacing={24}>
                              <Grid item xs={4}>
                                <FormControl
                                  fullWidth
                                  className={classes.formControl}
                                  disabled={!marketingPlanDetail.can_remove}
                                >
                                  <InputLabel htmlFor="age-simple">
                                    Operands
                                  </InputLabel>
                                  <Select
                                    value={m.operand}
                                    onChange={e =>
                                      onChangeUpdateMarketingPlan(e, i, "must")
                                    }
                                    displayEmpty
                                    name="operand"
                                    className={classes.selectEmpty}
                                  >
                                    {Object.values(marketingPlanConditions).map(
                                      c => {
                                        return (
                                          <MenuItem value={c.id}>
                                            {c.name}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={3}>
                                <FormControl
                                  fullWidth
                                  className={classes.formControl}
                                  disabled={!marketingPlanDetail.can_remove}
                                >
                                  <InputLabel htmlFor="age-simple">
                                    Operators
                                  </InputLabel>
                                  <Select
                                    value={m.operator}
                                    onChange={e =>
                                      onChangeUpdateMarketingPlan(e, i, "must")
                                    }
                                    displayEmpty
                                    name="operator"
                                    className={classes.selectEmpty}
                                  >
                                    {marketingPlanConditions[m.operand] &&
                                      marketingPlanConditions[
                                        m.operand
                                      ].operators.map(o => {
                                        return (
                                          <MenuItem value={o}>{o}</MenuItem>
                                        );
                                      })}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid
                                item
                                xs={4}
                                style={{ position: "relative" }}
                              >
                                {m.operand != "1" ? (
                                  <FormControl
                                    fullWidth
                                    className={classes.formControl}
                                    disabled={!marketingPlanDetail.can_remove}
                                  >
                                    <TextField
                                      id="standard-name"
                                      label="Data"
                                      className={classes.textField}
                                      value={m.data}
                                      onChange={e =>
                                        onChangeUpdateMarketingPlan(
                                          e,
                                          i,
                                          "must"
                                        )
                                      }
                                      name="data"
                                      type="number"
                                    />
                                  </FormControl>
                                ) : (
                                  <FormControl
                                    fullWidth
                                    style={{
                                      position: "absolute",
                                      bottom: "13px"
                                    }}
                                    className={classes.formControl}
                                    disabled={!marketingPlanDetail.can_remove}
                                  >
                                    <SelectCustom
                                      className={classes.stateCustomInput}
                                      options={Object.keys(stateHashes).map(
                                        k => {
                                          return {
                                            label: stateHashes[k],
                                            value: k
                                          };
                                        }
                                      )}
                                      handleChange={(v, a) =>
                                        handleChangeSelectAddress(v, a, i)
                                      }
                                      name="data"
                                      fullWidth
                                      label="Data"
                                      multi
                                      data={m.data.map(d => ({
                                        label: stateHashes[d],
                                        value: d
                                      }))}
                                      disabled={!marketingPlanDetail.can_remove}
                                    />
                                  </FormControl>
                                )}
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>

                      {marketingPlanDetail.can_remove && (
                        <Grid item xs={12}>
                          <Grid
                            item
                            xs={12}
                            className="d-flex justify-content-center mt-3"
                          >
                            <Button
                              onClick={forceUpdate}
                              variant="contained"
                              className={classes.button}
                            >
                              RESET
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                              onClick={handleSavePlanDetail}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              SAVE
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(MarketingPlanDetail);
