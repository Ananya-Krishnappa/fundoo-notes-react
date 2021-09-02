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
import "../scss/Auth.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ForgotPassword = () => {
    const history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter valid email").required("Required"),
    });

    const onSubmit = (values, props) => {
        if (values) {
            const userData = {
                email: values.email,
            };
            axios.post("http://localhost:3000/forgotPassword", userData).then((res) => {
                if (res.data.success === true) {
                    setNotify({
                        isOpen: true,
                        message: "Password reset link sent to mail successfully",
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
        <Grid className="formStyle">
            <Paper className="forgot-password-container register-paper">
                <div className="register-form">
                    <h3 className="header">
                        <span className="fun1">F</span>
                        <span className="fun2">u</span>
                        <span className="fun3">n</span>
                        <span className="fun4">d</span>
                        <span className="fun5">o</span>
                        <span className="fun6">o</span>
                        <span className="fun1">N</span>
                        <span className="fun2">o</span>
                        <span className="fun3">t</span>
                        <span className="fun4">e</span>
                        <span className="fun5">s</span>
                    </h3>
                    <Grid>
                        <h5>Account recovery</h5>
                    </Grid>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <Form className="register-form-inputs" data-testid="form">
                                <Grid container spacing={1} className="register-form-element">
                                    <Field
                                        className="register-form-inputs"
                                        spacing={2}
                                        as={TextField}
                                        data-testid="email"
                                        label="Email Address"
                                        name="email"
                                        placeholder="Enter Email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        helperText={<ErrorMessage name='email'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                    />
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
                                        {props.isSubmitting ? "Loading" : "Next"}
                                    </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
            <Notification notify={notify} setNotify={setNotify} />
        </Grid >
    );
};

export default ForgotPassword;