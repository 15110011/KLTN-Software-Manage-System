import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardIconStyle from "./styles/cardIconStyle";

function CardIcon({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}


export default withStyles(cardIconStyle)(CardIcon);
