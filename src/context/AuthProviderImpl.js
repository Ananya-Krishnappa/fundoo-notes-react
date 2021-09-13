import React, { Component } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";
import { authUrl } from "../store/Urls";
import { withRouter } from "react-router-dom";
class AuthProviderImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated"),
            webToken: localStorage.getItem("webToken"),
            userId: localStorage.getItem("userId"),
        }
    }
    authenticate = (credentials) => {
        return Axios.post(authUrl, credentials).then(response => {
            if (response.data.success === true) {
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("webToken", response.data.data.token);
                localStorage.setItem("userId", response.data.data.id);
                this.setState({
                    isAuthenticated: true,
                    webToken: response.data.data.token,
                    userId: response.data.data.id
                })
                return true;
            } else {
                throw new Error("Invalid Credentials");
            }
        })
    }
    signout = () => {
        this.setState({ isAuthenticated: false, webToken: null, userId: null });
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("webToken", null);
        localStorage.setItem("userId", null);
        this.props.history.push("/fundoo");
    }
    render = () =>
        <AuthContext.Provider value={{
            ...this.state,
            authenticate: this.authenticate, signout: this.signout
        }}>
            {this.props.children}
        </AuthContext.Provider>
};
export default withRouter(AuthProviderImpl);