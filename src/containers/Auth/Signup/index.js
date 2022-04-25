import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../../config/ApiConfig";
import "./index.css";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";

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
  dob: yup.string("Enter your Birth Date").required("Birth Date is required"),
  contact: yup
    .string("Enter your Contact Number")
    .required("Contact Number is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const submitForm = async (values, navigate) => {
  console.log("values fetched", values);
  try {
    await axios.post(ApiConfig.auth.signup, values);
    toast.success("User registered uccessfully");
    setTimeout(navigate("/"), 2000);
  } catch (err) {
    console.log(err);
  }
};

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: "",
      contact: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => submitForm(values, navigate),
  });

  return (
    <div>
      <Typography variant="h3">Sign Up</Typography>
      <form onSubmit={formik.handleSubmit} className={classes.formWrapper}>
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
        />{" "}
        <Typography variant="h6" className={classes.formLabel}>
          DOB
        </Typography>
        <TextField
          fullWidth
          id="dob"
          name="dob"
          placeholder="DD-MM-YYYY"
          className="form-input"
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />{" "}
        <Typography variant="h6" className={classes.formLabel}>
          Contact Number
        </Typography>
        <TextField
          fullWidth
          id="contact"
          name="contact"
          label="contact"
          className="form-input"
          value={formik.values.contact}
          onChange={formik.handleChange}
          error={formik.touched.contact && Boolean(formik.errors.contact)}
          helperText={formik.touched.contact && formik.errors.contact}
        />{" "}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
      <Typography varioant="h6" sx={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account? <Link to="/">Sign In</Link>{" "}
      </Typography>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
