import * as React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FollowUpPlanIcon from "@material-ui/icons/FindInPage";
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
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import * as cn from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import CustomSnackbar from "../../components/CustomSnackbar";
// Hooks
import useFetchData from "../../CustomHook/useFetchData";

// API
import {
  FOLLOW_UP_PLANS_URL,
  GET_ACTIONS_URL,
  REFRESH_TOKEN_URL,
  MAIL_TEMPLATES_URL
} from "../../common/urls";
import { apiGet, apiPost, apiPatch, apiPut } from "../../common/Request";
import { BAD_REQUEST } from "../../common/Code";

// Components
import StepPlanDetail from "./StepPlanDetal";

import styles from "./FollowUpPlanStyles";
import { TextField } from "@material-ui/core";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function FollowUpPlanDetail(props) {
  const { classes } = props;

  const followUpPlanId = props.match.params.id;

  const [value, setValue] = React.useState(0);

  const [activeStep, setActiveStep] = React.useState(0);

  const [completeNotice, setCompleteNotice] = React.useState(false);

  const [actions, setActions] = useFetchData(
    GET_ACTIONS_URL,
    props.history,
    {}
  );
  const [createFieldDialog, setCreateFieldDialog] = React.useState(false);
  const [newFields, setNewFields] = React.useState([]);
  const [disableApply, setDisableApply] = React.useState(false);
  const [titleStt, setTitleStt] = React.useState("VIEW");

  const [cloneDetail, setCloneDetail] = React.useState({});

  const [
    mailTemplate,
    setEmailTemplateData,
    setEmailTemplateURL,
    forceUpdateEmailTemplate
  ] = useFetchData(MAIL_TEMPLATES_URL, props.history, { data: [], total: 0 });
  const [
    followUpPlanDetail,
    setFollowUpPlanDetail,
    setUrl,
    forceUpdate
  ] = useFetchData(FOLLOW_UP_PLANS_URL + "/" + followUpPlanId, props.history, {
    name: "",
    steps: []
  });

  // Event handler
  const notification = () => {
    setCompleteNotice("Successfully Updated");
    setTimeout(() => {
      setCompleteNotice(false);
    }, 2000);
  };

  const handleNext = () => {
    //if (activeStep === followUpPlanDetail.steps.length - 1)
    handleSavePlanDetail();
    //setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChangeSelect = (values, element, index) => {
    let stepsClone = [...followUpPlanDetail.steps];
    stepsClone[index].actions = values.map(v => v.value);
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps: stepsClone });
  };
  const handleChangeMailTemplate = (value, element, index) => {
    let stepsClone = [...followUpPlanDetail.steps];
    stepsClone[index].mail_template = value.mail_template.id;
    stepsClone[index].email_template_ = value.mail_template;
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps: stepsClone });
  };

  const handleSavePlanDetail = () => {
    apiPatch(
      FOLLOW_UP_PLANS_URL + "/" + followUpPlanId,
      { ...followUpPlanDetail },
      false,
      true
    ).then(json => {
      if (json.data) return notification();
    });
  };

  const onChangeInput = e => {
    setFollowUpPlanDetail({
      ...followUpPlanDetail,
      [e.target.name]: e.target.value
    });
  };

  const onChangeCloneInput = e => {
    setCloneDetail({ ...cloneDetail, [e.target.name]: e.target.value });
  };

  const handleChangeStepCondition = (e, stepIndex, conditionIndex) => {
    const steps = [...followUpPlanDetail.steps];
    steps[stepIndex].conditions[conditionIndex][e.target.name] = e.target.value;
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
  };

  const onChangeStepDetailInput = (e, index) => {
    const steps = [...followUpPlanDetail.steps];
    steps[index][e.target.name] = e.target.value;
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
  };

  const handleAddConditions = (e, index) => {
    const steps = [...followUpPlanDetail.steps];
    steps[index].conditions.push({
      name: "",
      type: "",
      choices: []
    });
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
  };

  const handleOpenDialog = (stepIndex, conditionIndex) => {
    setCreateFieldDialog(!createFieldDialog);
    if (stepIndex !== undefined) {
      setNewFields(
        followUpPlanDetail.steps[stepIndex].conditions[conditionIndex].choices
      );
    }
    setDisableApply(true);
  };

  const onChangeField = (e, choiceIndex) => {
    const cloneFields = newFields.concat([]);
    cloneFields[choiceIndex] = e.target.value;
    setNewFields(cloneFields);
    if (disableApply == true) setDisableApply(false);
  };

  const onAddOrRemoveField = choiceIndex => {
    let cloneFields = newFields.concat([]);
    //Delete
    if (choiceIndex !== undefined) {
      cloneFields = cloneFields
        .slice(0, choiceIndex)
        .concat(cloneFields.slice(choiceIndex + 1));
    } else {
      cloneFields.push([""]);
    }

    setDisableApply(false);

    setNewFields(cloneFields);
  };

  const onSubmitNewFields = (e, stepIndex, conditionIndex) => {
    e.preventDefault();
    const steps = followUpPlanDetail.steps.concat([]);
    steps[stepIndex].conditions[conditionIndex].choices = newFields;
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
    setDisableApply(true);
  };

  const onCloseField = () => {
    handleOpenDialog();
    setNewFields([]);
  };

  const onRemoveCondition = (stepIndex, conditionIndex) => {
    const steps = followUpPlanDetail.steps.concat([]);

    steps[stepIndex].conditions = steps[stepIndex].conditions
      .slice(0, conditionIndex)
      .concat(steps[stepIndex].conditions.slice(conditionIndex + 1));
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
  };

  const onDeleteCurrentStep = () => {
    let cloneStep = [].concat(followUpPlanDetail.steps);
    cloneStep = cloneStep
      .slice(0, activeStep)
      .concat(cloneStep.slice(activeStep + 1));
    for (let i = activeStep; i < cloneStep.length; i += 1) {
      cloneStep[i].nth -= 1;
    }

    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(0);
    }

    setFollowUpPlanDetail({ ...followUpPlanDetail, steps: cloneStep });
  };

  const addMoreSteps = () => {
    const steps = [...followUpPlanDetail.steps];
    steps.push({
      nth: steps[steps.length - 1] ? steps[steps.length - 1].nth + 1 : 0,
      actions: [],
      duration: 0,
      conditions: []
    });
    setFollowUpPlanDetail({ ...followUpPlanDetail, steps });
  };

  React.useEffect(() => {
    if (cloneDetail.name == followUpPlanDetail.name && cloneDetail.name != "")
      handleSavePlanDetail();
  }, [followUpPlanDetail.name]);

  return (
    <div className={classes.root}>
      {completeNotice && <CustomSnackbar isSuccess msg={completeNotice} />}
      <BreadcrumbsItem to={`/follow-up-plans/ + ${followUpPlanId}`}>
        {followUpPlanDetail.name}
      </BreadcrumbsItem>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={8} style={{ margin: "unset" }}>
              <div className={classes.wrapAvatar}>
                <div className={classes.productAvatar}>
                  <FollowUpPlanIcon />
                </div>
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: "10px",
                    textAlign: "left"
                  }}
                >
                  <li>
                    <span style={{ color: "#616161" }}>Follow Up Plan</span>
                  </li>
                  {titleStt == "VIEW" && (
                    <li>
                      <p style={{ fontSize: "16px" }}>
                        {followUpPlanDetail.name}
                        {followUpPlanDetail.used == 0 && (
                          <IconButton
                            onClick={() => {
                              setCloneDetail({ ...followUpPlanDetail });
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
                            setFollowUpPlanDetail({
                              ...followUpPlanDetail,
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
            <AppBar position="static" className={classes.bgrMenuTab}>
              <Tabs
                value={value}
                onChange={(e, value) => {
                  setValue(value);
                }}
                classes={{ indicator: classes.tabSelected }}
              >
                <Tab
                  label={
                    <span>
                      <DetailIcon /> Steps{" "}
                    </span>
                  }
                />
              </Tabs>
            </AppBar>
            <div style={{ textAlign: "left" }}>
              {value === 0 && (
                <TabContainer>
                  <div className="alert alert-danger">
                    This plan is being used or used
                  </div>
                  <div className={cn(classes.stepper)}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {followUpPlanDetail.steps.map((step, index) => (
                        <Step key={"steplabel" + index}>
                          <StepLabel
                            onClick={() => setActiveStep(index)}
                            style={{ cursor: "pointer" }}
                          >
                            {index !== followUpPlanDetail.steps.length - 1
                              ? `Step ${index + 1}`
                              : "Choose Packages"}
                          </StepLabel>
                        </Step>
                      ))}

                      {followUpPlanDetail.used == 0 && (
                        <Step
                          classes={{ root: classes.addStep }}
                          onClick={addMoreSteps}
                        >
                          <StepLabel StepIconProps={{ icon: <AddIcon /> }}>
                            Add Step
                          </StepLabel>
                        </Step>
                      )}
                    </Stepper>
                  </div>
                  <div className={cn(classes.actionsContainer, "mt-5")}>
                    {followUpPlanDetail.steps.map((step, index) => {
                      if (activeStep === index) {
                        return (
                          <StepPlanDetail
                            onChangeStepDetailInput={e =>
                              onChangeStepDetailInput(e, index)
                            }
                            handleChangeSelect={(values, e) =>
                              handleChangeSelect(values, e, index)
                            }
                            actions={actions}
                            step={step}
                            handleAddConditions={e =>
                              handleAddConditions(e, index)
                            }
                            handleOpenDialog={conditionIndex =>
                              handleOpenDialog(index, conditionIndex)
                            }
                            onChangeField={onChangeField}
                            handleChangeStepCondition={(e, conditionIndex) =>
                              handleChangeStepCondition(
                                e,
                                index,
                                conditionIndex
                              )
                            }
                            onAddOrRemoveField={onAddOrRemoveField}
                            onSubmitNewFields={(e, conditionIndex) =>
                              onSubmitNewFields(e, index, conditionIndex)
                            }
                            newFields={newFields}
                            createFieldDialog={createFieldDialog}
                            onCloseField={onCloseField}
                            onRemoveCondition={conditionIndex =>
                              onRemoveCondition(index, conditionIndex)
                            }
                            disableApply={disableApply}
                            key={"step" + index}
                            isFinalStep={
                              activeStep === followUpPlanDetail.steps.length - 1
                            }
                            mailTemplate={mailTemplate}
                            handleChangeMailTemplate={(value, e) => {
                              handleChangeMailTemplate(value, e, activeStep);
                            }}
                            isDisabled={followUpPlanDetail.used > 0}
                          />
                        );
                      } else return <></>;
                    })}
                  </div>

                  {followUpPlanDetail.used == 0 && (
                    <div className="d-flex justify-content-center">
                      <Button
                        onClick={forceUpdate}
                        className={classes.backButton}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </TabContainer>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(FollowUpPlanDetail);
