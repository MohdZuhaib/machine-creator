import { useState, useEffect } from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Link } from "react-router-dom";
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

// fetch(ApiConfig.auth.updateProfile, {
//   method: "PUT",
//   headers: {
//     Accept: "*/*",
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },

// body: values,
//   body: {
//     avatar:values.avatar,
//     firstName:values.firstName,
//     lastName:values.lastName,
//   },
// }).then((response) => console.log("Image uploaded too", response));

// console.log("API res-new token", response.data.data.token);
// localStorage.setItem("token", response.data.data.token);
// };

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .required("Last Name is required"),
});
const Profile = () => {
  const[profile,setProfile]=useState(false);
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const temp = jwtDecode(token);
  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  let user = "";
  if (token) {
    user = temp;
  }
  console.log("user", user);
  const [formData, setformData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: "",
  });
  console.log("image", image);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: image.data,
    },
    validationSchema: validationSchema,
    // onSubmit: (values) => {
    //   submitForm(values);
    // },
  });

  const submitForm = async (values) => {
    console.log(values);
    const token = localStorage.getItem("token");
    const response = await axios.put(ApiConfig.auth.updateProfile, values, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("New response", response);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    console.log("form data", formData,token);
    if (formData.firstName == "" || formData.lastName == "") {
      alert("enter all values");
    } else {
      console.log("formData avatar", formData.avatar);
      // formData.append("myFile", formData.avatar, formData.avatar.name);
      var data=new FormData();
      data.append('avatar',formData.avatar);
      data.append('firstName',formData.firstName);
      data.append('lastName',formData.lastName);
  
      const response = await axios.put(
        ApiConfig.auth.updateProfile,
data,
        {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("APi response", response);
      localStorage.setItem("token",response.data.data.token);
      setProfile(!profile);

      // axios.post('my-domain.com/file-upload', formData)
    }

    // submitForm(formData);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.firstName == "" || formData.lastName == "") {
  //     alert("enter all values");
  //   } else {
  //     // var data = new FormData();
  //     // data.append("avatar", formData.avatar);
  //     // data.append("firstName", formData.firstName);
  //     // data.append("lastName", formData.lastName);
  //     // console.log("new form data", data);
  //     submitForm(formData);
  //   }
  // };
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
      <Typography vcariant="h2">My Profile</Typography>
      <Grid container>
        <Grid item md={6}>
          {isEdit ? (
            <input
              id="contained-button-file"
              type="file"
              // name="file"
              onChange={uploadImage}
              // onChange={(e)=>this.changeHandle('image',e.target.files[0])}
            />
          ) : null}
          <img
            src={`http://localhost:8000${user.avatar}`}
            alt="userimg"
            style={{ height: "100px", width: "100px" }}
          />
        </Grid>
        <Grid item>
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
                helperText={formik.touched.firstName && formik.errors.firstName}
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
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
