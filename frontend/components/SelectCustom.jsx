import * as React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    }
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    }
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    }
  },
  paper: {
    position: 'static',
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  inputLabel: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    }
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontSize: '0.95rem'
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

const IntegrationReactSelect = (props) => {

  const { classes, theme, single, multi, data, handleChange, options, placeholder, label, name, required, error, disabled } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      {single && <Select
        classes={classes}
        styles={selectStyles}
        options={options}
        components={components}
        value={data}
        textFieldProps={{
          label: label,
          InputLabelProps: {
            shrink: true,
            classes: {
              root: classes.inputLabel
            }
          },
          required: required ? true : undefined,
          error,
          disabled: disabled

        }}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        isClearable
        required
        isDisabled={disabled}
      />}

      {multi && <Select
        classes={classes}
        styles={selectStyles}
        textFieldProps={{
          label: label,
          InputLabelProps: {
            shrink: true,
          },
          error,
          required: required ? true : undefined,
          disabled: disabled
        }}
        options={options}
        components={components}
        value={data}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti
        name={name}
        isDisabled={disabled}

      />}
    </div>
  );

}


export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);