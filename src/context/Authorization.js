import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../components/dashboard/Dashboard";
import { Header } from "../components/header/Header";
import { AuthContext } from "./AuthContext";
export const Authorization = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (<div className="container-fluid" >
        {/* {
            !isAuthenticated &&
            <Header title="FundooNotes"></Header>
        } */}
        <div className="row">
            <div className="col fundoo-body">
                <Switch>
                    {
                        !isAuthenticated &&
                        <Route component={Login} />
                    }
                    <Route path="/fundoo/:status" render={(props) => (
                        <Dashboard {...props} />
                    )} />
                    <Redirect to="/fundoo/notes" />
                </Switch>
            </div>
        </div>
    </div >);
}