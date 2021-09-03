import React from "react";
export const AuthContext = React.createContext({
    isAuthenticated: false,
    webToken: null,
    userId: null,
    authenticate: (username, password) => { },
    signout: () => { }
})