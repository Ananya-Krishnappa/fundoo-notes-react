import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "../scss/Auth.scss";
import { useHistory } from "react-router";
import Notification from "../components/Notification";
import { getTitle } from "../components/Title";
import { AuthContext } from "../auth/AuthContext";
const Login = () => {
  const { authenticate } = useContext(AuthContext);
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at min 8 char, 1(upper, lower, num, special char)"
    ),
  });
  const onSubmit = (values, props) => {
    if (values) {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      authenticate(credentials)
        .then((res) => {
          if (res.data.success === true) {
            history.push("/fundoo/notes");
          } else {
            setNotify({
              isOpen: true,
              message: res.message,
              type: "error",
            });
          }
        })
        .catch((error) => {
          let message;
          if (error.message.includes("404")) {
            message = "Invalid email or password";
          }
          else if ((error.message.includes("400"))) {
            message = "Invalid input";
          }
          else {
            message = error.response && error.response.data.message;
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
      <Grid className="formStyle">
        <Paper className="login-container login-paper">
          <div className="login-form-container">
            <h3 className="header">
              {getTitle("FundooNotes")}
            </h3>
            <Grid>
              <h5>Sign in</h5>
            </Grid>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form data-testid="form" className="login-form">
                  <Field
                    as={TextField}
                    className="login-form-input"
                    data-testid="email"
                    label="Email Address"
                    name="email"
                    placeholder="Enter Email"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name='email'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>}
                  />
                  <Field
                    as={TextField}
                    className="login-form-input"
                    data-testid="password"
                    label="Password"
                    name="password"
                    placeholder="Enter password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    helperText={
                      <ErrorMessage name='password'>{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
                    }
                  />
                  <Link className="forgot-password-link" data-testid="link" to="/forgotPassword">Forgot password?</Link>
                  <Button
                    type="submit"
                    data-testid="button"
                    color="primary"
                    variant="contained"
                    disabled={props.isSubmitting}
                    className="register-form-button"
                    fullWidth
                  >
                    {props.isSubmitting ? "Loading" : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography align="center">
              <Link data-testid="link" to="/register">Create account</Link>
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Login;