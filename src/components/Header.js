import React, { Component } from "react";
import { authConsumer } from "../context/AuthConsumer";
export const Header = authConsumer(class extends Component {
    render() {
        return <div className="row">
            <div className="col bg-info text-white">
                <div className="col-9 navbar-brand header-pre-login">{this.props.title}</div>
                {this.props.isAuthenticated &&
                    <button onClick={this.props.signout}
                        className=
                        "btn btn-secondary m-2 col-2">
                        Log Out
                    </button>
                }
            </div>
        </div>
    }
});