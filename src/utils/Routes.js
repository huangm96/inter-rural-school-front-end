import React from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../Components/Login";
import Register from "../Components/Register/Register";
import PersonalInfo from "../Components/Register/PersonalInfo";

import Dashboard from "../Components/dashboard/dashboard.component";


const Routes = () => {
  return (
    <div>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/new_user" component={Register} />
      <Route
        exact
        path="/new_user/personalInfo"
        component={PersonalInfo}
      />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
     
      

    </div>
  );
};

export default Routes;
