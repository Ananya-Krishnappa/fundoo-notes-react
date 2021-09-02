import React, { useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "../components/Notification";
import * as Yup from "yup";
import { getTitle } from "../components/Title";
import "../scss/Auth.scss";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
const ResetPassword = () => {
    let location = useLocation();
    const history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Required").matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at min 8 char, 1(upper, lower, num, special char)"
        ),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
    });
    const GetQuery = () => {
        return new URLSearchParams(location.search);
    }
    const onSubmit = (values, props) => {
        if (values) {
            const userData = {
                password: values.password,
            };
            let query = GetQuery();
            const id = query.get("id");
            const token = query.get("token");
            axios.post(`http://localhost:3000/resetPassword?id=${id}&token=${token}`, userData).then((res) => {
                if (res.data.success === true) {
                    setNotify({
                        isOpen: true,
                        message: "Password reset is done successfully",
                        type: "success",
                    });
                    setTimeout(function () { history.push("/login") }, 5000);
                } else {
                    setNotify({
                        isOpen: true,
                        message: "Something went wrong",
                        type: "error",
                    });
                }
            })
                .catch((error) => {
                    let message;
                    if (error.message.includes("500")) {
                        message = "User Account already Exists try login";
                    }
                    else if ((error.message.includes("400"))) {
                        message = "Invalid input";
                    }
                    else {
                        message = "Something went wrong";
                    }
                    setNotify({
                        isOpen: true,
                        message: message,
                        type: "error",
                    });
                });
            props.resetForm();
            props.setSubmitting(false);
        }
    };
    return (
        <div>
            <Header></Header>
            <Grid className="formStyle">
                <Paper className="forgot-password-container register-paper">
                    <div className="register-form">
                        <h3 className="header">
                            {getTitle("FundooNotes")}
                        </h3>
                        <Grid>
                            <h5>Reset Password</h5>
                        </Grid>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {(props) => (
                                <Form className="register-form-inputs" data-testid="form">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} className="register-form-element">
                                            <Field
                                                className="register-form-inputs"
                                                as={TextField}
                                                data-testid="password"
                                                label="Password"
                                                name="password"
                                                placeholder="Enter password"
                                                variant="outlined"
                                                type="password"
                                                fullWidth
                                                required
                                                helperText={<ErrorMessage name='password'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} className="register-form-element">
                                            <Field
                                                className="register-form-inputs"
                                                as={TextField}
                                                data-testid="confirmPassword"
                                                label="Confirm"
                                                name="confirmPassword"
                                                placeholder="Enter password"
                                                variant="outlined"
                                                type="password"
                                                fullWidth
                                                required
                                                helperText={<ErrorMessage name='confirmPassword'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} className="register-form-element submit-button">
                                        <Button
                                            type="submit"
                                            data-testid="submitButton"
                                            variant="contained"
                                            disabled={props.isSubmitting}
                                            className="register-form-button"
                                            fullWidth
                                        >
                                            {props.isSubmitting ? "Loading" : "Reset"}
                                        </Button>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Paper>
                <Notification notify={notify} setNotify={setNotify} />
            </Grid >
        </div>
    );
};

export default ResetPassword;