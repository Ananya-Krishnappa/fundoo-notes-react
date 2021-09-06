import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "../pages/Login";
import { authConsumer } from "./AuthConsumer";
import Dashboard from "../components/dashboard/Dashboard";
import { Header } from "../components/Header";
export const Authorization = authConsumer(class extends Component {
    render() {
        return <div className="container-fluid">
            {
                !this.props.isAuthenticated &&
                <Header></Header>
            }
            <div className="row">
                <div className="col fundoo-body">
                    <Switch>
                        {
                            !this.props.isAuthenticated &&
                            <Route component={Login} />
                        }
                        <Route path="/fundoo/notes" component={Dashboard} />
                        <Redirect to="/fundoo/notes" />
                    </Switch>
                </div>
            </div>
        </div>
    }
})