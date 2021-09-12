import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import store from "./store";
import Home from "./pages/Home/Home";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Line from "./pages/Line/Line";
import Memory from "./pages/Memory/Memory";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme/theme";
import CreateNewLine from "./pages/CreateNewLine/CreateNewLine";
// import UploadMediaForm from "./pages/UploadMediaForm";
import AddMemory from "./pages/AddMemory/AddMemory";
import LineMap from "./pages/LineMap/LineMap";
import "mapbox-gl/dist/mapbox-gl.css";
import NotFound from "./pages/NotFound/NotFound";
import ErrorSnackbar from "./components/snackbar/ErrorSnackbar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <ErrorSnackbar />
            <PrivateRoute exact path="/" component={Home} />
            <Switch>
              <PrivateRoute exact path="/line/:line_id" component={Line} />
              <PrivateRoute
                exact
                path="/memory/:memory_id"
                component={Memory}
              />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute
                exact
                path="/createnewline"
                component={CreateNewLine}
              />
              <PrivateRoute exact path="/addmemory" component={AddMemory} />
              {/* TODO: add a line_id param. Might also want to add the user_id as well, 
                if we want to incorporate friends, so can see other people's maps.
                This should apply to the line route as well. */}
              <PrivateRoute exact path="/linemap" component={LineMap} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
