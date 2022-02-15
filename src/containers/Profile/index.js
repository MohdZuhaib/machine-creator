import { useState, useEffect } from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import * as yup from "yup";
import ApiConfig from "../../config/ApiConfig";
import jwtDecode from "jwt-decode";

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
  lastName: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
});

const Profile = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const token = jwtDecode(localStorage.getItem("token"));
  const classes = useStyles();

  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});

  useEffect(async () => {
    const response = await axios.post(
      `${ApiConfig.user.getCurrentUser}/${token._id}`
    );
    setUser(response.data.data);
  }, [isEdit]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: image.data,
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (formData.firstName == "" || formData.lastName == "") {
      alert("enter all values");
    } else {
      var data = new FormData();
      data.append("avatar", formData.avatar);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);

      const response = await axios.put(ApiConfig.auth.updateProfile, data, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("token", response.data.data.token);
      setEdit(false);
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const edit = () => {
    setEdit(!isEdit);
  };
  const uploadImage = (e) => {
    const img = e.target.files[0];

    console.log("image file", img);
    setformData({ ...formData, avatar: img });
  };

  return (
    <Box>
      <Grid container className="main-container">
        <Grid item md={4}>
          <Typography
            variant="h4"
            color="white"
            sx={{ marginTop: "15px", marginLeft: "20px" }}
          >
            My Profile
          </Typography>
          {isEdit ? (
            <input
              id="contained-button-file"
              type="file"
              name="file"
              onChange={uploadImage}
            />
          ) : null}
          <img
            src={`http://localhost:8000${user.avatar}`}
            alt="userimg"
            style={{ height: "100px", width: "100px" }}
          />
        </Grid>
        <Grid item md={8}>
          <Box>
            {" "}
            <Button variant="contained" onClick={edit}>
              EDIT
            </Button>
            <form onSubmit={handleSubmit} className={classes.formWrapper}>
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
                  value={formData.firstName}
                  onChange={handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              ) : (
                <Typography variant="body1">
                  {user ? user.firstName : "first name"}
                </Typography>
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
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="body1">
                  {user ? user.lastName : "last name"}
                </Typography>
              )}

              {isEdit ? (
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ marginTop: "10px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : null}
              <h1>{user.firstName}</h1>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
