import React from "react";
import PrivateRoute from "../components/private-route";
import CONFIG from "../config";
import routesMap from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { DispatchProp, connect } from "react-redux";
import { validateLocalStatus } from "../redux/actions/user";
import { LOCAL_STORAGE } from "../constants/storage";

const Routes: React.FC<DispatchProp> = function ({ dispatch }) {
  dispatch(validateLocalStatus());

  const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as any);

  return (
    <Router basename={CONFIG.baseURL}>
      <Switch>
        {routesMap.map((route, idx) => (
          <PrivateRoute {...route} key={idx} />
        ))}
      </Switch>
    </Router>
  );
};

export default connect()(Routes);
