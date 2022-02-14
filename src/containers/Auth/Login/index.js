import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
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
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(3, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const submitForm = async (values, navigate) => {
  try {
    const response = await axios.post(ApiConfig.auth.login, values);
    console.log("API res", response.data.data.token);
    localStorage.setItem("token", response.data.data.token);
    navigate("/dashboard");
    
  } catch (err) {
    console.log("error", err);
  }
};

const Login = () => {
  const naviate = useNavigate();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values, naviate);     
    },
  });

  return (
    <div>
      <Typography variant="h3">Login</Typography>
      <form onSubmit={formik.handleSubmit} className={classes.formWrapper}>
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
        Don`t have an account? <Link to="/Signup">Signup</Link>{" "}
      </Typography>
    </div>
  );
};

export default Login;
