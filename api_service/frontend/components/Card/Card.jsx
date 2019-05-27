import * as React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import cardStyle from "./styles/cardStyle";

function Card(props) {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    chart,
    ...rest
  } = props;


  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(cardStyle)(Card);
