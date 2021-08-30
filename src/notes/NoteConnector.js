import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect }
    from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Note } from "./Note";
const mapStateToProps = (dataStore) => ({
    ...dataStore
});
const mapDispatchToProps = {
    loadData
};
export const NoteConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Router>
                <Switch>
                    <Route path="/fundoo/notes/:status?"
                        render={(routeProps) =>
                            <Note {...this.props} {...routeProps} notes={this.props.notes}/>} />
                    <Redirect to="/fundoo/notes" />
                </Switch>
            </Router>
        }
        componentDidMount() {
            this.props.loadData(DataTypes.NOTES);
        }
    }
)