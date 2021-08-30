import React, { Component } from "react";
import { NotesDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
    from "react-router-dom";
import { NoteConnector } from "./notes/NoteConnector";
export class App extends Component {
    render() {
        return <Provider store={NotesDataStore}>
            <Router>
                <Switch>
                    <Route path="/fundoo" component={NoteConnector} />
                    <Redirect to="/fundoo" />
                </Switch>
            </Router>
        </Provider>
    }
}
