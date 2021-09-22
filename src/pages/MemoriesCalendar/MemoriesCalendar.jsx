import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Box, makeStyles, Typography } from "@material-ui/core";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import TodayIcon from "@material-ui/icons/Today";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(2, 0),
  },
}));

const MemoriesCalendar = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectedDateChange = (newDate) => {
    setSelectedDate(newDate);
    //
    console.log(newDate.getUTCMonth());
    console.log(newDate.getUTCDate());
    console.log(newDate.getUTCFullYear());
    // retrieve the memories that happen on that day
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <PrivatePageHeader
          text="Calendar"
          icon={
            <TodayIcon
              style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
            />
          }
        />
      </Box>
      <Box paddingX={1}>
        <Calendar
          onChange={(newDate) => onSelectedDateChange(newDate)}
          value={selectedDate}
          className={classes.calendar}
        />
      </Box>
      <Box padding={2}>
        <Typography variant="h4" align="center">
          Memories that were made on {selectedDate.toLocaleDateString()}
        </Typography>
      </Box>
      <Box padding={2}>{/* TODO: map the memories to a memorycard */}</Box>
    </>
  );
};

export default MemoriesCalendar;
