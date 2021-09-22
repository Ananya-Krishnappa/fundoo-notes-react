import React, { Component } from "react";
import { NotesDataStore } from "./store/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import AuthProviderImpl from "./context/AuthProviderImpl";
import { Authorization } from "./context/Authorization";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";
export class App extends Component {
    render() {
        return <Provider store={NotesDataStore}>
            <Router>
                <AuthProviderImpl>
                    <Switch>
                        <Route path="/login" render={
                            routeProps =>
                                <Authorization {...routeProps} />
                        } />
                        <Route path="/register" component={Register} />
                        <Route path="/forgotPassword" component={ForgotPassword} />
                        <Route path="/resetPassword" component={ResetPassword} />
                        <Redirect to="/login" />
                    </Switch>
                </AuthProviderImpl>
            </Router>
        </Provider>
    }
}
