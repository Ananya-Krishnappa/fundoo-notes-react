import React, { Component } from "react";
import { NotesDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { AuthProviderImpl } from "./auth/AuthProviderImpl";
import { Authorization } from "./auth/Authorization";
export class App extends Component {
    render() {
        return <Provider store={NotesDataStore}>
            <AuthProviderImpl>
                <Router>
                    <Switch>
                        <Route path="/fundoo" render={
                            routeProps =>
                                <Authorization {...routeProps} />
                        } />
                        <Redirect to="/fundoo" />
                    </Switch>
                </Router>
            </AuthProviderImpl>
        </Provider>
    }
}
