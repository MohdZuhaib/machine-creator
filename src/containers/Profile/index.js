import { useState } from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ApiConfig from "../../config/ApiConfig";

const useStyles = makeStyles(() => ({
  formLabel: {
    marginBottom: "5px",
  },
  formWrapper: {
    marginTop: "10px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "rgba(25, 118, 210, 0.5) !important",
    color: "#ffff",
  },
}));

const submitForm = (values) => {
  const response = axios.put(ApiConfig.auth.updateProfile, { values });
  console.log("API res", response);
};

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .required("First Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Profile = () => {
  const classes = useStyles();
  const [isEdit, setEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const edit = () => {
    setEdit(!isEdit);
  };
  return (
    <Box>
      <Typography vcariant="h2">My Profile</Typography>
      <Grid container>
        <Grid item md={6}>
          <img src="img" alt="profile-pic" />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={edit}>
            EDIT
          </Button>
          <form onSubmit={formik.handleSubmit} className={classes.formWrapper}>
            <Typography variant="h5" className={classes.formLabel}>
              First Name
            </Typography>
            {isEdit ? (
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="firstName"
                className="form-input"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            ) : (
              <Typography variant="body1">First Name</Typography>
            )}
            <Typography variant="h5" className={classes.formLabel}>
              Last Name
            </Typography>
            {isEdit ? (
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="lastName"
                className="form-input"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            ) : (
              <Typography variant="body1">Last Name</Typography>
            )}

            <Typography variant="h5" className={classes.formLabel}>
              Email
            </Typography>
            {isEdit ? (
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                className="form-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            ) : (
              <Typography variant="body1">Email</Typography>
            )}

            <Typography variant="h5" className={classes.formLabel}>
              Password
            </Typography>
            {isEdit ? (
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                className="form-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            ) : (
              <Typography variant="body1">password</Typography>
            )}

            {isEdit ? (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            ) : null}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
