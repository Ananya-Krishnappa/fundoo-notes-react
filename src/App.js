import React, { Component } from "react";
import { NotesDataStore } from "./store/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { AuthProviderImpl } from "./context/AuthProviderImpl";
import { Authorization } from "./context/Authorization";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
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
                        <Route path="/forgotPassword" component={ForgotPassword} />
                        <Route path="/resetPassword" component={ResetPassword} />
                        <Redirect to="/fundoo" />
                    </Switch>
                </Router>
            </AuthProviderImpl>
        </Provider>
    }
}
