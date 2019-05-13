import * as React from "react";
import * as PropTypes from "prop-types";
import * as cx from "classnames";
import { withStyles } from '@material-ui/core';
// material-ui components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import regularCardStyle from "./styles/regularCardStyle";

function RegularCard({ ...props }) {
  const {
    classes,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    titleAlign,
    customCardClasses,
    contentAlign,
    subtitleAlign,
    customCardTitleClasses
  } = props;
  const cardClasses =
    classes.card +
    cx({
      [" " + classes.cardPlain]: plainCard,
      [" " + customCardClasses]: customCardClasses !== undefined
    });
  return (
    <Card className={cardClasses} style={{ boxShadow: 'none' }}>
      {cardTitle !== undefined || cardSubtitle !== undefined ? (
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle + " " + classes[titleAlign] + " " + customCardTitleClasses,
            subheader: classes.cardSubtitle + " " + classes[subtitleAlign]
          }}
          title={cardTitle}
          subheader={cardSubtitle}
        />
      ) : null}
      <CardContent
        className={classes.cardContent + " " + classes[contentAlign]}
      >
        {content}
      </CardContent>
    </Card>
  );
}

RegularCard.propTypes = {
  classes: PropTypes.object.isRequired,
  customCardClasses: PropTypes.string,
  customCardTitleClasses: PropTypes.string,
  plainCard: PropTypes.bool,
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  titleAlign: PropTypes.oneOf(["right", "left", "center"]),
  contentAlign: PropTypes.oneOf(["right", "left", "center"]),
  subtitleAlign: PropTypes.oneOf(["right", "left", "center"])
};

export default withStyles(regularCardStyle)(RegularCard);
