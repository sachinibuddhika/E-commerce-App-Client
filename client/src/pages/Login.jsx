import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/common";
import { useUser } from "../contexts/UserContext.jsx";
import { UserProvider } from "../contexts/UserContext.jsx";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === values.email);

    // If user is found and password matches
    if (user && user.password === values.password) {
      setCookie("_USER_AUTH", { email: user.email, name: user.name });
      setUserInfo({ email: user.email, name: user.name });

      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      setLoading(false);
      setUserInfo(user);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to a dashboard or home page
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
    setSubmitting(false);
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <UserProvider>
      <Box
        className="login-section"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f4f6f9"
        sx={{ marginTop: -5 }}
      >
        <Container maxWidth="xs">
          <Box
            className="login-box"
            padding={4}
            borderRadius={2}
            boxShadow={3}
            bgcolor="#f6f6f6"
          >
            <Typography variant="h5" gutterBottom align="center">
              Log In
            </Typography>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <Box marginBottom={2}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email Address"
                      fullWidth
                      variant="outlined"
                      value={values.email}
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                      onBlur={handleBlur}
                      error={
                        Boolean(error) ||
                        Boolean(
                          values.email &&
                            !isSubmitting &&
                            !values.email.match(
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                            )
                        )
                      }
                      helperText={<ErrorMessage name="email" />}
                    />
                  </Box>

                  <Box marginBottom={2} position="relative">
                    <Field
                      name="password"
                      as={TextField}
                      label="Password"
                      fullWidth
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(e) => {
                        handleChange(e);
                        setError("");
                      }}
                      onBlur={handleBlur}
                      error={
                        Boolean(error) ||
                        Boolean(
                          values.password && !isSubmitting && !values.password
                        )
                      }
                      helperText={<ErrorMessage name="password" />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}

                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      sx={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                    >
                      {isLoading ? "Logging in..." : "Log In"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account yet?{" "}
                <Link href="/register" variant="body2" color="#ffbb48">
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </UserProvider>
  );
};

export default Login;
