import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";
import "./index.css";
import * as yup from "yup";

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

const submitForm = (values) => {
  console.log("API res kdjnvjxdxk");
  const response = axios.post(ApiConfig.auth.signup, { values });
  console.log("API res", response);
};

const SignUp = () => {
  console.log("my dsga")
  const classes = useStyles();
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Typography variant="h3">Sign Up</Typography>
      <form onSubmit={formik.onSubmit} className={classes.formWrapper}>
        <Typography variant="h6" className={classes.formLabel}>
          First Name
        </Typography>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="firstName"
          className="form-input"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <Typography variant="h6" className={classes.formLabel}>
          Last Name
        </Typography>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="lastName"
          className="form-input"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <Typography variant="h6" className={classes.formLabel}>
          Email
        </Typography>
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
        <Typography variant="h6" className={classes.formLabel}>
          Password
        </Typography>

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          className="form-input"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Link to="/dashboard">
          {" "}
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ marginTop: "10px" }}
            onClick={(e)=>submitForm(formik.values)}
          >
            Submit
          </Button>
        </Link>
      </form>
      <Typography varioant="h6" sx={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account? <Link to="/">Sign In</Link>{" "}
      </Typography>
    </div>
  );
};

export default SignUp;
