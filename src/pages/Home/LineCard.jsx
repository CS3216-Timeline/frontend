import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { convertUTCtoYYYYMMDDHHMM } from "../../utils/datetime";
// import HorizontalTimeline from "react-horizontal-timeline";
// https://www.npmjs.com/package/react-vertical-timeline-component
// https://www.npmjs.com/package/react-horizontal-timeline

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "20px",
    textAlign: "center",
    margin: theme.spacing(1, 0),
  },
  // lineContainer: {},
  // descriptionContainer: {},
  cardActionsContainer: {
    justifyContent: "center",
    paddingBottom: theme.spacing(3),
  },
}));

const LineCard = ({ line }) => {
  const classes = useStyles();
  const history = useHistory();
  // const [value, setValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  // const [previous, setPrevious] = useState(0);

  // Values should be only date
  // const VALUES = [
  //   "2021-01-01",
  //   "2021-01-02",
  //   "2021-01-03",
  //   "2021-01-04",
  //   "2021-01-05",
  // ];

  // Description array corresponding to values
  // const description = [
  //   "The event of 1 Jan 2021 : Happy New Year",
  //   "The event of 2 Jan 2021 : Happy New Year",
  //   "The event of 3 Jan 2021 : Happy New Year",
  //   "The event of 4 Jan 2021 : Happy New Year",
  //   "The event of 5 Jan 2021 : Happy New Year",
  // ];
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Box component="div" paddingTop={1}>
          <Typography variant="h3" align="left">
            {line.name}
          </Typography>
        </Box>
        <Box component="div" paddingY={1}>
          <Typography variant="body1" align="left">
            Last Updated At: &nbsp;
            {convertUTCtoYYYYMMDDHHMM(line.lastUpdatedDate)}
          </Typography>
        </Box>
        <hr
          style={{
            border: `5px solid ${line.colorHex}`,
          }}
        />
        {/* <div className={classes.lineContainer}>
          <div
            style={{
              width: "100%",
              height: "100px",
              margin: "0 auto",
              fontSize: "9pt",
            }}
          >
            <HorizontalTimeline
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
        </div> */}
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <Button
          // TODO: CHANGE COLOR
          color="primary"
          variant="contained"
          // TODO: Update onClick function
          onClick={() => {
            history.push(`/line/${line.lineId}`);
          }}
          style={{ textTransform: "none" }}
        >
          <Typography variant="body1">View/ Add Memories</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default LineCard;
