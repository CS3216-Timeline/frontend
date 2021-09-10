import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HorizontalTimeline from "react-horizontal-timeline";
// https://www.npmjs.com/package/react-vertical-timeline-component
// https://www.npmjs.com/package/react-horizontal-timeline

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "20px",
    textAlign: "center",
  },
  titleContainer: {
    padding: theme.spacing(1),
  },
  lineContainer: {},
  descriptionContainer: {},
  cardActionsContainer: {
    justifyContent: "center",
    paddingBottom: theme.spacing(3),
  },
}));

const LineCard = ({ line }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [previous, setPrevious] = useState(0);

  // Values should be only date
  const VALUES = [
    "2021-01-01",
    "2021-01-02",
    "2021-01-03",
    "2021-01-04",
    "2021-01-05",
  ];

  // Description array corresponding to values
  const description = [
    "The event of 1 Jan 2021 : Happy New Year",
    "The event of 2 Jan 2021 : Happy New Year",
    "The event of 3 Jan 2021 : Happy New Year",
    "The event of 4 Jan 2021 : Happy New Year",
    "The event of 5 Jan 2021 : Happy New Year",
  ];
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <div className={classes.titleContainer}>
          <Typography variant="h3">{line.title}</Typography>
        </div>
        <div className={classes.lineContainer}>
          <div
            style={{
              width: "100%",
              height: "100px",
              margin: "0 auto",
              fontSize: "9pt",
            }}
          >
            <HorizontalTimeline
              // TODO: set this outline and foreground accordingly to the color of the line
              // foreground will be the color of the line
              styles={{
                outline: "#DFA867",
                foreground: "#19295C",
              }}
              index={value}
              indexClick={(index) => {
                setValue(index);
                setPrevious(value);
              }}
              values={VALUES}
            />
          </div>
          <div className={classes.descriptionContainer}>
            <Typography variant="body1">{description[value]}</Typography>
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <Button
          // TODO: CHANGE COLOR
          color="primary"
          variant="contained"
          // TODO: Update onClick function
          onClick={() => {
            console.log("button clicked");
          }}
          style={{ textTransform: "none" }}
        >
          <Typography variant="body1">View Memories</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default LineCard;
