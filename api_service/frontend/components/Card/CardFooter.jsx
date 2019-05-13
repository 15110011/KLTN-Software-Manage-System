import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardFooterStyle from "./styles/cardFooterStyle.jsx";

function CardFooter({ ...props }) {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    stats,
    chart,
    ...rest
  } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}


export default withStyles(cardFooterStyle)(CardFooter);
