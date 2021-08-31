import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { authConsumer } from "./AuthConsumer";
import { ValidatedForm } from "../forms/ValidatedForm";
import "./Login.css";
export const Login = withRouter(authConsumer(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
        this.defaultAttrs = { required: true };
        this.formModel = [
            { label: "Email" },
            { label: "Password" },
        ];
    }
    authenticate = (credentials) => {
        this.props.authenticate(credentials)
            .catch(err => this.setState({ errorMessage: err.message }))
            .then(this.props.history.push("/fundoo/notes"));
    }
    render = () =>
        <div id="login-container" className="container-fluid">
            <div className="row">
                <div className="col login-header text-white">
                    <div className="navbar-brand">LOGIN</div>
                </div>
            </div>
            <div className="row">
                <div className="col m-2">
                    {this.state.errorMessage != null &&
                        <h4 className="bg-danger text-center text-white m-1 p-2">
                            {this.state.errorMessage}
                        </h4>
                    }
                    <ValidatedForm formModel={this.formModel}
                        defaultAttrs={this.defaultAttrs}
                        submitCallback={this.authenticate}
                        submitText="Login"
                    />
                </div>
            </div>
        </div>
}))