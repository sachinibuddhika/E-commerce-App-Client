import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Registration = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Handle form submission for registration
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   const users = JSON.parse(localStorage.getItem("users")) || [];

  //   // Check if email already exists
  //   const userExists = users.some((user) => user.email === formData.email);
  //   if (userExists) {
  //     setError("Email is already registered.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   // Save user to localStorage
  //   users.push(formData);
  //   localStorage.setItem("users", JSON.stringify(users));

  //   setIsLoading(false);
  //   alert("Registration successful!");
  //   navigate("/login");
  // };

  // Handle form submission with Formik
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists in the stored users
    const userExists = users.some((user) => user.email === values.email);
    if (userExists) {
      setError("Email is already registered.");
      setErrors({ email: "Email is already registered" });
      setIsLoading(false);
      setSubmitting(false);
      return;
    }

    // If the email doesn't exist, save the new user in localStorage
    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));

    setIsLoading(false);
    alert("Registration successful!");
    navigate("/login"); // Navigate to login page upon successful registration
  };

  return (
    <div className="register-section align-content-center">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            borderRadius: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                {/* Name Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                />

                {/* Display error message if the email already exists */}
                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                {/* Submit Button with CircularProgress during loading */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || isLoading}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
};

export default Registration;
