import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "../pages/Login";
import { authConsumer } from "./AuthConsumer";
import { NoteConnector } from "../notes/NoteConnector";
export const Authorization = authConsumer(class extends Component {
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-info text-white">
                    <div className="col-9 navbar-brand">FundooNotes</div>
                    {this.props.isAuthenticated &&
                        <button onClick={this.props.signout}
                            className=
                            "btn btn-secondary m-2 col-2">
                            Log Out
                        </button>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col fundoo-body">
                    <Switch>
                        {
                            !this.props.isAuthenticated &&
                            <Route component={Login} />
                        }
                        <Route path="/fundoo/notes" component={NoteConnector} />
                        <Redirect to="/fundoo/notes" />
                    </Switch>
                </div>
            </div>
        </div>
    }
})