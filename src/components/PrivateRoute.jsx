import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TopNavBar from "./layout/TopNavBar";
import BottomNavBar from "./layout/BottomNavBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.loading ? (
          // TODO: Make the circular progress nicer
          <CircularProgress />
        ) : auth.isAuthenticated ? (
          <>
            <TopNavBar />
            <Component {...props} />
            <BottomNavBar />
          </>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
