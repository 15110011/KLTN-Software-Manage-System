import * as React from 'react'

import * as NumberFormat from 'react-number-format';

export default function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: other.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}