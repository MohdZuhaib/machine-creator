import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Typography variant="h3">Login</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6">Email</Typography>
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
        <Typography variant="h6">Password</Typography>
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
    </div>
  );
};

export default Login;
