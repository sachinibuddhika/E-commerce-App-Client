// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { setCookie } from "../utils/common";
// import { useUser } from "../contexts/UserContext.jsx";
// import { UserProvider } from "../contexts/UserContext.jsx";

// const Login = () => {
//   const [validated, setValidated] = useState(false);

//   //state manage of password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { setUserInfo } = useUser();

//   //State to hold form data
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   //function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const form = event.currentTarget;

//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//       setLoading(false);
//     } else {
//       // Simulate login with localStorage
//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const user = users.find((user) => user.email === formData.email);

//       // If user is found and password matches
//       if (user && user.password === formData.password) {
//         setCookie("_USER_AUTH", { email: user.email, name: user.name });
//         setUserInfo({ email: user.email, name: user.name });

//         localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
//         setLoading(false);
//         alert("Login successful!");
//         navigate("/dashboard"); // Redirect to a dashboard or home page
//       } else {
//         setError("Invalid email or password.");
//         setLoading(false);
//       }
//     }

//     //update validation state

//     setValidated(true);
//   };

//   //Fuction to handle change in form fields
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     // update formdata state with new values
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <UserProvider>
//       <div className="login-section align-content-center">
//         <Container>
//           <Row className="justify-content-center">
//             <Col xl={4} lg={5} md={7} xs={12}>
//               <div className="login-box rounded p-4 shadow-sm bg-light">
//                 <h3 className="mb-4">Log In</h3>
//                 <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       name="email"
//                       placeholder="Enter email"
//                       required
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please provide a valid email.
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group
//                     className="mb-3 position-relative"
//                     controlId="formBasicPassword"
//                   >
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleChange}
//                       name="password"
//                       placeholder="Password"
//                       required
//                     />

//                     <Form.Control.Feedback type="invalid">
//                       Please provide a valid password.
//                     </Form.Control.Feedback>
//                     <span
//                       className="position-absolute top-50 end-0 me-2"
//                       onClick={() => {
//                         setShowPassword(!showPassword);
//                       }}
//                     >
//                       {showPassword ? "hide" : "show"}
//                     </span>
//                   </Form.Group>
//                   {error && <p className="text-danger">{error}</p>}
//                   <Button variant="primary" type="submit" disabled={isLoading}>
//                     {isLoading ? "Logging in..." : "Submit"}
//                   </Button>
//                 </Form>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </UserProvider>
//   );
// };

// export default Login;

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
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to a dashboard or home page
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
    setSubmitting(false);
  };

  // Validation schema using Yup
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
      >
        <Container maxWidth="xs">
          <Box
            className="login-box"
            padding={4}
            borderRadius={2}
            boxShadow={3}
            bgcolor="white"
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
                <Link href="/register" variant="body2" color="primary">
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
