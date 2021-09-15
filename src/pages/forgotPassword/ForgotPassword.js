import React, { useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "../../components/Notification";
import { getTitle } from "../../components/Title";
import * as Yup from "yup";
import "../../global/styles.scss";
import { useHistory } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { forgotPassword } from "../../services/Api";
/**
 * @description ForgotPassword functional component to return ForgotPassword Page
 * @return ForgotPassword page component
 */
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
            forgotPassword(userData).then((res) => {
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
        <div>
            <Header></Header>
            <Grid className="formStyle">
                <Paper className="forgot-password-container register-paper">
                    <div className="register-form">
                        <h3 className="header">
                            {getTitle("FundooNotes")}
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
        </div>
    );
};

export default ForgotPassword;