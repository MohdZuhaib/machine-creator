import { useState, useEffect } from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import { useLocation } from "react-router-dom";
import * as yup from "yup";
import ApiConfig, { url } from "../../config/ApiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import getUser from "../../utils/getUser";

const useStyles = makeStyles(() => ({
  mainContainer: {
    minHeight: "100vh",
  },
  firstName: {
    fontWeight: "bold",
    color: "#4a4abf",
  },
  formLabel: {
    marginBottom: "5px !important",
  },
  formWrapper: {
    marginTop: "10px",
    width: "50%",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "rgba(25, 118, 210, 0.5) !important",
    color: "#ffff",
  },

  profileImage: {
    position: "absolute",
    width: "71%",
    right: "-35%",
    top: "28%",
    borderRadius: "9px",
  },
  profileRight: {
    backgroundColor: "#f3f3f3",
  },
  profileLeft: {
    backgroundColor: "#171727",
    position: "relative",
  },
  profileRight: {
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column !important",
    justifyContent: "center",
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
  // const location = useLocation();

  const classes = useStyles();
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    contact: "",
    avatar: "",
  });
  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});
  const token = jwtDecode(localStorage.getItem("token"));
  const userToken = localStorage.getItem("token");

  const getUser = async () => {
    const response = await axios.post(
      `${ApiConfig.user.getCurrentUser}/${token._id}`
    );
    console.log("getcurrentuser", response);
    setUser(response.data.data);
  };

  useEffect(async () => {
    // console.log("user gotcjha", getUser());
    getUser();
    setformData({
      ...formData,
      firstName: user?.firstName,
      lastName: user?.lastName,
      dob: user?.dob,
      contact: user?.contact,
      avatar: user?.lastName,
    });
  }, [isEdit]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      contact: user.contact,
      avatar: image.data,
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName == "" || formData.lastName == "") {
      toast.error("Enter all values");
    } else {
      var data = new FormData();
      data.append("avatar", formData.avatar);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("dob", formData.dob);
      data.append("contact", formData.contact);

      const response = await axios.put(ApiConfig.auth.updateProfile, data, {
        headers: {
          Accept: "/",
          Authorization: `Bearer ${userToken}`,
        },
      });
      localStorage.setItem("token", response.data.data.token);
      toast.success("Profile updated successfully");
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
      <Grid container className={classes.mainContainer}>
        <Grid item md={4} className={classes.profileLeft}>
          <Typography
            variant="h4"
            color="white"
            sx={{ marginTop: "15px", marginLeft: "20px" }}
          >
            My Profile
          </Typography>
          {isEdit ? (
            <div class="upload-btn-wrapper">
              <button class="btn">Change Image</button>
              <input
                id="contained-button-file"
                type="file"
                name="file"
                onChange={uploadImage}
              />
            </div>
          ) : null}
          <img
            src={`${url}${user.avatar}`}
            alt="userimg"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item md={8} className={classes.profileRight}>
          <Box className="actions-container">
            {" "}
            <Box textAlign="end" px={5}>
              {" "}
              {isEdit ? (
                <Button variant="contained" onClick={edit}>
                  CANCEL
                </Button>
              ) : (
                <Button variant="contained" onClick={edit}>
                  UPDATE
                </Button>
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              {" "}
              <form onSubmit={handleSubmit} className={classes.formWrapper}>
                <Box pb={isEdit && 3}>
                  {" "}
                  {isEdit ? (
                    <>
                      <Typography variant="h4" className={classes.formLabel}>
                        First Name
                      </Typography>
                      <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </>
                  ) : (
                    <Typography variant="h3" className={classes.firstName}>
                      {user ? user.firstName : "first name"}
                    </Typography>
                  )}
                </Box>

                {isEdit ? (
                  <>
                    <Typography variant="h4" className={classes.formLabel}>
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <Typography variant="h4">
                    {user ? user.lastName : "last name"}
                  </Typography>
                )}
                {isEdit ? (
                  <>
                    <Typography variant="h4" className={classes.formLabel}>
                      D.O.B.
                    </Typography>
                    <TextField
                      fullWidth
                      id="dob"
                      name="dob"
                      className="form-input"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <Typography variant="h4">
                    {user ? user.dob : "DOB"}
                  </Typography>
                )}
                {isEdit ? (
                  <>
                    <Typography variant="h4" className={classes.formLabel}>
                      Contact Number
                    </Typography>
                    <TextField
                      fullWidth
                      id="contact"
                      name="contact"
                      className="form-input"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <Typography variant="h4">
                    {user ? user.contact : "Contact Number"}
                  </Typography>
                )}
                <Box sx={{ textAlign: "center" }}>
                  {" "}
                  {isEdit ? (
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      sx={{ marginTop: "10px" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : null}
                </Box>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default Profile;