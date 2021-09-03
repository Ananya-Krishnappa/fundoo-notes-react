import React, { Component, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect }
    from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../store/ActionCreators";
import { DataTypes } from "../store/Types";
import { Note } from "./Note";
import { authConsumer } from "../auth/AuthConsumer";
const mapStateToProps = (dataStore) => ({
    ...dataStore
});
const mapDispatchToProps = {
    loadData
};
export const NoteConnector = connect(mapStateToProps, mapDispatchToProps)(
    authConsumer(class extends Component {
        render() {
            return <Router>
                <Switch>
                    <Route path="/fundoo/notes/:status?"
                        render={(routeProps) =>
                            <Note {...this.props} {...routeProps} notes={this.props.notes} />} />
                    <Redirect to="/fundoo/notes" />
                </Switch>
            </Router>
        }
        componentDidMount() {
            this.props.loadData(DataTypes.NOTES, this.props.userId);
        }
    })
)