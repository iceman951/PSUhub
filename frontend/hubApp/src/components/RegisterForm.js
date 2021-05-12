import React from "react";
import { useFormik } from "formik";
import { Axios } from "./HttpClient";

import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@material-ui/core";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthdate: "",
      faculty: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      Axios.post(`/users/register`, values).then((res) => {
        console.log(res.data);
        console.log(res);
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="firstName">firstName</InputLabel>
                <OutlinedInput
                  id="firstName"
                  label="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.firstName}
                />
              </FormControl>
              {formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="lastName">lastName</InputLabel>
                <OutlinedInput
                  id="lastName"
                  label="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.lastName}
                />
              </FormControl>
              {formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <OutlinedInput
                  id="email"
                  label="Email Address"
                  type="email"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.email}
                />
              </FormControl>
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type="password"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.password}
                />
              </FormControl>
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="faculty">Faculty</InputLabel>
                <OutlinedInput
                  id="faculty"
                  label="Faculty"
                  type="text"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.faculty}
                />
              </FormControl>
              {formik.errors.faculty ? (
                <div>{formik.errors.faculty}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginBottom: "3%" }}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="birthdate" shrink>
                  Birthdate
                </InputLabel>
                <OutlinedInput
                  id="birthdate"
                  label="Birthdate"
                  type="date"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.birthdate}
                />
              </FormControl>
              {formik.errors.birthdate ? (
                <div>{formik.errors.birthdate}</div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "1%" }}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
