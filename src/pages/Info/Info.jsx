import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { Box } from "@material-ui/core";
import { useState } from "react";
import Loading from "../../components/Loading";
import DeleteProfileDialog from "./DeleteProfileDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Info = () => {
  const classes = useStyles();
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.root}>
        <Box padding={1} display="flex" justifyContent="center">
          <PrivatePageHeader text={"Information"} />
        </Box>
        <List component="nav">
          <Divider />
          <ListItem button>
            <ListItemText primary="Adding a memory" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Editing a memory" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Map view of your memories" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setDisplayDeleteDialog(true)}>
            <ListItemText primary="Delete Account" />
          </ListItem>
          <Divider />
        </List>
      </div>
      <DeleteProfileDialog
        displayDeleteDialog={displayDeleteDialog}
        setDisplayDeleteDialog={setDisplayDeleteDialog}
        setLoading={setLoading}
      />
    </>
  );
};

export default Info;
