import "mapbox-gl/dist/mapbox-gl.css";
import React, { Fragment, useEffect, useState } from "react";
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
import MemoryEditor from "./pages/MemoryEditor/MemoryEditor";
import NotFound from "./pages/NotFound/NotFound";
import CustomSnackbar from "./components/snackbar/CustomSnackbar";
import Landing from "./pages/Landing/Landing";
import Loading from "./components/Loading";
import EditLine from "./pages/EditLine/EditLine";
import TestUploadMediaForm from "./pages/UploadMediaFormTest/UploadMediaForm";
import Profile from "./pages/Profile/Profile";
import Info from "./pages/Info/Info";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <CustomSnackbar />
            <PrivateRoute exact path="/" component={Home} />
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/landing" component={Landing} />
              <PrivateRoute exact path="/line/:lineId" component={Line} />
              <PrivateRoute exact path="/memory/:memoryId" component={Memory} />
              <PrivateRoute exact path="/add-line" component={CreateNewLine} />
              <PrivateRoute
                exact
                path="/edit-line/:lineId"
                component={EditLine}
              />
              <PrivateRoute
                exact
                path="/line/:lineId/add-memory"
                component={MemoryEditor}
              />
              <PrivateRoute
                exact
                path="/memory/:memoryId/edit"
                component={MemoryEditor}
              />
              <PrivateRoute exact path="/info" component={Info} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/test" component={TestUploadMediaForm} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
