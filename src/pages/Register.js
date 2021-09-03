import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "../components/Notification";
import { getTitle } from "../components/Title";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../scss/Auth.scss";
import { useHistory } from "react-router-dom";
import { Header } from "../components/Header";
import { register } from "../services/Api";
const Register = () => {
    const history = useHistory();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2).required("Required").matches(/^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/, "Enter Valid Firstname"),
        lastName: Yup.string().min(1).required("Required").matches(/^([a-zA-Z]{1,})+$/, "Enter Valid Lastname"),
        email: Yup.string().email("Please enter valid email").required("Required"),
        password: Yup.string().required("Required").matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Must have atleast min 8 char, 1(upper, lower, num, special char)"
        ),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
    });

    const onSubmit = (values, props) => {
        if (values) {
            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            };
            register(userData).then((res) => {
                if (res.data.success === true) {
                    setNotify({
                        isOpen: true,
                        message: "User Registration Successful",
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
                <Paper className="register-container register-paper">
                    <div className="register-form">
                        <h3 className="header">
                            <React.Fragment>
                                {getTitle("FundooNotes")}
                            </React.Fragment>
                        </h3>
                        <Grid>
                            <h5>Create your Fundoo Notes Account</h5>
                        </Grid>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {(props) => (
                                <Form className="register-form-inputs" data-testid="form">
                                    <Grid container spacing={1} className="register-form-element">
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                className="register-form-inputs"
                                                as={TextField}
                                                data-testid="firstName"
                                                label="First Name"
                                                name="firstName"
                                                placeholder="Enter First Name"
                                                variant="outlined"
                                                fullWidth
                                                helperText={<ErrorMessage name='firstName'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                className="register-form-inputs"
                                                as={TextField}
                                                data-testid="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                placeholder="Enter Last Name"
                                                variant="outlined"
                                                fullWidth
                                                helperText={<ErrorMessage name='lastName'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                            />
                                        </Grid>
                                    </Grid>
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
                                            helperText={<ErrorMessage name='email'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                        />
                                    </Grid>
                                    <Grid container spacing={1} className="register-form-element">
                                        <Grid item xs={12} sm={6}>
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
                                                helperText={<ErrorMessage name='password'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                            {props.isSubmitting ? "Loading" : "Register"}
                                        </Button>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        <Typography className="sign-in-link">
                            <Link to="/login">Sign in instead</Link>
                        </Typography>
                    </div>
                    <div className="register-avatar">
                        <img alt="register-image" src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"></img>
                    </div>
                </Paper>
                <Notification notify={notify} setNotify={setNotify} />
            </Grid >
        </div>
    );
};

export default Register;