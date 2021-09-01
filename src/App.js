import React, { Component } from "react";
import { NotesDataStore } from "./store/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { AuthProviderImpl } from "./auth/AuthProviderImpl";
import { Authorization } from "./auth/Authorization";
import Register from "./pages/Register";
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
                        <Route path="/register" component={Register} />
                        <Redirect to="/fundoo" />
                    </Switch>
                </Router>
            </AuthProviderImpl>
        </Provider>
    }
}
